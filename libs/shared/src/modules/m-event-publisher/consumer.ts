import {
  Inject,
  Injectable,
  OnApplicationBootstrap,
  OnModuleInit,
  Type,
} from '@nestjs/common';
import {
  EventBus,
  IEvent,
  IEventHandler,
  InvalidSagaException,
} from '@nestjs/cqrs';
import { Transport } from '@nestjs/microservices';
import Redis from 'ioredis';
import _ from 'lodash';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { EVENT_PUBLISHER_OPTIONS, LIST_EVENT } from './constants';
import { getConnection } from './helper';
import { EventPublisherOptions } from './options';
import { Consumer, Kafka } from 'kafkajs';
import { Module } from '@nestjs/core/injector/module';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import {
  EVENT_METADATA,
  EVENTS_HANDLER_METADATA,
  SAGA_METADATA,
} from '@nestjs/cqrs/dist/decorators/constants';
import { ModulesContainer } from '@nestjs/core/injector/modules-container';
import {
  NOTIFICATION_HANDLER_METADATA,
  NOTIFICATION_METADATA,
} from '../notification/decorators/constants';
import {
  INotification,
  INotificationHandler,
  NotificationBus,
} from '@microservice-platform/shared/notification';
import { ModuleRef } from '@nestjs/core';
import { filter, firstValueFrom, from, mergeMap, Subject } from 'rxjs';
import { SAGA_EVENT_METADATA } from './decorators/constants';

@Injectable()
export class EventConsumer implements OnApplicationBootstrap {
  @Inject(EventBus)
  private eventBus: EventBus;

  @Inject(NotificationBus)
  private notificationBus: NotificationBus;

  @Inject(EVENT_PUBLISHER_OPTIONS)
  private eventPublisherOptions: EventPublisherOptions;

  @Inject(ModulesContainer)
  private readonly modulesContainer: ModulesContainer;

  @Inject(ModuleRef)
  private readonly moduleRef: ModuleRef;

  private notifications: Type<INotification>[];

  private events: Type<IEvent>[];

  async onApplicationBootstrap() {
    const clientOptions = getConnection(this.eventPublisherOptions);
    const modules = [...this.modulesContainer.values()];
    const notificationHandlers = this.flatMap<INotificationHandler>(
      modules,
      (instance) => this.filterProvider(instance, NOTIFICATION_HANDLER_METADATA)
    );

    this.notifications = notificationHandlers.map((handler) => {
      const notification: Type<INotification> = Reflect.getMetadata(
        NOTIFICATION_HANDLER_METADATA,
        handler
      );

      return notification;
    });

    const sagaEvents = this.flatMap(modules, (instanceWrapper) => {
      const { instance } = instanceWrapper;
      if (!instance) {
        return undefined;
      }
      return Reflect.getMetadata(SAGA_EVENT_METADATA, instance.constructor);
    }).reduce((a, b) => a.concat(b), []);

    const eventHandlers = this.flatMap<IEventHandler>(modules, (instance) =>
      this.filterProvider(instance, EVENTS_HANDLER_METADATA)
    );

    const events = eventHandlers
      .map((handler) => {
        const notification: Type<IEvent> = Reflect.getMetadata(
          EVENTS_HANDLER_METADATA,
          handler
        );
        return notification;
      })
      .reduce((a, b) => a.concat(b), []);

    this.events = _.uniq([...events, ...sagaEvents]);

    const topics = [...this.events, ...this.notifications].map((item) => {
      if (!item.name) {
        throw Error('A event or notifications in-valid' + item);
      }
      return item.name;
    });

    if (
      clientOptions.transport != Transport.REDIS &&
      clientOptions.transport != Transport.KAFKA
    ) {
      throw new Error(
        `Micro-service event publisher does not support current transport. Please check, only support REDIS, KAFKA transport`
      );
    }

    if (clientOptions.transport == Transport.REDIS) {
      const host = clientOptions.options.host;
      const port = clientOptions.options.port;

      const redis = new Redis({ host, port, lazyConnect: true });
      if (topics.length) {
        try {
          await redis.connect();
          redis.subscribe(...topics);
          redis.on('message', async (channel, message) => {
            const data = JSON.parse(message)['data'];
            await this.run(channel, data);
          });
        } catch (e) {
          throw new Error(
            'Micro-service event publisher can not connect transport redis' + e
          );
        }
      }
    }

    if (clientOptions.transport == Transport.KAFKA) {
      const kafka = new Kafka({
        clientId: clientOptions.options.client.clientId,
        brokers: clientOptions.options.client.brokers,
      });
      const consumer = kafka.consumer(clientOptions.options.consumer);
      try {
        await consumer.connect();
        await consumer.subscribe({ topics: topics, fromBeginning: true });
        await consumer.run({
          eachMessage: async ({ topic, partition, message }) => {
            console.log('topic: ', topic);
            console.log('message: ', message.value.toString());
            await this.run(topic, JSON.parse(message.value.toString()));
          },
        });
      } catch (e) {
        throw new Error(
          'Micro-service event publisher can not connect transport kafka' + e
        );
      }
    }
  }

  async run(topic, data) {
    // const data = JSON.parse(message).data;
    const EventClass = _.filter(this.events, ['name', topic]).at(0);
    if (EventClass) {
      await this.handleEvent(EventClass, data);
    }
    const NotificationClass = _.filter(this.notifications, ['name', topic]).at(
      0
    );
    if (NotificationClass) {
      await this.handleNotification(NotificationClass, data);
    }
  }

  async handleEvent(EventClass: Type<IEvent>, data) {
    if (EventClass) {
      const event = plainToInstance(EventClass, data);
      const validateErrors = await validate(event);
      if (validateErrors.length > 0) {
        console.error(
          `Event ${EventClass.name} validation failed. errors: `,
          validateErrors
        );
        return;
      }
      await this.eventBus.publish(event);
    }
  }

  async handleNotification(NotificationClass: Type<INotification>, data) {
    if (NotificationClass) {
      const notification = plainToInstance(NotificationClass, data);
      const validateErrors = await validate(notification);
      if (validateErrors.length > 0) {
        console.error(
          `Notification ${NotificationClass.name} validation failed. errors: `,
          validateErrors
        );
        return;
      }
      await this.notificationBus.notify(notification);
    }
  }

  private flatMap<T>(
    modules: Module[],
    callback: (instance: InstanceWrapper) => Type<any> | undefined
  ): Type<T>[] {
    const items = modules
      .map((module) => [...module.providers.values()].map(callback))
      .reduce((a, b) => a.concat(b), []);
    return items.filter((element) => !!element) as Type<T>[];
  }

  private filterProvider(
    wrapper: InstanceWrapper,
    metadataKey: string
  ): Type<any> | undefined {
    const { instance } = wrapper;
    if (!instance) {
      return undefined;
    }
    return this.extractMetadata(instance, metadataKey);
  }

  private extractMetadata(
    instance: Record<string, any>,
    metadataKey: string
  ): Type<any> {
    if (!instance.constructor) {
      return;
    }
    const metadata = Reflect.getMetadata(metadataKey, instance.constructor);
    return metadata ? (instance.constructor as Type<any>) : undefined;
  }
}

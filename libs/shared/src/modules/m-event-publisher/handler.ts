import { Inject, OnModuleInit } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { Transport } from '@nestjs/microservices';
import Redis from 'ioredis';
import _ from 'lodash';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import {
  EVENT_PATTERN,
  EVENT_PUBLISHER_OPTIONS,
  LIST_EVENT,
} from './constants';
import { getConnection } from './helper';
import { EventPublisherOptions } from './options';

export class EventHandler implements OnModuleInit {
  @Inject(EventBus)
  private eventBus: EventBus;

  @Inject(LIST_EVENT)
  private events: any[];

  @Inject(EVENT_PUBLISHER_OPTIONS)
  private eventPublisherOptions: EventPublisherOptions;

  onModuleInit() {
    const clientOptions = getConnection(this.eventPublisherOptions);

    if (clientOptions.transport != Transport.REDIS) {
      throw new Error(
        `Micro-service event publisher does not support current transport. Please check, only support REDIS transport`
      );
    }

    const host = clientOptions.options.host;
    const port = clientOptions.options.port;

    const redis = new Redis({ host, port, lazyConnect: true });

    redis
      .connect()
      .then(() => {
        redis.subscribe(EVENT_PATTERN);
        redis.on('message', async (channel, message) => {
          const data = JSON.parse(message).data;
          const EventClass = _.filter(this.events, ['name', data.name]).at(0);
          if (EventClass) {
            const event = plainToInstance(EventClass, data.event);
            const validateErrors = await validate(event);
            if (validateErrors.length > 0) {
              console.log(
                `event ${EventClass.name} validation failed. errors: `,
                validateErrors
              );
              return;
            }
            this.eventBus.publish(event);
          }
        });
      })
      .catch((e) => {
        throw new Error(
          'Micro-service event publisher can not connect transport' + e
        );
      });
  }
}

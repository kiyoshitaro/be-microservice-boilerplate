import {
  DynamicModule,
  Inject,
  Module,
  OnApplicationBootstrap,
  Provider,
  Type,
} from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventPublisherFactory } from './factory';
import { EVENT_PUBLISHER_OPTIONS, LIST_EVENT } from './constants';
import { EventConsumer } from './consumer';
import { MEventPublisher } from './publisher';
import { EventPublisherAsyncOptions, EventPublisherOptions } from './options';
import { MNotificationPublisher } from './notification-publisher';
import { NotificationModule } from '@microservice-platform/shared/notification';

@Module({
  imports: [CqrsModule, NotificationModule],
  controllers: [],
  providers: [EventConsumer, MNotificationPublisher],
})
export class MicroserviceEventPublisherModule {
  @Inject(EventConsumer)
  private eventConsumer: EventConsumer;
  static forRootAsync(options: EventPublisherAsyncOptions): DynamicModule {
    return {
      global: options.isGlobal || false,
      module: MicroserviceEventPublisherModule,
      providers: [
        this.createOptionsProvider(options),
        {
          provide: MEventPublisher,
          useFactory: (options: EventPublisherOptions) =>
            EventPublisherFactory.create(options),
          inject: [EVENT_PUBLISHER_OPTIONS],
        },
      ],
      exports: [MEventPublisher, MNotificationPublisher],
    };
  }

  private static createOptionsProvider(
    options: EventPublisherAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        provide: EVENT_PUBLISHER_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const inject = [options.useExisting as Type<EventPublisherOptions>];

    return {
      provide: EVENT_PUBLISHER_OPTIONS,
      useFactory: async (options: EventPublisherAsyncOptions) => options,
      inject,
    };
  }
}

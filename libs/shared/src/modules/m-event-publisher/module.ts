import { DynamicModule, Module, Provider, Type } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventPublisherFactory } from './factory';
import { EVENT_PUBLISHER_OPTIONS, LIST_EVENT } from './constants';
import { EventHandler } from './handler';
import { MEventPublisher } from './publisher';
import { EventPublisherAsyncOptions, EventPublisherOptions } from './options';

@Module({
  imports: [CqrsModule],
  controllers: [],
  providers: [EventHandler],
})
export class MicroserviceEventPublisherModule {
  static forRootAsync(options: EventPublisherAsyncOptions): DynamicModule {
    return {
      global: options.isGlobal || false,
      module: MicroserviceEventPublisherModule,
      providers: [
        this.createOptionsProvider(options),
        {
          provide: LIST_EVENT,
          useValue: options.events || [],
        },
        {
          provide: MEventPublisher,
          useFactory: (options: EventPublisherOptions) =>
            EventPublisherFactory.create(options),
          inject: [EVENT_PUBLISHER_OPTIONS],
        },
      ],
      exports: [MEventPublisher],
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

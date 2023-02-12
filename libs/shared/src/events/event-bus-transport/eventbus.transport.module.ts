import { DynamicModule, Logger, Module } from '@nestjs/common';
import { RedisPublisher } from './publishers/redis.publisher';
import { CqrsModule, EventBus } from '@nestjs/cqrs';
import { EventBusTransport } from './eventbus.transport';
import { DefaultPubSub } from '@nestjs/cqrs/dist/helpers/default-pubsub';
import { ModuleRef } from '@nestjs/core';

@Module({
  imports: [CqrsModule],
  providers: [RedisPublisher, DefaultPubSub],
  exports: [],
})
export class EventBusTransportModule {
  static forRoot(publishers: any[], handlers: any[]): DynamicModule {
    return {
      module: EventBusTransportModule,
      providers: [
        Logger,
        ...publishers,
        {
          provide: EventBusTransport,
          useFactory: (eventBus: EventBus, moduleRef: ModuleRef) => {
            return new EventBusTransport(eventBus, moduleRef, publishers);
          },
          inject: [EventBus, ModuleRef],
        },
        ...handlers,
      ],
      exports: [EventBusTransport],
    };
  }
}

import { EventBus, IEvent } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { AbstractPublisher } from './abstract.publisher';

@Injectable()
export class EventBusTransport {
  constructor(
    private readonly eventBus: EventBus,
    private readonly moduleRef: ModuleRef,
    private readonly publishers: any[]
  ) {}

  publish<T extends IEvent>(event: T) {
    this.publishViaPublisher(event);
  }

  private publishViaPublisher(event: any) {
    const transports = event.TRANSPORTS ? event.TRANSPORTS : [];

    delete event.TRANSPORTS;

    if (transports.length === 0) {
      this.eventBus.publish(event);
    }

    for (const publisher of this.publishers) {
      const pub = this.moduleRef.get<AbstractPublisher>(publisher);
      if (transports.includes(pub.TRANSPORT)) {
        pub.publish(event);
      }
    }
  }
}

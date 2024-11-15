import { IEvent, IEventPublisher } from '@nestjs/cqrs';
import { Injectable, Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

@Injectable()
export abstract class AbstractPublisher implements IEventPublisher {
  abstract TRANSPORT: Transport;
  abstract PATTERN: string;

  constructor(protected readonly log: Logger) {}

  publish<T extends IEvent>(event: T): void {
    const data = {
      payload: event,
      event: event.constructor.name,
    };

    this.send(this.PATTERN, data);
  }

  protected abstract send(pattern: any, data: any): any;
}

import { Injectable } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { MEventPublisher } from './publisher';
import { EventPublisherOptions } from './options';
import { getConnection } from './helper';

@Injectable()
export class EventPublisherFactory {
  static async create(
    options: EventPublisherOptions
  ): Promise<MEventPublisher> {
    const clientOptions = getConnection(options);
    const eventBus = ClientProxyFactory.create(clientOptions);
    return new MEventPublisher(eventBus);
  }
}

import { IEvent } from '@nestjs/cqrs';
import { Transport } from '@nestjs/microservices';

export interface IEventWithTransport extends IEvent {
  TRANSPORTS: Transport[];
}

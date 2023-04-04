import { SAGA_EVENT_METADATA } from './constants';
import { IEvent } from '@nestjs/cqrs';

export const SagaEvent = (...args: IEvent[]): ClassDecorator => {
  return (target: object) => {
    Reflect.defineMetadata(SAGA_EVENT_METADATA, args, target);
  };
};

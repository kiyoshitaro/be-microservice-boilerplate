import 'reflect-metadata';
import { INotification } from '../index';
import { v4 } from 'uuid';
import {
  NOTIFICATION_HANDLER_METADATA,
  NOTIFICATION_METADATA,
  NOTIFICATION_TYPE_METADATA,
} from './constants';

export const NotificationHandler = (
  command: INotification | (new (...args: any[]) => INotification)
): ClassDecorator => {
  return (target: object) => {
    if (!Reflect.hasOwnMetadata(NOTIFICATION_METADATA, command)) {
      Reflect.defineMetadata(NOTIFICATION_METADATA, { id: v4() }, command);
    }
    Reflect.defineMetadata(NOTIFICATION_HANDLER_METADATA, command, target);
  };
};

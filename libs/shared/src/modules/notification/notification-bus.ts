import { Injectable, Type } from '@nestjs/common';
import { INotification, INotificationHandler } from './interfaces';
import { ModuleRef } from '@nestjs/core';
import {
  NOTIFICATION_HANDLER_METADATA,
  NOTIFICATION_METADATA,
  NOTIFICATION_TYPE_METADATA,
} from './decorators/constants';
import { NotificationMetadata } from './interfaces';
import 'reflect-metadata';
import {
  InvalidNotificationHandlerException,
  NotificationHandlerNotFoundException,
  NotificationTypeNotFoundException,
} from './exceptions';

export type NotificationHandlerType<
  QueryBase extends INotification = INotification
> = Type<INotificationHandler<QueryBase>>;

@Injectable()
export class NotificationBus<
  NotificationBase extends INotification = INotification
> {
  private handlers = new Map<string, INotificationHandler<any, any>>();

  constructor(private readonly moduleRef: ModuleRef) {}

  async notify(notification) {
    const notificationId = this.getNotificationId(notification);
    const handler = this.handlers.get(notificationId);
    if (!handler) {
      throw new NotificationHandlerNotFoundException(notificationId);
    }
    const notificationTypes = Reflect.getMetadata(
      NOTIFICATION_TYPE_METADATA,
      handler.constructor
    );
    if (!notificationTypes || notificationTypes.length <= 0) {
      throw new NotificationTypeNotFoundException(handler.constructor);
    }
    await Promise.all(
      notificationTypes.map((notificationType) => {
        try {
          return handler[notificationType](notification);
        } catch (e) {
          console.error(e);
        }
      })
    );
  }

  register(handlers: any) {
    handlers.forEach((handler) => this.registerHandler(handler));
  }

  private getNotificationId(notification: any): string {
    const { constructor: queryType } = Object.getPrototypeOf(notification);
    const queryMetadata: NotificationMetadata = Reflect.getMetadata(
      NOTIFICATION_METADATA,
      queryType
    );
    if (!queryMetadata) {
      throw new NotificationHandlerNotFoundException(queryType.name);
    }

    return queryMetadata.id;
  }

  private reflectNotificationId(
    handler: NotificationHandlerType<NotificationBase>
  ): string | undefined {
    const notification: Type<NotificationBase> = Reflect.getMetadata(
      NOTIFICATION_HANDLER_METADATA,
      handler
    );
    const notificationMetadata: NotificationMetadata = Reflect.getMetadata(
      NOTIFICATION_METADATA,
      notification
    );
    return notificationMetadata.id;
  }

  protected registerHandler(handler: any) {
    const instance = this.moduleRef.get(handler, { strict: false });
    if (!instance) {
      return;
    }

    const target = this.reflectNotificationId(handler);
    if (!target) {
      throw new InvalidNotificationHandlerException();
    }

    this.bind(instance, target);
  }

  bind(handler: any, queryId: string) {
    this.handlers.set(queryId, handler);
  }
}

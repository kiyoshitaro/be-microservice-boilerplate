import { INotification } from './notification.interface';
import { NotificationType } from '../decorators';

export interface INotificationHandler<
  T extends INotification = any,
  TRes = any
> {
  toWsWebPlatform(notification: T): Promise<void>;

  toWsMobilePlatform(notification: T): Promise<void>;

  toDatabase(notification: T): Promise<void>;

  toOneSignal(notification: T): Promise<void>;
}

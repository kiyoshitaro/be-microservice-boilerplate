import {
  INotificationHandler,
  NotificationHandler,
  NotificationType,
} from '@microservice-platform/shared/notification';
import { AddGameSuccessNotification } from '@microservice-platform/notification-service/notifications/impl';
import { Inject } from '@nestjs/common';
import { MNotificationPublisher } from '@microservice-platform/shared/m-event-publisher';
import { CommandBus } from '@nestjs/cqrs';
import { CreateNotificationCommand } from '@microservice-platform/notification-service/commands/impl';
import {
  ENotificationCategory,
  ENotificationStatus,
} from '@microservice-platform/shared/constants';

@NotificationHandler(AddGameSuccessNotification)
export class AddGameSuccessNotificationHandler
  implements INotificationHandler<AddGameSuccessNotification, any>
{
  @Inject(MNotificationPublisher)
  private mNotificationPublisher: MNotificationPublisher;

  @Inject(CommandBus)
  private commandBus: CommandBus;

  @NotificationType()
  async toDatabase(notification: AddGameSuccessNotification): Promise<void> {
    const { data } = notification;
    const title = 'Add Game Success';
    const content = 'Add Game Success';
    const browserURL = '/user/account-overview';
    return;
    // await this.commandBus.execute(
    //   new CreateNotificationCommand({
    //     data: data,
    //     name: notification.constructor.name,
    //     title: title,
    //     content: content,
    //     status: ENotificationStatus.SUCCESS,
    //     category: ENotificationCategory.CREATED_GAME,
    //     browser_url: browserURL,
    //   })
    // );
  }

  toOneSignal(notification: AddGameSuccessNotification): Promise<void> {
    return Promise.resolve(undefined);
  }

  @NotificationType()
  async toWsWebPlatform(
    notification: AddGameSuccessNotification
  ): Promise<void> {
    const { data } = notification;
    const title = 'Add Game Success';
    const content = `Add Game Success ${data.name}`;
    const url = '/user/account-overview';
    const status = ENotificationStatus.SUCCESS;
    const category = ENotificationCategory.CREATED_GAME;
    const name = notification.constructor.name;
    this.mNotificationPublisher.wsWebPlatformPublish({
      data: { title, content, url, status, category, name },
    });
  }

  toWsMobilePlatform(notification: AddGameSuccessNotification): Promise<void> {
    return Promise.resolve(undefined);
  }
}

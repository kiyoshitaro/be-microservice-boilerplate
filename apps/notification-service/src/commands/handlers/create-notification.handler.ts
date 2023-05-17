import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateNotificationCommand } from '@microservice-platform/notification-service/commands/impl';
import { Inject } from '@nestjs/common';
import { REPOSITORIES } from '@microservice-platform/notification-service/constants';
import { INotificationRepository } from '@microservice-platform/notification-service/repositories/interfaces';
import { NotificationModel } from '@microservice-platform/notification-service/models';

@CommandHandler(CreateNotificationCommand)
export class CreateNotificationHandler
  implements ICommandHandler<CreateNotificationCommand, NotificationModel>
{
  @Inject(REPOSITORIES.NOTIFICATION_REPOSITORY)
  private repository: INotificationRepository;

  async execute(
    command: CreateNotificationCommand
  ): Promise<NotificationModel> {
    return await this.repository.create(command.data);
  }
}

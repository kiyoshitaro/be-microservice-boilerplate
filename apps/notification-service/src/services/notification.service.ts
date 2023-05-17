import { Injectable } from '@nestjs/common';
import { NotificationFilter } from '@microservice-platform/notification-service/filters';
import { Service } from '@microservice-platform/notification-service/services/service';
import { GetsNotificationQuery } from '@microservice-platform/notification-service/queries/impl';
import { CreateNotificationCommand } from '@microservice-platform/notification-service/commands/impl';
import { GetNotificationQuery } from '@microservice-platform/notification-service/queries/impl';
import { CreateNotificationDto } from '@microservice-platform/shared/dtos';

@Injectable()
export class NotificationService extends Service {
  async list(
    filters?: NotificationFilter,
    include = ''
  ): Promise<Record<string, any>[]> {
    return this.queryBus.execute(new GetsNotificationQuery(filters, include));
  }

  async create(
    data: CreateNotificationDto & { template_category_id?: string }
  ): Promise<Record<string, any>> {
    const template = await this.commandBus.execute(
      new CreateNotificationCommand(data)
    );
    return this.queryBus.execute(
      new GetNotificationQuery(template.id, 'detail')
    );
  }
}

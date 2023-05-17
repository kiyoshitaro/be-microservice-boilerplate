import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { INotificationRepository } from '@microservice-platform/notification-service/repositories/interfaces';
import { Inject } from '@nestjs/common';
import { REPOSITORIES } from '@microservice-platform/notification-service/constants';
import { NotificationTransformer } from '@microservice-platform/notification-service/transformers';
import { GetNotificationQuery } from '@microservice-platform/notification-service/queries/impl/get-notification.query';

@QueryHandler(GetNotificationQuery)
export class GetNotificationHandler
  implements IQueryHandler<GetNotificationQuery, Record<string, any>>
{
  @Inject(REPOSITORIES.NOTIFICATION_REPOSITORY)
  private repository: INotificationRepository;

  @Inject(NotificationTransformer)
  private transformer: NotificationTransformer;

  async execute(query: GetNotificationQuery): Promise<Record<string, any>> {
    const { id, include } = query;
    let model = await this.repository.findById(id);
    model = await this.repository.with(model, include);
    return this.transformer.item(model, { include });
  }
}

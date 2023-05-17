import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetsNotificationQuery } from '@microservice-platform/notification-service/queries/impl';
import { INotificationRepository } from '@microservice-platform/notification-service/repositories/interfaces';
import { Inject } from '@nestjs/common';
import { REPOSITORIES } from '@microservice-platform/notification-service/constants';
import { NotificationTransformer } from '@microservice-platform/notification-service/transformers';

@QueryHandler(GetsNotificationQuery)
export class GetsNotificationHandler
  implements IQueryHandler<GetsNotificationQuery>
{
  @Inject(REPOSITORIES.NOTIFICATION_REPOSITORY)
  private repository: INotificationRepository;

  @Inject(NotificationTransformer)
  private transformer: NotificationTransformer;

  async execute(query: GetsNotificationQuery): Promise<Record<string, any>> {
    const { filter, include } = query;
    let models = await this.repository.list(filter);
    models = await this.repository.with(models, include);
    return this.transformer.collection(models, { include });
  }
}

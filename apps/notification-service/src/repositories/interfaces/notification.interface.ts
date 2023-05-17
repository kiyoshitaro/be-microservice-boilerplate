import { NotificationModel } from '../../models';
import { IRepository } from '@microservice-platform/shared/objection';
import { NotificationFilter } from '@microservice-platform/notification-service/filters';

export interface INotificationRepository
  extends IRepository<NotificationModel> {
  list(filter?: NotificationFilter): Promise<NotificationModel[]>;

  listPaginate(
    filter?: NotificationFilter
  ): Promise<{ items: NotificationModel[]; pagination: Record<string, any> }>;
}

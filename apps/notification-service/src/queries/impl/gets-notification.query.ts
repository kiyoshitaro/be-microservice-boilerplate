import { BaseQuery } from '@microservice-platform/notification-service/queries/query';
import { NotificationFilter } from '@microservice-platform/notification-service/filters';

export class GetsNotificationQuery extends BaseQuery {
  constructor(
    public readonly filter: NotificationFilter,
    public readonly include: string = ''
  ) {
    super(include);
  }
}

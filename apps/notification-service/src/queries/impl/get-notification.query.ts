import { BaseQuery } from '@microservice-platform/notification-service/queries/query';

export class GetNotificationQuery extends BaseQuery {
  constructor(
    public readonly id: string,
    public readonly include: string = ''
  ) {
    super(include);
  }
}

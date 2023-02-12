import { BaseQuery } from '@microservice-platform/user-service/queries/query';
import { UserFilter } from '@microservice-platform/user-service/filters';

export class GetUsersQuery extends BaseQuery {
  constructor(
    public readonly filter: UserFilter,
    public readonly include: string = ''
  ) {
    super(include);
  }
}

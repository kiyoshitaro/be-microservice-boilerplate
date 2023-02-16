import { BaseQuery } from '@microservice-platform/user-service/queries/query';
import { UserGameFilter } from '@microservice-platform/shared/filters/user-service';

export class GetUserGameQuery extends BaseQuery {
  constructor(
    public readonly filter: UserGameFilter,
    public readonly include: string = ''
  ) {
    super(include);
  }
}

import { BaseQuery } from '@microservice-platform/user-service/queries/query';

export class GetUserQuery extends BaseQuery {
  constructor(
    public readonly id: string,
    public readonly include: string = ''
  ) {
    super(include);
  }
}

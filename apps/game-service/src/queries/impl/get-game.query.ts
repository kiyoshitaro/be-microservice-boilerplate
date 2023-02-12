import { BaseQuery } from '@microservice-platform/game-service/queries/query';

export class GetGameQuery extends BaseQuery {
  constructor(
    public readonly id: string,
    public readonly include: string = ''
  ) {
    super(include);
  }
}

import { BaseQuery } from '@microservice-platform/game-service/queries/query';
import { GameFilter } from '@microservice-platform/game-service/filters';

export class GetGamesPaginationQuery extends BaseQuery {
  constructor(
    public readonly filter: GameFilter,
    public readonly include: string = ''
  ) {
    super(include);
  }
}

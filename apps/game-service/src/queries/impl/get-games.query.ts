import { BaseQuery } from '@microservice-platform/game-service/queries/query';
import { GameFilter } from '@microservice-platform/shared/filters/game-service';

export class GetGamesQuery extends BaseQuery {
  constructor(
    public readonly filter: GameFilter,
    public readonly include: string = ''
  ) {
    super(include);
  }
}

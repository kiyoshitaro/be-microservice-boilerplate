import { GameModel } from '../../models';
import { IRepository } from '@microservice-platform/shared/objection';
import { GameFilter } from '@microservice-platform/game-service/filters';
import { OrderByDirection } from 'objection';

export interface IGameRepository extends IRepository<GameModel> {
  list(
    filter?: GameFilter,
    orderBy?: string,
    sortBy?: OrderByDirection
  ): Promise<GameModel[]>;

  listPaginate(
    filter?: GameFilter
  ): Promise<{ items: GameModel[]; pagination: Record<string, any> }>;

  countGame(filter: GameFilter): Promise<number>;
}

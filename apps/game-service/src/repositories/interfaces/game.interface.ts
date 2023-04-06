import { GameModel } from '../../models';
import { IRepository } from '@microservice-platform/shared/objection';
import { GameFilter } from '@microservice-platform/shared/filters/game-service';

export interface IGameRepository extends IRepository<GameModel> {
  list(filter?: GameFilter): Promise<GameModel[]>;

  listPaginate(
    filter?: GameFilter
  ): Promise<{ items: GameModel[]; pagination: Record<string, any> }>;

  countGame(filter: GameFilter): Promise<number>;
}

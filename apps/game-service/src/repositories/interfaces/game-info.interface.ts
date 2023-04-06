import { GameInfoModel } from '../../models';
import { IRepository } from '@microservice-platform/shared/objection';
import { GameInfoFilter } from '@microservice-platform/shared/filters/game-service';

export interface IGameInfoRepository extends IRepository<GameInfoModel> {
  list(filter?: GameInfoFilter): Promise<GameInfoModel[]>;
}

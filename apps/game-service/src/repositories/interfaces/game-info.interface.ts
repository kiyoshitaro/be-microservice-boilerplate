import { GameInfoModel } from '../../models';
import { IRepository } from '@microservice-platform/shared/objection';
import { GameInfoFilter } from '@microservice-platform/shared/filters/game-service';
import { OrderByDirection } from 'objection';

export interface IGameInfoRepository extends IRepository<GameInfoModel> {
  list(
    filter?: GameInfoFilter,
    orderBy?: string,
    sortBy?: OrderByDirection
  ): Promise<GameInfoModel[]>;
}

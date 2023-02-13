import { GameInfoModel } from '../../models';
import { IRepository } from '@microservice-platform/shared/objection';
import { GameFilter } from '@microservice-platform/game-service/filters';
import { OrderByDirection } from 'objection';

export interface IGameInfoRepository extends IRepository<GameInfoModel> {
  list(
    filter?: GameFilter,
    orderBy?: string,
    sortBy?: OrderByDirection
  ): Promise<GameInfoModel[]>;
}

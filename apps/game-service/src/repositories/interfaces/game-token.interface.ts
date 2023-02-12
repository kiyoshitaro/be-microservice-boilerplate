import { GameTokenModel } from '../../models';
import { IRepository } from '@microservice-platform/shared/objection';
import { GameTokenFilter } from '@microservice-platform/game-service/filters';
import { OrderByDirection } from 'objection';

export interface IGameTokenRepository extends IRepository<GameTokenModel> {
  list(
    filter?: GameTokenFilter,
    orderBy?: string,
    sortBy?: OrderByDirection
  ): Promise<GameTokenModel[]>;
}

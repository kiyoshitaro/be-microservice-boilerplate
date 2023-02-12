import { UserGameModel } from '../../models';
import { IRepository } from '@microservice-platform/shared/objection';
import { UserGameFilter } from '@microservice-platform/user-service/filters';
import { OrderByDirection } from 'objection';

export interface IUserGameRepository extends IRepository<UserGameModel> {
  list(
    filter?: UserGameFilter,
    orderBy?: string,
    sortBy?: OrderByDirection
  ): Promise<UserGameModel[]>;
}

import { UserItemModel } from '../../models';
import { IRepository } from '@microservice-platform/shared/objection';
import { UserGameFilter } from '@microservice-platform/user-service/filters';
import { OrderByDirection } from 'objection';

export interface IUserItemRepository extends IRepository<UserItemModel> {
  list(
    filter?: UserGameFilter,
    orderBy?: string,
    sortBy?: OrderByDirection
  ): Promise<UserItemModel[]>;
}

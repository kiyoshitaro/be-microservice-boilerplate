import { UserModel } from '../../models';
import { IRepository } from '@microservice-platform/shared/objection';
import { UserFilter } from '@microservice-platform/user-service/filters';
import { OrderByDirection } from 'objection';

export interface IUserRepository extends IRepository<UserModel> {
  list(
    filter?: UserFilter,
    orderBy?: string,
    sortBy?: OrderByDirection
  ): Promise<UserModel[]>;
}

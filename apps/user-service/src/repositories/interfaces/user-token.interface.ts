import { UserTokenModel } from '../../models';
import { IRepository } from '@microservice-platform/shared/objection';
import { UserTokenFilter } from '@microservice-platform/user-service/filters';
import { OrderByDirection } from 'objection';

export interface IUserTokenRepository extends IRepository<UserTokenModel> {
  list(
    filter?: UserTokenFilter,
    orderBy?: string,
    sortBy?: OrderByDirection
  ): Promise<UserTokenModel[]>;
}

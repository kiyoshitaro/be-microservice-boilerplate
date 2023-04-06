import { UserModel } from '../../models';
import { IRepository } from '@microservice-platform/shared/objection';
import { UserFilter } from '@microservice-platform/shared/filters/user-service';

export interface IUserRepository extends IRepository<UserModel> {
  list(filter?: UserFilter): Promise<UserModel[]>;
}

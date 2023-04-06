import { UserGameModel } from '../../models';
import { IRepository } from '@microservice-platform/shared/objection';
import { UserGameFilter } from '@microservice-platform/shared/filters/user-service';

export interface IUserGameRepository extends IRepository<UserGameModel> {
  list(filter?: UserGameFilter): Promise<UserGameModel[]>;

  listPaginate(
    filter?: UserGameFilter
  ): Promise<{ items: UserGameModel[]; pagination: Record<string, any> }>;
}

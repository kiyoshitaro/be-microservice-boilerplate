import { Injectable } from '@nestjs/common';
import { UserModel } from '../models';
import { IUserRepository } from './interfaces';
import { AnyQueryBuilder, OrderByDirection } from 'objection';
import { UserFilter } from '@microservice-platform/shared/filters/user-service';
import { InjectModel, Repository } from '@microservice-platform/shared/objection';

@Injectable()
export class UserRepository
  extends Repository<UserModel>
  implements IUserRepository {
  @InjectModel(UserModel)
  model: UserModel;

  static get tableName() {
    return UserModel.tableName;
  }

  static queryFilter(
    query: AnyQueryBuilder,
    filter: UserFilter
  ): AnyQueryBuilder {
    if (filter?.ids) {
      query = query.whereIn(`${this.tableName}.id`, filter?.ids);
    }
    if (filter?.emails) {
      query = query.whereIn(`${this.tableName}.email`, filter?.emails);
    }
    if (filter?.usernames) {
      query = query.whereIn(`${this.tableName}.username`, filter?.usernames);
    }
    return query;
  }

  async list(
    filter?: UserFilter,
    orderBy: string = 'id',
    sortBy: OrderByDirection = 'ASC'
  ): Promise<UserModel[]> {
    const query = UserRepository.queryFilter(this.query(), filter).orderBy(
      orderBy,
      sortBy
    );
    return query;
  }
}

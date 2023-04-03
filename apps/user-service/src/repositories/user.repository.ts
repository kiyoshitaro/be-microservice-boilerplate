import { Injectable } from '@nestjs/common';
import { UserModel } from '../models';
import { IUserRepository } from './interfaces';
import { AnyQueryBuilder, OrderByDirection, raw } from 'objection';
import { UserFilter } from '@microservice-platform/shared/filters/user-service';
import {
  InjectModel,
  Repository,
} from '@microservice-platform/shared/objection';

@Injectable()
export class UserRepository
  extends Repository<UserModel>
  implements IUserRepository
{
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
    if (filter?.search_by) {
      query = query.where((builder) => {
        for (const search_field of filter?.search_by) {
          builder.orWhere(
            raw('LOWER(??)', `${search_field}`),
            'like',
            `%${filter?.search_text.toLowerCase()}%`
          );
        }
      });
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

import { Injectable } from '@nestjs/common';
import { UserTokenModel } from '../models';
import { IUserTokenRepository } from './interfaces';
import { AnyQueryBuilder, OrderByDirection } from 'objection';
import {
  UserItemFilter,
  UserTokenFilter,
} from '@microservice-platform/user-service/filters';
import { InjectModel, Repository } from '@microservice-platform/shared/objection';

@Injectable()
export class UserTokenRepository
  extends Repository<UserTokenModel>
  implements IUserTokenRepository {
  @InjectModel(UserTokenModel)
  model: UserTokenModel;

  static get tableName() {
    return UserTokenModel.tableName;
  }

  static queryFilter(
    query: AnyQueryBuilder,
    filter: UserTokenFilter
  ): AnyQueryBuilder {
    if (filter?.ids) {
      query = query.whereIn(`${this.tableName}.id`, filter?.ids);
    }
    if (filter?.user_ids) {
      query = query.whereIn(`${this.tableName}.user_id`, filter?.user_ids);
    }
    if (filter?.tokens_ids) {
      query = query.whereIn(`${this.tableName}.token_id`, filter?.tokens_ids);
    }
    if (filter?.amounts) {
      query = query.whereIn(`${this.tableName}.amount`, filter?.amounts);
    }
    return query;
  }

  async list(
    filter?: UserItemFilter,
    orderBy: string = 'id',
    sortBy: OrderByDirection = 'ASC'
  ): Promise<UserTokenModel[]> {
    const query = UserTokenRepository.queryFilter(this.query(), filter).orderBy(
      orderBy,
      sortBy
    );
    return query;
  }
}

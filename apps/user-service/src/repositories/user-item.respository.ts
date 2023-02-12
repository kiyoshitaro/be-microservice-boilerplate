import { Injectable } from '@nestjs/common';
import { UserItemModel } from '../models';
import { IUserItemRepository } from './interfaces';
import { AnyQueryBuilder, OrderByDirection } from 'objection';
import { UserItemFilter } from '@microservice-platform/user-service/filters';
import { InjectModel, Repository } from '@microservice-platform/shared/objection';

@Injectable()
export class UserItemRepository
  extends Repository<UserItemModel>
  implements IUserItemRepository {
  @InjectModel(UserItemModel)
  model: UserItemModel;

  static get tableName() {
    return UserItemModel.tableName;
  }

  static queryFilter(
    query: AnyQueryBuilder,
    filter: UserItemFilter
  ): AnyQueryBuilder {
    if (filter?.ids) {
      query = query.whereIn(`${this.tableName}.id`, filter?.ids);
    }
    if (filter?.user_ids) {
      query = query.whereIn(`${this.tableName}.user_id`, filter?.user_ids);
    }
    if (filter?.item_ids) {
      query = query.whereIn(`${this.tableName}.item_id`, filter?.item_ids);
    }
    if (filter?.quantities) {
      query = query.whereIn(`${this.tableName}.quantity`, filter?.quantities);
    }
    return query;
  }

  async list(
    filter?: UserItemFilter,
    orderBy: string = 'id',
    sortBy: OrderByDirection = 'ASC'
  ): Promise<UserItemModel[]> {
    const query = UserItemRepository.queryFilter(this.query(), filter).orderBy(
      orderBy,
      sortBy
    );
    return query;
  }
}

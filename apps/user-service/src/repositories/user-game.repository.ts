import { Injectable } from '@nestjs/common';
import { UserGameModel } from '../models';
import { IUserGameRepository } from './interfaces';
import { AnyQueryBuilder, OrderByDirection } from 'objection';
import { UserGameFilter } from '@microservice-platform/user-service/filters';
import { InjectModel, Repository } from '@microservice-platform/shared/objection';

@Injectable()
export class UserGameRepository
  extends Repository<UserGameModel>
  implements IUserGameRepository {
  @InjectModel(UserGameModel)
  model: UserGameModel;

  static get tableName() {
    return UserGameModel.tableName;
  }

  static queryFilter(
    query: AnyQueryBuilder,
    filter: UserGameFilter
  ): AnyQueryBuilder {
    if (filter?.ids) {
      query = query.whereIn(`${this.tableName}.id`, filter?.ids);
    }
    if (filter?.user_ids) {
      query = query.whereIn(`${this.tableName}.user_id`, filter?.user_ids);
    }
    if (filter?.game_ids) {
      query = query.whereIn(`${this.tableName}.game_id`, filter?.game_ids);
    }
    if (filter?.levels) {
      query = query.whereIn(`${this.tableName}.level`, filter?.levels);
    }
    if (filter?.experiences) {
      query = query.whereIn(
        `${this.tableName}.experience`,
        filter?.experiences
      );
    }
    return query;
  }

  async list(
    filter?: UserGameFilter,
    orderBy: string = 'id',
    sortBy: OrderByDirection = 'ASC'
  ): Promise<UserGameModel[]> {
    const query = UserGameRepository.queryFilter(this.query(), filter).orderBy(
      orderBy,
      sortBy
    );
    return query;
  }
}

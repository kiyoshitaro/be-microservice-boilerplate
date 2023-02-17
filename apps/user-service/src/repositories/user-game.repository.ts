import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserGameModel } from '../models';
import { IUserGameRepository } from './interfaces';
import { AnyQueryBuilder, OrderByDirection, raw } from 'objection';
import { UserGameFilter } from '@microservice-platform/shared/filters/user-service';
import { InjectModel, Repository } from '@microservice-platform/shared/objection';
import { UserRepository } from './user.repository';

@Injectable()
export class UserGameRepository
  extends Repository<UserGameModel>
  implements IUserGameRepository {
  @InjectModel(UserGameModel)
  model: UserGameModel;

  static get tableName() {
    return UserGameModel.tableName;
  }


  static joinTable(query: AnyQueryBuilder, relation: string): AnyQueryBuilder {
    if (UserGameModel.relationMappings.hasOwnProperty(relation)) {
      return query.joinRelated(relation);
    } else {
      throw new InternalServerErrorException(
        `Relation ${relation} does not exist in model ${UserGameModel.tableName}`
      );
    }
  }

  static joinForFilter(query: AnyQueryBuilder, filter: UserGameFilter): AnyQueryBuilder {
    if (filter?.userFilter) {
      // user is name of relationMapping
      query = this.joinTable(query, "user");
      return UserRepository.queryFilter(query, filter.userFilter);
    }
    return query;
  }

  static queryFilter(
    query: AnyQueryBuilder,
    filter: UserGameFilter
  ): AnyQueryBuilder {

    query = this.joinForFilter(query, filter);

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
    if (filter?.search_by) {
      for (const search_field of filter?.search_by) {
        query = query.where(builder => {
          builder.orWhere(
            raw('LOWER(??)', `${search_field}`),
            "like",
            `%${filter?.search_text.toLowerCase()}%`
          );
        });
      }
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

  async listPaginate(
    filter?: UserGameFilter,
  ): Promise<{ items: UserGameModel[]; pagination: Record<string, any> }> {
    const filterPagination = { ...filter };
    delete filterPagination.page;
    delete filterPagination.limit;
    let query = UserGameRepository.queryFilter(
      //@ts-ignore
      this.query().whereNotDeleted(),
      filter
    );
    query = UserGameRepository.baseQueryFilter(query, filter);
    return super.paginate(query, filter?.page, filter?.limit);
  }

}

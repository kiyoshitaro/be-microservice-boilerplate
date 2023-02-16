import { Injectable } from '@nestjs/common';
import { GameInfoModel } from '../models';
import { IGameInfoRepository } from './interfaces';
import { AnyQueryBuilder, OrderByDirection } from 'objection';
import { GameInfoFilter } from '@microservice-platform/shared/filters/game-service';
import { InjectModel, Repository } from '@microservice-platform/shared/objection';

@Injectable()
export class GameInfoRepository
  extends Repository<GameInfoModel>
  implements IGameInfoRepository {
  @InjectModel(GameInfoModel)
  model: GameInfoModel;

  static get tableName() {
    return GameInfoModel.tableName;
  }

  static queryFilter(
    query: AnyQueryBuilder,
    filter: GameInfoFilter
  ): AnyQueryBuilder {
    if (filter?.ids) {
      query = query.whereIn(`${this.tableName}.id`, filter?.ids);
    }
    if (filter?.game_ids) {
      query = query.whereIn(`${this.tableName}.game_id`, filter?.game_ids);
    }
    if (filter?.trait_type_ids) {
      query = query.whereIn(
        `${this.tableName}.trait_type_ids`,
        filter?.trait_type_ids
      );
    }
    return query;
  }

  async list(
    filter?: GameInfoFilter,
    orderBy: string = 'id',
    sortBy: OrderByDirection = 'ASC'
  ): Promise<GameInfoModel[]> {
    const query = GameInfoRepository.queryFilter(this.query(), filter).orderBy(
      orderBy,
      sortBy
    );
    return query;
  }
}

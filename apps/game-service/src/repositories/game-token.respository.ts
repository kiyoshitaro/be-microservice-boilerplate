import { Injectable } from '@nestjs/common';
import { GameTokenModel } from '../models';
import { IGameTokenRepository } from './interfaces';
import { AnyQueryBuilder, OrderByDirection } from 'objection';
import { GameTokenFilter } from '@microservice-platform/game-service/filters';
import { InjectModel, Repository } from '@microservice-platform/shared/objection';

@Injectable()
export class GameTokenRepository
  extends Repository<GameTokenModel>
  implements IGameTokenRepository {
  @InjectModel(GameTokenModel)
  model: GameTokenModel;

  static get tableName() {
    return GameTokenModel.tableName;
  }

  static queryFilter(
    query: AnyQueryBuilder,
    filter: GameTokenFilter
  ): AnyQueryBuilder {
    if (filter?.game_ids) {
      query = query.whereIn(`${this.tableName}.game_id`, filter?.game_ids);
    }
    if (filter?.token_ids) {
      query = query.whereIn(`${this.tableName}.token_id`, filter?.token_ids);
    }
    return query;
  }

  async list(
    filter?: GameTokenFilter,
    orderBy: string = 'id',
    sortBy: OrderByDirection = 'ASC'
  ): Promise<GameTokenModel[]> {
    const query = GameTokenRepository.queryFilter(this.query(), filter).orderBy(
      orderBy,
      sortBy
    );
    return query;
  }
}

import { Injectable } from '@nestjs/common';
import { GameModel } from '../models';
import { IGameRepository } from './interfaces';
import { AnyQueryBuilder, OrderByDirection } from 'objection';
import { GameFilter } from '@microservice-platform/game-service/filters';
import { InjectModel, Repository } from '@microservice-platform/shared/objection';

@Injectable()
export class GameRepository
  extends Repository<GameModel>
  implements IGameRepository {
  @InjectModel(GameModel)
  model: GameModel;

  static get tableName() {
    return GameModel.tableName;
  }

  static queryFilter(
    query: AnyQueryBuilder,
    filter: GameFilter
  ): AnyQueryBuilder {
    if (filter?.ids) {
      query = query.whereIn(`${this.tableName}.id`, filter?.ids);
    }
    if (filter?.client_ids) {
      query = query.whereIn(`${this.tableName}.client_id`, filter?.client_ids);
    }
    if (filter?.names) {
      query = query.whereIn(`${this.tableName}.name`, filter?.names);
    }
    return query;
  }

  async list(
    filter?: GameFilter,
    orderBy: string = 'id',
    sortBy: OrderByDirection = 'ASC'
  ): Promise<GameModel[]> {
    const query = GameRepository.queryFilter(this.query(), filter).orderBy(
      orderBy,
      sortBy
    );
    return query;
  }
}

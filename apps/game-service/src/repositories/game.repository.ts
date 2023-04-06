import { Injectable } from '@nestjs/common';
import { GameModel } from '../models';
import { IGameRepository } from './interfaces';
import { AnyQueryBuilder, raw } from 'objection';
import { GameFilter } from '@microservice-platform/shared/filters/game-service';
import {
  InjectModel,
  Repository,
} from '@microservice-platform/shared/objection';

@Injectable()
export class GameRepository
  extends Repository<GameModel>
  implements IGameRepository
{
  @InjectModel(GameModel)
  model: GameModel;

  static get tableName() {
    return GameModel.tableName;
  }

  static extendQueryFilter(
    query: AnyQueryBuilder,
    filter: GameFilter
  ): AnyQueryBuilder {
    if (filter?.ids) {
      query = query.whereIn(`${this.tableName}.id`, filter?.ids);
    }
    if (filter?.client_ids) {
      query = query.whereIn(`${this.tableName}.client_id`, filter?.client_ids);
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

  async list(filter?: GameFilter): Promise<GameModel[]> {
    const query = GameRepository.queryFilter(this.query(), filter);
    return query;
  }

  // NOTE: for paging
  async listPaginate(
    filter?: GameFilter
  ): Promise<{ items: GameModel[]; pagination: Record<string, any> }> {
    const filterPagination = { ...filter };
    delete filterPagination.page;
    delete filterPagination.limit;
    let query = GameRepository.queryFilter(this.query(), filter);
    return super.paginate(query, filter?.page, filter?.limit);
  }

  async countGame(filter: GameFilter): Promise<number> {
    let query = GameRepository.queryFilter(
      this.query().whereNotDeleted(),
      filter
    );
    //@ts-ignore
    const countGames: { num_games: number }[] = await query.select(
      raw('count(id) as num_games')
    );
    return countGames[0].num_games;
  }
}

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetsGameQuery } from '@microservice-platform/game-service/queries/impl';
import { IGameRepository } from '@microservice-platform/game-service/repositories/interfaces';
import { Inject } from '@nestjs/common';
import { REPOSITORIES } from '@microservice-platform/game-service/constants';
import { GameTransformer } from '@microservice-platform/game-service/transformers';
import { getRelationsFromIncludes } from '@microservice-platform/shared/utils';
import { orderBy, sortBy } from 'lodash';

@QueryHandler(GetsGameQuery)
export class GetsGameHandler implements IQueryHandler<GetsGameQuery> {
  @Inject(REPOSITORIES.GAME_REPOSITORY)
  private gameRepository: IGameRepository;

  @Inject(GameTransformer)
  private transformer: GameTransformer;

  async execute(query: GetsGameQuery): Promise<Record<string, any>> {
    const { filter, include } = query;
    let models = await this.gameRepository.list(filter);
    const relations = getRelationsFromIncludes(include);
    models = await this.gameRepository.with(models, relations);
    let totalPage: number = 1;
    if (filter?.limit) {
      const { limit, offset, ...f } = filter;
      const numGames = await this.gameRepository.countGame(f);
      totalPage = Math.ceil(numGames / filter.limit);
    }
    const games = await this.transformer.collection(models, { include })
    return { games, totalPage };
  }
}

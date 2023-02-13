import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetGamesQuery } from '@microservice-platform/game-service/queries/impl';
import { IGameRepository } from '@microservice-platform/game-service/repositories/interfaces';
import { Inject } from '@nestjs/common';
import { REPOSITORIES } from '@microservice-platform/game-service/constants';
import { GameTransformer } from '@microservice-platform/game-service/transformers';
import { getRelationsFromIncludes } from '@microservice-platform/shared/utils';

@QueryHandler(GetGamesQuery)
export class GetGamesHandler implements IQueryHandler<GetGamesQuery> {
  @Inject(REPOSITORIES.GAME_REPOSITORY)
  private gameRepository: IGameRepository;

  @Inject(GameTransformer)
  private transformer: GameTransformer;

  async execute(query: GetGamesQuery): Promise<Record<string, any>> {
    const { filter, include } = query;
    let models = await this.gameRepository.list(filter);
    const relations = getRelationsFromIncludes(include);
    models = await this.gameRepository.with(models, relations);
    // let totalPage: number = 1;
    // if (filter?.limit) {
    //   const { limit, page, ...f } = filter;
    //   const numGames = await this.gameRepository.countGame(f);
    //   totalPage = Math.ceil(numGames / filter.limit);
    // }
    // const games = await this.transformer.collection(models, { include })
    // return { games, totalPage };
    return this.transformer.collection(models, { include });
  }
}

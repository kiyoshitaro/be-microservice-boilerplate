import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetGamesQuery } from '@microservice-platform/game-service/queries/impl';
import { IGameRepository } from '@microservice-platform/game-service/repositories/interfaces';
import { Inject } from '@nestjs/common';
import { REPOSITORIES } from '@microservice-platform/game-service/constants';
import { GameTransformer } from '@microservice-platform/game-service/transformers';

@QueryHandler(GetGamesQuery)
export class GetGamesHandler implements IQueryHandler<GetGamesQuery> {
  @Inject(REPOSITORIES.GAME_REPOSITORY)
  private gameRepository: IGameRepository;

  @Inject(GameTransformer)
  private transformer: GameTransformer;

  async execute(query: GetGamesQuery): Promise<Record<string, any>> {
    const { filter, include } = query;
    let models = await this.gameRepository.list(filter);
    models = await this.gameRepository.with(models, include);
    return this.transformer.collection(models, { include });
  }
}

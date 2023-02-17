import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetGamesQuery } from '@microservice-platform/game-service/queries/impl';
import { IGameRepository } from '@microservice-platform/game-service/repositories/interfaces';
import { Inject } from '@nestjs/common';
import { REPOSITORIES } from '@microservice-platform/game-service/constants';
import { GameTransformer } from '@microservice-platform/game-service/transformers';

@QueryHandler(GetGamesQuery)
export class GetGamesHandler implements IQueryHandler<GetGamesQuery> {
  @Inject(REPOSITORIES.GAME_REPOSITORY)
  private repository: IGameRepository;

  @Inject(GameTransformer)
  private transformer: GameTransformer;

  async execute(query: GetGamesQuery): Promise<Record<string, any>> {
    const { filter, include } = query;
    if (filter.is_pagination) {
      delete filter.is_pagination;
      let modelsPagination = await this.repository.listPaginate(filter);
      let models = await this.repository.with(
        modelsPagination.items,
        include
      );
      return {
        items: await this.transformer.collection(models, { include }),
        pagination: modelsPagination.pagination,
      };
    } else {
      let models = await this.repository.list(filter);
      models = await this.repository.with(models, include);
      return this.transformer.collection(models, { include });
    }
  }
}

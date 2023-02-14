import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetGamesPaginationQuery } from '@microservice-platform/game-service/queries/impl';
import { IGameRepository } from '@microservice-platform/game-service/repositories/interfaces';
import { Inject } from '@nestjs/common';
import { REPOSITORIES } from '@microservice-platform/game-service/constants';
import { GameTransformer } from '@microservice-platform/game-service/transformers';

@QueryHandler(GetGamesPaginationQuery)
export class GetGamesPaginationHandler
  implements IQueryHandler<GetGamesPaginationQuery>
{
  @Inject(REPOSITORIES.GAME_REPOSITORY)
  private repository: IGameRepository;

  @Inject(GameTransformer)
  private transformer: GameTransformer;

  // NOTE: for paging
  async execute(query: GetGamesPaginationQuery): Promise<Record<string, any>> {
    const { filter, include } = query;
    let modelsPagination = await this.repository.listPaginate(filter);
    const models = await this.repository.with(
      modelsPagination.items,
      include
    );
    return {
      items: await this.transformer.collection(models, { include }),
      pagination: modelsPagination.pagination,
    };
  }
}

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetsGameQuery } from '@microservice-platform/game-service/queries/impl';
import { IGameRepository } from '@microservice-platform/game-service/repositories/interfaces';
import { Inject } from '@nestjs/common';
import { REPOSITORIES } from '@microservice-platform/game-service/constants';
import { GameTransformer } from '@microservice-platform/game-service/transformers';
import { getRelationsFromIncludes } from '@microservice-platform/shared/utils';

@QueryHandler(GetsGameQuery)
export class GetsGameHandler implements IQueryHandler<GetsGameQuery> {
  @Inject(REPOSITORIES.GAME_REPOSITORY)
  private repository: IGameRepository;

  @Inject(GameTransformer)
  private transformer: GameTransformer;

  async execute(query: GetsGameQuery): Promise<Record<string, any>> {
    const { filter, include } = query;
    let models = await this.repository.list(filter);
    const relations = getRelationsFromIncludes(include);
    models = await this.repository.with(models, relations);
    return this.transformer.collection(models, { include });
  }
}

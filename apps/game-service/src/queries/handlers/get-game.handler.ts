import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IGameRepository } from '@microservice-platform/game-service/repositories/interfaces';
import { Inject } from '@nestjs/common';
import { REPOSITORIES } from '@microservice-platform/game-service/constants';
import { GameTransformer } from '@microservice-platform/game-service/transformers';
import { getRelationsFromIncludes } from '@microservice-platform/shared/utils';
import { GetGameQuery } from '@microservice-platform/game-service/queries/impl/get-game.query';

@QueryHandler(GetGameQuery)
export class GetGameHandler
  implements IQueryHandler<GetGameQuery, Record<string, any>>
{
  @Inject(REPOSITORIES.GAME_REPOSITORY)
  private repository: IGameRepository;

  @Inject(GameTransformer)
  private transformer: GameTransformer;

  async execute(query: GetGameQuery): Promise<Record<string, any>> {
    const { id, include } = query;
    let model = await this.repository.findById(id);
    const relations = getRelationsFromIncludes(include, 'detail');
    model = await this.repository.with(model, relations);
    return this.transformer.item(model, { include });
  }
}

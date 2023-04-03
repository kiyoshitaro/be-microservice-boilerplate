import { GameModel } from '@microservice-platform/game-service/models';
import { Transformer } from '@microservice-platform/shared/transformers';
import { Transformer$IncludeMethodOptions } from '@microservice-platform/shared/interfaces';
import { Injectable, Inject } from '@nestjs/common';
import { GameInfoTransformer } from './game-info.transformer';

@Injectable()
export class GameTransformer extends Transformer<GameModel> {
  // NOTE: Must define relationMappings of table here
  availableIncludes = ['game_info'];
  defaultIncludes = [];

  constructor(
    @Inject(GameInfoTransformer)
    private readonly gameInfoTransformer: GameInfoTransformer
  ) {
    super();
  }

  async transform(model: GameModel): Promise<Record<string, any> | null> {
    return {
      id: model.id,
      client_id: model.client_id,
      name: model.name,
      logo_url: model.logo_url,
      cover_url: model.cover_url,
    };
  }

  // NOTE: example to transform data when join with other table
  async include_game_info(
    model: GameModel,
    options: Transformer$IncludeMethodOptions
  ) {
    return this.gameInfoTransformer.item(model.game_info, options);
  }

  async include_detail(
    model: GameModel,
    options: Transformer$IncludeMethodOptions
  ) {
    return {
      created_at: model.created_at,
    };
  }
}

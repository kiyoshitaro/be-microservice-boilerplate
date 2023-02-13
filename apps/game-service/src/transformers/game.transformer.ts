import { GameModel } from '@microservice-platform/game-service/models';
import { Transformer } from '@microservice-platform/shared/transformers';
import { Transformer$IncludeMethodOptions } from '@microservice-platform/shared/interfaces';
import { Injectable, Inject } from '@nestjs/common';
import { GameInfoTransformer } from './game-info.transformer';
import { GameTokenTransformer } from './game-token.transformer';

@Injectable()
export class GameTransformer extends Transformer<GameModel> {
  availableIncludes = ['game_info', 'game_token'];
  defaultIncludes = [];

  constructor(
    @Inject(GameInfoTransformer)
    private readonly gameTokenTransformer: GameTokenTransformer,
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

  async include_game_info(
    model: GameModel,
    options: Transformer$IncludeMethodOptions
  ) {
    return this.gameInfoTransformer.item(model.game_info, options);
  }

  async include_game_token(
    model: GameModel,
    options: Transformer$IncludeMethodOptions
  ) {
    return this.gameTokenTransformer.collection(model.game_token, options);
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

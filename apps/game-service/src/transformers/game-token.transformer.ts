import { GameTokenModel } from '@microservice-platform/game-service/models';
import { Transformer } from '@microservice-platform/shared/transformers';
import { Transformer$IncludeMethodOptions } from '@microservice-platform/shared/interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GameTokenTransformer extends Transformer<GameTokenModel> {
  availableIncludes = [];
  defaultIncludes = [];

  constructor() {
    super();
  }

  async transform(model: GameTokenModel): Promise<Record<string, any> | null> {
    return {
      game_id: model.game_id,
      token_id: model.token_id,
    };
  }

  async include_detail(
    model: GameTokenModel,
    options: Transformer$IncludeMethodOptions
  ) {
    return {
      created_at: model.created_at,
    };
  }
}

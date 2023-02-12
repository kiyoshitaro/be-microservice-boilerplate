import { GameInfoModel } from '@microservice-platform/game-service/models';
import { Transformer } from '@microservice-platform/shared/transformers';
import { Transformer$IncludeMethodOptions } from '@microservice-platform/shared/interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GameInfoTransformer extends Transformer<GameInfoModel> {
  availableIncludes = [];
  defaultIncludes = [];

  constructor() {
    super();
  }

  async transform(model: GameInfoModel): Promise<Record<string, any> | null> {
    return {
      id: model.id,
      game_id: model.game_id,
      trait_type_ids: model.trait_type_ids,
      download_url: model.download_url,
      social_url: model.social_url,
      description: model.description,
    };
  }

  async include_detail(
    model: GameInfoModel,
    options: Transformer$IncludeMethodOptions
  ) {
    return {
      created_at: model.created_at,
    };
  }
}

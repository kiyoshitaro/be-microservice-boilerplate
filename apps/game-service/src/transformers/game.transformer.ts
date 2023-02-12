import { GameModel } from '@microservice-platform/game-service/models';
import { Transformer } from '@microservice-platform/shared/transformers';
import { Transformer$IncludeMethodOptions } from '@microservice-platform/shared/interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GameTransformer extends Transformer<GameModel> {
  availableIncludes = [];
  defaultIncludes = [];

  constructor() {
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

  async include_detail(
    model: GameModel,
    options: Transformer$IncludeMethodOptions
  ) {
    return {
      created_at: model.created_at,
    };
  }
}

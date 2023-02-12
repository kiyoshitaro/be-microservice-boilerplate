import { UserGameModel } from '@microservice-platform/user-service/models';
import { Transformer } from '@microservice-platform/shared/transformers';
import { Transformer$IncludeMethodOptions } from '@microservice-platform/shared/interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserGameTransformer extends Transformer<UserGameModel> {
  availableIncludes = ['detail'];
  defaultIncludes = [];

  constructor() {
    super();
  }

  async transform(model: UserGameModel): Promise<Record<string, any> | null> {
    return {
      id: model.user_id,
      game_id: model.game_id,
      level: model.level,
      experience: model.experience,
    };
  }

  async include_detail(
    model: UserGameModel,
    options: Transformer$IncludeMethodOptions
  ) {
    return {
      created_at: model.created_at,
    };
  }
}

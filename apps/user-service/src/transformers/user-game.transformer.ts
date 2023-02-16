import { UserGameModel } from '@microservice-platform/user-service/models';
import { Transformer } from '@microservice-platform/shared/transformers';
import { Transformer$IncludeMethodOptions } from '@microservice-platform/shared/interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { UserTransformer } from './user.transformer';

@Injectable()
export class UserGameTransformer extends Transformer<UserGameModel> {
  availableIncludes = ['user'];
  defaultIncludes = [];

  constructor(
    @Inject(UserTransformer)
    private readonly userTransformer: UserTransformer,
  ) {
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

  async include_user(
    model: UserGameModel,
    options: Transformer$IncludeMethodOptions
  ) {
    return this.userTransformer.item(model.user, options);
  }
}

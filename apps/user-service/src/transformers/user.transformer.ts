import { UserModel } from '@microservice-platform/user-service/models';
import { Transformer } from '@microservice-platform/shared/transformers';
import { Transformer$IncludeMethodOptions } from '@microservice-platform/shared/interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserTransformer extends Transformer<UserModel> {
  availableIncludes = ['detail'];
  defaultIncludes = [];

  constructor() {
    super();
  }

  async transform(model: UserModel): Promise<Record<string, any> | null> {
    return {
      id: model.id,
      email: model.email,
      username: model.username,
      picture: model.picture,
      name: model.name,
    };
  }

  async include_detail(
    model: UserModel,
    options: Transformer$IncludeMethodOptions
  ) {
    return {
      created_at: model.created_at,
    };
  }
}

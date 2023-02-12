import { UserTokenModel } from '@microservice-platform/user-service/models';
import { Transformer } from '@microservice-platform/shared/transformers';
import { Transformer$IncludeMethodOptions } from '@microservice-platform/shared/interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserTokenTransformer extends Transformer<UserTokenModel> {
  availableIncludes = ['detail'];
  defaultIncludes = [];

  constructor() {
    super();
  }

  async transform(model: UserTokenModel): Promise<Record<string, any> | null> {
    return {
      id: model.user_id,
      token_id: model.token_id,
      amount: model.amount,
    };
  }

  async include_detail(
    model: UserTokenModel,
    options: Transformer$IncludeMethodOptions
  ) {
    return {
      created_at: model.created_at,
    };
  }
}

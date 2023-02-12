import { UserItemModel } from '@microservice-platform/user-service/models';
import { Transformer } from '@microservice-platform/shared/transformers';
import { Transformer$IncludeMethodOptions } from '@microservice-platform/shared/interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserItemTransformer extends Transformer<UserItemModel> {
  availableIncludes = ['detail'];
  defaultIncludes = [];

  constructor() {
    super();
  }

  async transform(model: UserItemModel): Promise<Record<string, any> | null> {
    return {
      id: model.user_id,
      item_id: model.item_id,
      quantity: model.quantity,
    };
  }

  async include_detail(
    model: UserItemModel,
    options: Transformer$IncludeMethodOptions
  ) {
    return {
      created_at: model.created_at,
    };
  }
}

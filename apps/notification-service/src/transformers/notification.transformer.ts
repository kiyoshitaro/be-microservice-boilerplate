import { NotificationModel } from '@microservice-platform/notification-service/models';
import { Transformer } from '@microservice-platform/shared/transformers';
import { Transformer$IncludeMethodOptions } from '@microservice-platform/shared/interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationTransformer extends Transformer< NotificationModel> {
  availableIncludes = [];
  defaultIncludes = [];

  constructor() {
    super();
  }

  async transform(
    model: NotificationModel
  ): Promise<Record<string, any> | null> {
    return {
      id: model.id,
    };
  }

  async include_detail(
    model:  NotificationModel,
    options: Transformer$IncludeMethodOptions
  ) {
    return {
      created_at: model.created_at,
    };
  }
}
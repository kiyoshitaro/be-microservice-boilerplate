import { JobModel } from '@microservice-platform/job-service/models';
import { Transformer } from '@microservice-platform/shared/transformers';
import { Transformer$IncludeMethodOptions } from '@microservice-platform/shared/interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JobTransformer extends Transformer<JobModel> {
  availableIncludes = [];
  defaultIncludes = [];

  constructor() {
    super();
  }

  async transform(model: JobModel): Promise<Record<string, any> | null> {
    return {
      id: model.id,
    };
  }

  async include_detail(
    model: JobModel,
    options: Transformer$IncludeMethodOptions
  ) {
    return {
      created_at: model.created_at,
    };
  }
}

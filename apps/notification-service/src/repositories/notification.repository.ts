import { Injectable } from '@nestjs/common';
import { NotificationModel } from '../models';
import { INotificationRepository } from './interfaces';
import { AnyQueryBuilder } from 'objection';
import { NotificationFilter } from '@microservice-platform/notification-service/filters';
import { InjectModel, Repository } from "@microservice-platform/shared/objection";

@Injectable()
export class NotificationRepository
  extends Repository< NotificationModel>
  implements INotificationRepository
{
  @InjectModel(NotificationModel)
  model: NotificationModel;

  static get tableName() {
    return NotificationModel.tableName;
  }

  static extendQueryFilter(
    query: AnyQueryBuilder,
    filter: NotificationFilter
  ): AnyQueryBuilder {
    if (filter?.ids) {
      query = query.whereIn(`${this.tableName}.id`, filter?.ids);
    }
    return query;
  }

  async list(
    filter?: NotificationFilter,
  ): Promise< NotificationModel[] > {
    const query = NotificationRepository.queryFilter(this.query(), filter);
    return query;
  }

  async listPaginate(
    filter?: NotificationFilter,
  ): Promise<{ items: NotificationModel[]; pagination: Record<string, any> }> {
    const filterPagination = { ...filter };
    delete filterPagination.page;
    delete filterPagination.limit;
    let query = NotificationRepository.queryFilter(
      this.query().whereNotDeleted(),
      filter
    );
    return super.paginate(query, filter?.page, filter?.limit);
  }

}

import { Injectable } from '@nestjs/common';
import { ElasticsearchModel } from '../models';
import { IElasticsearchRepository } from './interfaces';
import { AnyQueryBuilder } from 'objection';
import { ElasticsearchFilter } from '@microservice-platform/elasticsearch-service/filters';
import { InjectModel, Repository } from "@microservice-platform/shared/objection";

@Injectable()
export class ElasticsearchRepository
  extends Repository< ElasticsearchModel>
  implements IElasticsearchRepository
{
  @InjectModel(ElasticsearchModel)
  model: ElasticsearchModel;

  static get tableName() {
    return ElasticsearchModel.tableName;
  }

  static extendQueryFilter(
    query: AnyQueryBuilder,
    filter: ElasticsearchFilter
  ): AnyQueryBuilder {
    if (filter?.ids) {
      query = query.whereIn(`${this.tableName}.id`, filter?.ids);
    }
    return query;
  }

  async list(
    filter?: ElasticsearchFilter,
  ): Promise< ElasticsearchModel[] > {
    const query = ElasticsearchRepository.queryFilter(this.query(), filter);
    return query;
  }

  async listPaginate(
    filter?: ElasticsearchFilter,
  ): Promise<{ items: ElasticsearchModel[]; pagination: Record<string, any> }> {
    const filterPagination = { ...filter };
    delete filterPagination.page;
    delete filterPagination.limit;
    let query = ElasticsearchRepository.queryFilter(
      this.query().whereNotDeleted(),
      filter
    );
    return super.paginate(query, filter?.page, filter?.limit);
  }

}

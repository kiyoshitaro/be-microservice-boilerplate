import { ElasticsearchModel } from '../../models';
import { IRepository } from '@microservice-platform/shared/objection';
import { ElasticsearchFilter } from '@microservice-platform/elasticsearch-service/filters';

export interface IElasticsearchRepository extends IRepository< ElasticsearchModel> {
  list(
    filter?: ElasticsearchFilter
  ): Promise< ElasticsearchModel[]>;

  listPaginate(
    filter?: ElasticsearchFilter,
  ): Promise<{ items: ElasticsearchModel[]; pagination: Record<string, any> }>;
}
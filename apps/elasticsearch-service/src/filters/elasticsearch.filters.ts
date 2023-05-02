import { BaseFilter } from '@microservice-platform/shared/objection';
export declare type ElasticsearchFilter = BaseFilter & {
  ids?: (string | number)[];
};

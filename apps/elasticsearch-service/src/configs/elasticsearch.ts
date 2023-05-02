import { registerAs } from '@nestjs/config';
import * as process from 'process';
import {
  ElasticsearchModuleOptions
} from '@nestjs/elasticsearch/dist/interfaces/elasticsearch-module-options.interface';

export const configElasticsearch = registerAs('elasticsearch', (): ElasticsearchModuleOptions => ({
  node: process.env.ELASTICSEARCH_NODE
}));
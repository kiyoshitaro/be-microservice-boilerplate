import { BaseModel } from '@microservice-platform/shared/objection';

class ElasticsearchModel extends BaseModel {
  static tableName = 'elasticsearch';
  static connection = 'postgres';
  id!: string;
  created_at?: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;

  static jsonSchema = {
    type: 'object',

    properties: {
      id: { type: 'string' },
      created_at: { type: ['string', 'null'], format: 'date-time' },
      updated_at: { type: ['string', 'null'], format: 'date-time' },
      deleted_at: { type: ['string', 'null'], format: 'date-time' },
    },
  };
}

export default ElasticsearchModel;

ElasticsearchModel.relationMappings = {};

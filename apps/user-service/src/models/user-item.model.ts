import { BaseModel } from '@microservice-platform/shared/objection';

class UserItemModel extends BaseModel {
  static tableName = 'user_item';
  static connection = 'postgres';
  id!: string;
  user_id!: string;
  item_id!: string;
  quantity!: string;
  created_at?: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;

  static useUUID = true;

  static jsonSchema = {
    type: 'object',

    properties: {
      id: { type: 'string' },
      user_id: { type: 'string' },
      item_id: { type: 'string' },
      quantity: { type: 'string' },
      created_at: { type: ['string', 'null'], format: 'date-time' },
      updated_at: { type: ['string', 'null'], format: 'date-time' },
      deleted_at: { type: ['string', 'null'], format: 'date-time' },
    },
  };
}

export default UserItemModel;

UserItemModel.relationMappings = {};

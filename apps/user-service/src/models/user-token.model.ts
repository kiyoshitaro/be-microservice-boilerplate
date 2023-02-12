import { BaseModel } from '@microservice-platform/shared/objection';

class UserTokenModel extends BaseModel {
  static tableName = 'user_token';
  static connection = 'postgres';
  id!: string;
  user_id!: string;
  token_id!: string;
  amount!: string;
  created_at?: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;

  static useUUID = true;

  static jsonSchema = {
    type: 'object',

    properties: {
      id: { type: 'string' },
      user_id: { type: 'string' },
      token_id: { type: 'string' },
      amount: { type: 'string' },
      created_at: { type: ['string', 'null'], format: 'date-time' },
      updated_at: { type: ['string', 'null'], format: 'date-time' },
      deleted_at: { type: ['string', 'null'], format: 'date-time' },
    },
  };
}

export default UserTokenModel;

UserTokenModel.relationMappings = {};

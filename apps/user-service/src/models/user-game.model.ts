import { BaseModel } from '@microservice-platform/shared/objection';
import UserModel from './user.model';

class UserGameModel extends BaseModel {
  static tableName = 'user_game';
  static connection = 'postgres';
  id!: string;
  user_id!: string;
  game_id!: string;
  level!: number;
  experience!: string;
  created_at?: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;

  static useUUID = true;
  owner: BaseModel;

  static jsonSchema = {
    type: 'object',

    properties: {
      id: { type: 'string' },
      user_id: { type: 'string' },
      game_id: { type: 'string' },
      level: { type: 'number' },
      experience: { type: 'string' },
      created_at: { type: ['string', 'null'], format: 'date-time' },
      updated_at: { type: ['string', 'null'], format: 'date-time' },
      deleted_at: { type: ['string', 'null'], format: 'date-time' },
    },
  };
}

export default UserGameModel;

UserGameModel.relationMappings = {
  owner: {
    relation: BaseModel.BelongsToOneRelation,
    modelClass: () => UserModel,
    join: {
      from: 'user_game.user_id',
      to: 'users.id',
    },
  },
};

import { BaseModel } from '@microservice-platform/shared/objection';
import UserGameModel from './user-game.model';

class UserModel extends BaseModel {
  static tableName = 'users';
  static connection = 'postgres';
  id!: string;
  email!: string;
  username!: string;
  picture?: string;
  name?: string;
  created_at?: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;

  static useUUID = true;
  user_game: UserGameModel[];

  static jsonSchema = {
    type: 'object',

    properties: {
      id: { type: 'string' },
      email: { type: 'string' },
      username: { type: 'string' },
      picture: { type: ['string', 'null'] },
      name: { type: ['string', 'null'] },
      created_at: { type: ['string', 'null'], format: 'date-time' },
      updated_at: { type: ['string', 'null'], format: 'date-time' },
      deleted_at: { type: ['string', 'null'], format: 'date-time' },
    },
  };
}

export default UserModel;

UserModel.relationMappings = {
  user_game: {
    relation: BaseModel.HasManyRelation,
    modelClass: () => UserGameModel,
    join: {
      from: 'users.id',
      to: 'user_game.user_id',
    },
  },
};

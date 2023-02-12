import { BaseModel } from '@microservice-platform/shared/objection';
import {
  GameInfoModel,
  GameTokenModel,
} from '@microservice-platform/game-service/models';

class GameModel extends BaseModel {
  static tableName = 'games';
  static connection = 'postgres';
  id!: string;
  client_id!: string;
  name!: string;
  logo_url!: string;
  cover_url!: string;

  created_at?: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;

  static useUUID = true;
  game_info: BaseModel;
  game_tokens: BaseModel[];

  static jsonSchema = {
    type: 'object',

    properties: {
      id: { type: 'string' },
      client_id: { type: 'string' },
      name: { type: 'string' },
      logo_url: { type: 'string' },
      cover_url: { type: 'string' },
      created_at: { type: ['string', 'null'], format: 'date-time' },
      updated_at: { type: ['string', 'null'], format: 'date-time' },
      deleted_at: { type: ['string', 'null'], format: 'date-time' },
    },
  };
}

export default GameModel;

GameModel.relationMappings = {
  game_info: {
    relation: BaseModel.HasOneRelation,
    modelClass: () => GameInfoModel,
    join: {
      from: 'games.id',
      to: 'game_info.game_id',
    },
  },
  game_tokens: {
    relation: BaseModel.HasManyRelation,
    modelClass: () => GameTokenModel,
    join: {
      from: 'games.id',
      to: 'game_token.game_id',
    },
  },
};

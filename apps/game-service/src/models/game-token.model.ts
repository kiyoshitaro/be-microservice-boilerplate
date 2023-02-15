import { BaseModel } from '@microservice-platform/shared/objection';
import { GameModel } from '@microservice-platform/game-service/models';

class GameTokenModel extends BaseModel {
  static tableName = 'game_token';
  static connection = 'postgres';
  game_id!: string;
  token_id!: string;

  created_at?: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;

  game: GameModel;

  static jsonSchema = {
    type: 'object',

    properties: {
      game_id: { type: 'string' },
      token_id: { type: 'string' },
      created_at: { type: ['string', 'null'], format: 'date-time' },
      updated_at: { type: ['string', 'null'], format: 'date-time' },
      deleted_at: { type: ['string', 'null'], format: 'date-time' },
    },
  };
}

export default GameTokenModel;

GameTokenModel.relationMappings = {
  game: {
    relation: BaseModel.BelongsToOneRelation,
    modelClass: () => GameModel,
    join: {
      from: 'game_info.game_id',
      to: 'games.id',
    },
  },
};

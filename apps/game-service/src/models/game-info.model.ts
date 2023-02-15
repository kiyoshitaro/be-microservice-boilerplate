import { BaseModel } from '@microservice-platform/shared/objection';
import { GameModel } from '@microservice-platform/game-service/models';

class GameInfoModel extends BaseModel {
  static tableName = 'game_info';
  static connection = 'postgres';
  id!: string;
  game_id!: string;
  trait_type_ids!: string;
  download_url!: string;
  social_url!: string;
  description!: string;
  created_at?: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;

  static useUUID = true;
  game: GameModel;

  static jsonSchema = {
    type: 'object',

    properties: {
      id: { type: 'string' },
      game_id: { type: 'string' },
      trait_type_ids: { type: 'string' },
      download_url: { type: 'string' },
      social_url: { type: 'string' },
      description: { type: 'string' },
      created_at: { type: ['string', 'null'], format: 'date-time' },
      updated_at: { type: ['string', 'null'], format: 'date-time' },
      deleted_at: { type: ['string', 'null'], format: 'date-time' },
    },
  };
}

export default GameInfoModel;

GameInfoModel.relationMappings = {
  game: {
    relation: BaseModel.BelongsToOneRelation,
    modelClass: () => GameModel,
    join: {
      from: 'game_info.game_id',
      to: 'games.id',
    },
  },
};

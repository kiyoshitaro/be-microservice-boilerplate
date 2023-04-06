import { BaseFilter } from '../../modules/objection/interfaces';

export declare type GameInfoFilter = BaseFilter & {
  ids?: (string | number)[];
  game_ids?: string[];
  trait_type_ids?: string[];
};

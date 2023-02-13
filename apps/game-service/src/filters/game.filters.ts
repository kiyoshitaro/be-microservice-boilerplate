import { OrderByDirection } from "objection";

export declare type GameFilter = {
  orderBy?: string;
  sortBy?: OrderByDirection;
  limit?: number;
  offset?: number;
  ids?: (string | number)[];
  client_ids?: string[];
  searchText?: string;
};

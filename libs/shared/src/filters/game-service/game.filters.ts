import { BaseFilter } from '@microservice-platform/shared/objection';
import { RequireWith } from '@microservice-platform/shared/validator';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class GameFilter extends BaseFilter {
  @IsOptional()
  @IsUUID(4, { each: true })
  ids?: (string | number)[];

  @IsOptional()
  @IsUUID(4, { each: true })
  client_ids?: string[];

  @IsOptional()
  @IsBoolean()
  is_pagination?: boolean;
}

export class GameElasticSearchFilter {
  @IsOptional()
  @IsString()
  search_text?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @RequireWith(['page'])
  limit?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @RequireWith(['limit'])
  page?: number;
}

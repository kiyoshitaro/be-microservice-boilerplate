import { GameFilter } from '@microservice-platform/shared/filters/game-service';
import {
  RequireWith,
  TransformArrayString,
} from '@microservice-platform/shared/validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsIn, IsOptional, IsString } from 'class-validator';

export class GetGamesQueryDto extends GameFilter {
  @ApiPropertyOptional({
    nullable: true,
    isArray: true,
    enum: ['name', 'cover_url', 'logo_url'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @RequireWith(['search_text'])
  @IsIn(['name', 'cover_url', 'logo_url'], { each: true })
  @TransformArrayString()
  search_by?: string[];

  @ApiPropertyOptional({
    example: 'Test',
    nullable: true,
    type: String,
  })
  @IsOptional()
  @IsString()
  @RequireWith(['search_by'])
  search_text?: string;

  @ApiPropertyOptional({
    example: 'name',
    nullable: true,
    enum: ['name', 'created_at'],
  })
  @IsOptional()
  @IsString()
  @RequireWith(['sort_by'])
  @IsIn(['name', 'created_at'])
  order_by?: string;
}

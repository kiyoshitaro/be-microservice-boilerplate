import { GameFilter } from '@microservice-platform/shared/filters/game-service';
import { IncludeDto } from '@microservice-platform/shared/dtos';
import { IntersectionType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, ValidateNested } from 'class-validator';

export class GetGamesDto extends IntersectionType(IncludeDto) {
  @Type(() => GameFilter)
  @ValidateNested()
  filters: GameFilter;

  // NOTE: for paging
  @IsOptional()
  @IsBoolean()
  isPagination: boolean;
}

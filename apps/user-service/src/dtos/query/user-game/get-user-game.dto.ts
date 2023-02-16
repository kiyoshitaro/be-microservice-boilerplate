import { IncludeDto } from '@microservice-platform/shared/dtos';
import { UserGameFilter } from '@microservice-platform/shared/filters/user-service';
import { IntersectionType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class GetUserGameDto extends IntersectionType(IncludeDto) {
  @Type(() => UserGameFilter)
  @ValidateNested()
  filters: UserGameFilter;
}

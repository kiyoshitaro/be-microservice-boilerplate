import { BaseFilter } from '@microservice-platform/shared/objection';
import { IsOptional, IsUUID } from 'class-validator';

export class UserFilter extends BaseFilter {
  @IsOptional()
  @IsUUID(4, { each: true })
  ids?: (string | number)[];
}

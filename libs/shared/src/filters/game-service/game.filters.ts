import { BaseFilter } from "@microservice-platform/shared/objection";
import { IsBoolean, IsOptional, IsUUID } from "class-validator";

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

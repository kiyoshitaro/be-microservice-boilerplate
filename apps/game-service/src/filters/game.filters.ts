import { BaseFilter } from "@microservice-platform/shared/objection";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsUUID } from "class-validator";

export class GameFilter extends BaseFilter {
  @ApiProperty({
    maxLength: 255,
    example: 'nekoverse',
    required: false,
  })
  @IsOptional()
  @IsString()
  // @IsUrl()
  // @Matches(/^[0-9a-zA-Z]+( [0-9a-zA-Z]+)*$/)
  // @IsIn(['plain', 's256', 'S256', 'sha256', 'SHA256'])
  search_text?: string;

  @IsOptional()
  @IsUUID(4, { each: true })
  ids?: (string | number)[];

  @IsOptional()
  @IsUUID(4, { each: true })
  client_ids?: string[];
}

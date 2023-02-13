import { BaseFilter } from '@microservice-platform/shared/objection';
import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { RequireWith } from 'libs/shared/src/validator';

export class GetGamesQueryDto extends IntersectionType(BaseFilter, BaseFilter) {
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



  @ApiPropertyOptional({
    example: 'id',
    nullable: true,
    enum: ["created_at", "name"]
  })
  @IsOptional()
  @IsString()
  @RequireWith(['sort_by'])
  order_by?: string;
}

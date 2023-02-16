import { RequireWith, TransformArrayNumber } from "@microservice-platform/shared/validator";
import { BaseFilter } from "@microservice-platform/shared/objection";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsIn, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { GameFilter } from "../game-service";

export class UserGameFilter extends BaseFilter {
  @ApiProperty({
    maxLength: 255,
    example: 'nekoverse',
    required: false,
  })
  @IsOptional()
  @IsString()
  search_text?: string;

  @IsOptional()
  @IsUUID(4, { each: true })
  ids?: (string | number)[];

  @IsOptional()
  @IsArray()
  @IsUUID(4, { each: true })
  game_ids?: string[];

  @IsOptional()
  @IsArray()
  @IsUUID(4, { each: true })
  user_ids?: string[];


  @ApiPropertyOptional({
    example: '1,2,3',
    nullable: true,
    type: [Number],
    format: "form"
  })
  @IsOptional()
  @IsNumber({}, { each: true })
  @TransformArrayNumber()
  levels?: number[];


  @ApiPropertyOptional({
    example: '0,1',
    nullable: true,
    type: [Number],
    format: "form"
  })
  @IsOptional()
  @IsNumber({}, { each: true })
  @TransformArrayNumber()
  experiences?: number[];


  @ApiPropertyOptional({
    example: 'id',
    nullable: true,
    enum: ["level", "experience", "created_at"]
  })
  @IsOptional()
  @IsString()
  @RequireWith(['sort_by'])
  @IsIn(["level", "experience", "created_at"])
  order_by?: string;


  //USer for other gateway modifiy 
  @IsOptional()
  @IsBoolean()
  is_pagination?: boolean;


  // Nest with related service filter 
  @IsOptional()
  @ValidateNested()
  @Type(() => GameFilter)
  gameFilter?: GameFilter;
}

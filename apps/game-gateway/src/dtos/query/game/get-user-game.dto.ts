import { UserGameFilter } from '@microservice-platform/shared/filters/user-service';
import { RequireWith, TransformArrayString } from '@microservice-platform/shared/validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsIn, IsOptional, IsString } from 'class-validator';

// export class GetUserGamesQueryDto extends UserGameFilter { }
export class GetUserGamesQueryDto extends UserGameFilter {
  @ApiPropertyOptional({
    nullable: true,
    isArray: true,
    enum: ["name", "email", "username"]
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @RequireWith(['search_text'])
  @IsIn(["name", "email", "username"], { each: true })
  @TransformArrayString()
  search_by?: string[];

  @ApiPropertyOptional({
    example: '13814',
    nullable: true,
    type: String,
  })
  @IsOptional()
  @IsString()
  @RequireWith(['search_by'])
  search_text?: string;

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

}

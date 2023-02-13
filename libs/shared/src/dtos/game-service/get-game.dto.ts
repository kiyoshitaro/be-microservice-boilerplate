import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class GetGameDetailDto {
  @ApiProperty({
    example: '',
    nullable: false,
  })
  @IsNotEmpty()
  @IsUUID(4)
  id: string
}

export class GetGamesDto {
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


  @ApiProperty({ example: 1, required: false, })
  @IsOptional()
  // @IsNumber()
  limit?: number;

  @ApiProperty({ example: 1, required: false, })
  @IsOptional()
  // @IsNumber()
  offset?: number;
}
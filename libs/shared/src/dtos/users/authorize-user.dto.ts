import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthorizeUserDto {
  @ApiProperty({
    example: '9cb8366e-f654-45fe-866c-78029d6bb4ec',
    nullable: false,
  })
  @IsNotEmpty()
  @IsUUID(4)
  client_id: string;

  @ApiProperty({ example: 'code', nullable: false })
  @IsNotEmpty()
  @IsString()
  @IsIn(['code', 'token'])
  response_type: string;

  @ApiProperty({
    maxLength: 255,
    example: 'http://example.com',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  // @IsUrl()
  redirect_uri?: string;

  @ApiProperty({ maxLength: 255, example: 'scope1 scope2', nullable: true })
  @IsOptional()
  @IsString()
  @Matches(/^[0-9a-zA-Z]+( [0-9a-zA-Z]+)*$/)
  scope?: string;

  @ApiProperty({ maxLength: 255, example: 'state1', nullable: true })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({ maxLength: 255, nullable: true })
  @IsOptional()
  @IsString()
  code_challenge?: string;

  @ApiProperty({ maxLength: 255, nullable: true })
  @IsOptional()
  @IsString()
  @IsIn(['plain', 's256', 'S256', 'sha256', 'SHA256'])
  code_challenge_method?: string;
}

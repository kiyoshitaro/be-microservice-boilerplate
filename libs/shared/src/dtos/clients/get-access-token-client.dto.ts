import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetAccessTokenDto {
  @ApiProperty({
    example: '9cb8366e-f654-45fe-866c-78029d6bb4ec',
    nullable: true,
  })
  @IsUUID(4)
  @IsOptional()
  client_id?: string;

  @ApiProperty({ example: 'hajksdhkjashdkhasd', nullable: true })
  @IsOptional()
  @IsString()
  client_secret?: string;

  @ApiProperty({
    maxLength: 255,
    example: 'http://example.com',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  redirect_uri?: string;

  @ApiProperty({
    maxLength: 255,
    example: 'lksdajfklsdhjfjkdshjkfdhsujfhd',
    nullable: false,
  })
  @IsOptional()
  code?: string;

  @ApiProperty({
    maxLength: 255,
    example: 'authorization_code',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(['authorization_code', 'refresh_token', 'client_credentials'])
  grant_type: string;

  @ApiProperty({ maxLength: 255, nullable: true })
  @IsOptional()
  @IsString()
  code_verifier?: string;

  @ApiProperty({ maxLength: 255, nullable: true })
  @IsOptional()
  @IsString()
  refresh_token?: string;
}

export class GetAccessTokenExtendDto {
  @IsNotEmpty()
  @IsString()
  audience: string;

  @IsNotEmpty()
  @IsUUID(4)
  user_id: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9a-zA-Z]+( [0-9a-zA-Z]+)*$/)
  scope: string;

  @IsOptional()
  @IsUUID(4)
  refresh_token_id?: string;

  @IsOptional()
  @IsUUID(4)
  auth_code_id?: string;
}

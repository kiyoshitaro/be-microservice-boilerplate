import {
  IsBoolean,
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccessTokenDto {
  @ApiProperty({
    nullable: false,
    example: 'b268eb9a-0230-4a0d-8eb8-9031dc0f60e6',
  })
  @IsNotEmpty()
  @IsUUID(4)
  client_id: string;

  @ApiProperty({
    maxLength: 255,
    example: 'jkasjdasjdlkjakdadadao',
    nullable: false,
  })
  @IsOptional()
  @IsUUID(4)
  user_id?: string;

  @ApiProperty({ maxLength: 255, example: 'scope 1', nullable: true })
  @MaxLength(255)
  @Matches(/^[0-9a-zA-Z]+( [0-9a-zA-Z]+)*$/)
  scope: string;

  @ApiProperty({
    maxLength: 255,
    example: 'authorization_code',
    nullable: false,
  })
  @MaxLength(255)
  @IsString()
  @IsIn(['authorization_code', 'refresh_token', 'client_credentials'])
  grant_type: string;

  @ApiProperty({
    example: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  revoked: boolean;

  @ApiProperty({ nullable: false })
  @IsDateString()
  @MaxLength(255)
  expires_at: Date;
}

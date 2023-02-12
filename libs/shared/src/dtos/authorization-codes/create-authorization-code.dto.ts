import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorizationCodeDto {
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
  @IsNotEmpty()
  @IsUUID(4)
  user_id: string;

  @ApiProperty({ maxLength: 255, example: 'scope 1', nullable: false })
  @IsNotEmpty()
  @MaxLength(255)
  @Matches(/^[0-9a-zA-Z]+( [0-9a-zA-Z]+)*$/)
  scope: string;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  @IsDateString()
  @MaxLength(255)
  expires_at: Date;

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  code_challenge?: string;

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  code_challenge_method?: string;
}

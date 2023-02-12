import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRefreshTokenDto {
  @ApiProperty({
    nullable: false,
    example: 'b268eb9a-0230-4a0d-8eb8-9031dc0f60e6',
  })
  @IsNotEmpty()
  @IsUUID(4)
  access_token_id: string;

  @ApiProperty({
    example: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  revoked: boolean;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  @IsDateString()
  @MaxLength(255)
  expires_at: Date;
}

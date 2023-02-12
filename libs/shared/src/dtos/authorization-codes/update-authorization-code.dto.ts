import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  Matches,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAuthorizationCodeDto {
  @ApiProperty({
    nullable: false,
    example: 'b268eb9a-0230-4a0d-8eb8-9031dc0f60e6',
  })
  @IsNotEmpty()
  @IsUUID(4)
  id: string;

  @ApiProperty({ maxLength: 255, example: 'scope 1', nullable: true })
  @IsOptional()
  @MaxLength(255)
  @Matches(/^[0-9a-zA-Z]+( [0-9a-zA-Z]+)*$/)
  scope?: string;

  @ApiProperty({ nullable: true, example: true })
  @IsOptional()
  @IsBoolean()
  revoked?: boolean;
}

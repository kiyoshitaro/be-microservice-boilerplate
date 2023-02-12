import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    nullable: false,
    example: 'b268eb9a-0230-4a0d-8eb8-9031dc0f60e6',
  })
  @IsNotEmpty()
  @IsUUID(4)
  id: string;

  @ApiProperty({ maxLength: 255, example: 'abc@email.com', nullable: false })
  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string;

  @ApiProperty({ maxLength: 255, example: 'abc123', nullable: false })
  @IsOptional()
  @MaxLength(255)
  password?: string;

  @ApiProperty({ maxLength: 255, example: 'abc123', nullable: false })
  @IsOptional()
  @MaxLength(255)
  google_id?: string;
}

import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'b268eb9a-0230-4a0d-8eb8-9031dc0f60e6',
    nullable: true,
  })
  @IsOptional()
  @IsUUID(4)
  id?: string;

  @ApiProperty({ maxLength: 255, example: 'abc@email.com', nullable: false })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiProperty({ maxLength: 255, example: 'abc123', nullable: false })
  @IsOptional()
  @MaxLength(255)
  password?: string;

  @ApiProperty({ maxLength: 255, example: 'abc123', nullable: false })
  @IsOptional()
  @MaxLength(255)
  confirmed_password?: string;

  @ApiProperty({ maxLength: 255, example: 'abc123', nullable: false })
  @IsOptional()
  @MaxLength(255)
  google_id?: string;
}

import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ maxLength: 255, example: 'abc@email.com', nullable: false })
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @ApiProperty({ maxLength: 255, example: 'abc123', nullable: false })
  @IsNotEmpty()
  @MaxLength(255)
  password: string;
}

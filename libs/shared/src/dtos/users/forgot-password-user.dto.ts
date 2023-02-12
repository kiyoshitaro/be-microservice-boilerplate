import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({ maxLength: 255, example: 'abc@email.com', nullable: false })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email: string;
}

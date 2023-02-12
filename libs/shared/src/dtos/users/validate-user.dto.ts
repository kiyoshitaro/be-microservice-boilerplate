import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ValidateUserDto {
  @ApiProperty({
    example: 'a@gmail.com',
    nullable: false,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

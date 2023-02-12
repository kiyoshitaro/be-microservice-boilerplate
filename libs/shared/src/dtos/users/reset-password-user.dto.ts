import { IsNotEmpty, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ maxLength: 255, example: 'abc123', nullable: false })
  @IsNotEmpty()
  @MaxLength(255)
  password: string;

  @ApiProperty({ maxLength: 255, example: 'abc123', nullable: false })
  @IsNotEmpty()
  @MaxLength(255)
  confirmed_password: string;

  @ApiProperty({ maxLength: 255, example: 'abc123', nullable: false })
  @IsNotEmpty()
  @MaxLength(255)
  reset_password_token: string;
}

export class ResetPasswordExtendDto {
  @IsNotEmpty()
  @IsUUID(4)
  user_id: string;
}

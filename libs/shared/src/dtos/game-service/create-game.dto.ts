import { IsNotEmpty, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGameDto {
  @ApiProperty({ maxLength: 255, example: 'abc' })
  @IsNotEmpty()
  @MaxLength(255)
  logo_url: string;

  @ApiProperty({ maxLength: 255, example: 'abc' })
  @IsNotEmpty()
  @MaxLength(255)
  cover_url: string;

  @ApiProperty({ maxLength: 255, example: 'abc' })
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    example: '55c69259-f463-47a8-9a2d-5131108a93c4',
    nullable: false,
  })
  @IsUUID()
  client_id: string;
}

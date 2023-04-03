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
    example: 'dd165d11-f5c8-4079-9290-07ca60ed8401',
    nullable: false,
  })
  @IsUUID()
  client_id: string;
}

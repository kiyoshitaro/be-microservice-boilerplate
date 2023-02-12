import {
  IsArray,
  IsNotEmpty,
  IsObject,
  Matches,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({
    maxLength: 255,
    example: 'jkasjdasjdlkjakdadadao',
    nullable: false,
  })
  @IsNotEmpty()
  @MaxLength(255)
  client_secret: string;

  @ApiProperty({
    example: 'https://example.com/login',
    nullable: false,
  })
  @IsNotEmpty()
  @IsArray()
  redirect_uri: Array<string>;

  @ApiProperty({
    example: { authorization_code: 'https://example.com' },
    nullable: false,
  })
  @IsNotEmpty()
  @IsObject()
  aud: object;

  @ApiProperty({ example: ['type 1'], nullable: false })
  @IsNotEmpty()
  @IsArray()
  grant_types: string[];

  @ApiProperty({ maxLength: 255, example: 'scope 1', nullable: false })
  @IsNotEmpty()
  @MaxLength(255)
  @Matches(/^[0-9a-zA-Z]+( [0-9a-zA-Z]+)*$/)
  scope: string;
}

import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
export class GameDataIndex {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  name: string;
}

export class CreateGameIndexByIdDto {
  @IsNotEmpty()
  @IsUUID(4)
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  cover_url: string;

  @IsNotEmpty()
  @IsString()
  logo_url: string;

  @IsDate()
  expired_at: Date;
}

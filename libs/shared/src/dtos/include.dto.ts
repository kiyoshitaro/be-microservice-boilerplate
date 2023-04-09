import { IsNumber, IsOptional, IsString } from 'class-validator';

export class IncludeDto {
  @IsString()
  @IsOptional()
  include: string;

  @IsNumber()
  @IsOptional()
  ttl?: number;
}

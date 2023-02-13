import { IsOptional, IsString } from 'class-validator';

export class IncludeDto {
  @IsString()
  @IsOptional()
  include: string;
}

import { IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDto {
  @ApiProperty({ maxLength: 255, example: 'abc' })
  @IsNotEmpty()
  @MaxLength(255)
  description: string;

  @ApiProperty({ maxLength: 255, example: 'abc' })
  @IsNotEmpty()
  @MaxLength(255)
  test_column: string;
}

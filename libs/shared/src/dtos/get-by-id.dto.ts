import { IntersectionType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { IncludeDto } from './include.dto';

export class GetByIdDto extends IntersectionType(IncludeDto) {
  @ApiProperty({
    example: 'b606564b-f923-4034-86bd-7e4b8feb9fd7',
    nullable: false,
  })
  @IsUUID()
  id: string;
}

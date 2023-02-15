import { IntersectionType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { IncludeDto } from './include.dto';

export class GetByIdDto extends IntersectionType(IncludeDto) {
  @ApiProperty({
    example: 'b0feba33-0ed3-4983-a38f-dd3abbd89b1b',
    nullable: false,
  })
  @IsUUID()
  id: string;
}

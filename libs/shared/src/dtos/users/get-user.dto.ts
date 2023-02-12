import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserDto {
  @ApiProperty({
    example: 'b268eb9a-0230-4a0d-8eb8-9031dc0f60e6',
    nullable: true,
  })
  @IsNotEmpty()
  @IsUUID(4)
  id: string;
}

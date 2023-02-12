import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetClientDto {
  @ApiProperty({
    example: 'b268eb9a-0230-4a0d-8eb8-9031dc0f60e6',
    nullable: false,
  })
  @IsNotEmpty()
  @IsUUID(4)
  client_id: string;
}

import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetRefreshTokenInfoDto {
  @ApiProperty({
    nullable: false,
    example: 'b268eb9a-0230-4a0d-8eb8-9031dc0f60e6',
  })
  @IsNotEmpty()
  @IsUUID(4)
  jti: string;
}

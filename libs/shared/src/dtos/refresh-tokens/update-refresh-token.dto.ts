import { IsBoolean, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRefreshTokenDto {
  @ApiProperty({
    nullable: false,
    example: 'b268eb9a-0230-4a0d-8eb8-9031dc0f60e6',
  })
  @IsNotEmpty()
  @IsUUID(4)
  id: string;

  @ApiProperty({ nullable: true, example: true })
  @IsOptional()
  @IsBoolean()
  revoked?: boolean;
}

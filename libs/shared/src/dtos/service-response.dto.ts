import { ApiProperty } from '@nestjs/swagger';

export class ServiceResponseDto {
  @ApiProperty({ nullable: true })
  errors?: { [key: string]: any };
  @ApiProperty({
    nullable: true,
    example: [
      {
        id: '25cfca82-f965-4718-b152-a066503538d8',
        test_column: 'abc',
      },
    ],
  })
  data: any;
  @ApiProperty()
  statusCode: number;
  @ApiProperty({ nullable: true })
  message?: string | string[];
}

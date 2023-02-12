---
to: libs/shared/src/dtos/<%=name%>-service/create-<%=name%>.dto.ts
---
import { IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Create<%= h.changeCase.pascalCase(name) %>Dto {
    @ApiProperty({ maxLength: 255, example: 'abc' })
    @IsNotEmpty()
    @MaxLength(255)
    description: string;

    @ApiProperty({ maxLength: 255, example: 'abc' })
    @IsNotEmpty()
    @MaxLength(255)
    test_column: string;
}
---
to: apps/<%=name%>-gateway/src/controllers/<%=name%>.controller.ts
---
import { ApiTags, ApiOkResponse,  } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';


@ApiTags('<%=name%>-gateway')
@Controller('<%=name%>')
export class <%= h.changeCase.pascalCase(name) %>Controller {
  @Get('')
  public async ping<%= h.changeCase.pascalCase(name) %>(): Promise<any>{
    return {
        data: "Hello World, <%= h.changeCase.pascalCase(name) %> Gateway"
    }
  }
}


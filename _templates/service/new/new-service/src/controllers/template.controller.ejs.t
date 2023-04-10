---
to: apps/<%=name%>-service/src/controllers/<%=name%>.controller.ts
---
import { <%= h.changeCase.pascalCase(name) %>Service } from '@microservice-platform/<%=name%>-service/services';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { <%= h.changeCase.pascalCase(name) %>Filter } from '@microservice-platform/<%=name%>-service/filters';
import { CacheTTL, Controller, HttpStatus, UseInterceptors } from '@nestjs/common';
import {
  Create<%= h.changeCase.pascalCase(name) %>Dto,
  ServiceResponseDto,
} from '@microservice-platform/shared/dtos';
import { MicroserviceCacheFactory } from '@microservice-platform/shared/cache';
import { MicroserviceCacheInterceptor } from '@microservice-platform/shared/interceptors';

@Controller('<%=name%>')
export class <%= h.changeCase.pascalCase(name) %>Controller {
  constructor(private readonly <%= h.changeCase.camelCase(name) %>Service: <%= h.changeCase.pascalCase(name) %>Service) {}

  @CacheTTL(MicroserviceCacheFactory)
  @UseInterceptors(MicroserviceCacheInterceptor)
  @MessagePattern('get_all')
  async getData(filters?: <%= h.changeCase.pascalCase(name) %>Filter): Promise<ServiceResponseDto> {
    const result = await this.<%= h.changeCase.camelCase(name) %>Service.list(filters);
    return {
      statusCode: HttpStatus.OK,
      data: result,
    };
  }

  @MessagePattern('create_<%= h.changeCase.snakeCase(name) %>')
  async createTemplate(
    @Payload() data: Create<%= h.changeCase.pascalCase(name) %>Dto
  ): Promise<ServiceResponseDto> {
    const result = await this.<%= h.changeCase.camelCase(name) %>Service.create(data);
    return {
      statusCode: HttpStatus.OK,
      data: result,
    };
  }
}
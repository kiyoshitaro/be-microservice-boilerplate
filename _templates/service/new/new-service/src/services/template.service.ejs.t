---
to: apps/<%=name%>-service/src/services/<%=name%>.service.ts
---
import { Injectable } from '@nestjs/common';
import { <%= h.changeCase.pascalCase(name) %>Filter } from '@microservice-platform/<%=name%>-service/filters';
import { Service } from '@microservice-platform/<%=name%>-service/services/service';
import { Gets<%= h.changeCase.pascalCase(name) %>Query } from '@microservice-platform/<%=name%>-service/queries/impl';
import { Create<%= h.changeCase.pascalCase(name) %>Command } from '@microservice-platform/<%=name%>-service/commands/impl';
import { Get<%= h.changeCase.pascalCase(name) %>Query } from '@microservice-platform/<%=name%>-service/queries/impl';
import { Create<%= h.changeCase.pascalCase(name) %>Dto } from '@microservice-platform/shared/dtos';

@Injectable()
export class <%= h.changeCase.pascalCase(name) %>Service extends Service {

  async list(
    filters?: <%= h.changeCase.pascalCase(name) %>Filter,
    include = ''
  ): Promise<Record<string, any>[]> {
    return this.queryBus.execute(new Gets<%= h.changeCase.pascalCase(name) %>Query(filters, include));
  }

  async create(
    data: Create<%= h.changeCase.pascalCase(name) %>Dto & { template_category_id?: string }
  ): Promise<Record<string, any>> {
    const template = await this.commandBus.execute(
      new Create<%= h.changeCase.pascalCase(name) %>Command(data)
    );
    return this.queryBus.execute(new Get<%= h.changeCase.pascalCase(name) %>Query(template.id, 'detail'));
  }
}
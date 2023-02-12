---
to: apps/<%=name%>-service/src/commands/impl/create-<%=name%>.command.ts
---
import { Create<%= h.changeCase.pascalCase(name) %>Dto } from '@microservice-platform/shared/dtos';

export class Create<%= h.changeCase.pascalCase(name) %>Command {
  constructor(
    public readonly data: Create<%= h.changeCase.pascalCase(name) %>Dto & { <%= h.changeCase.snakeCase(name) %>_service_category_id?: string }
  ) {}
}
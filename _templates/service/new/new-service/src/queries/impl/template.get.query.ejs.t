---
to: apps/<%=name%>-service/src/queries/impl/get-<%=name%>.query.ts
---
import { BaseQuery } from '@microservice-platform/<%=name%>-service/queries/query';

export class Get<%= h.changeCase.pascalCase(name) %>Query extends BaseQuery {
  constructor(
    public readonly id: string,
    public readonly include: string = ''
  ) {
    super(include);
  }
}
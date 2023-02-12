---
to: apps/<%=name%>-service/src/queries/impl/gets-<%=name%>.query.ts
---
import { BaseQuery } from '@microservice-platform/<%=name%>-service/queries/query';
import { <%= h.changeCase.pascalCase(name) %>Filter } from '@microservice-platform/<%=name%>-service/filters';

export class Gets<%= h.changeCase.pascalCase(name) %>Query extends BaseQuery {
  constructor(
    public readonly filter: <%= h.changeCase.pascalCase(name) %>Filter,
    public readonly include: string = ''
  ) {
    super(include);
  }
}
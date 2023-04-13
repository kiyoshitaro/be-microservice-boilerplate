---
to: apps/<%=name%>-service/src/repositories/interfaces/<%=name%>.interface.ts
---
import { <%= h.changeCase.pascalCase(name) %>Model } from '../../models';
import { IRepository } from '@microservice-platform/shared/objection';
import { <%= h.changeCase.pascalCase(name) %>Filter } from '@microservice-platform/<%=name%>-service/filters';

export interface I<%= h.changeCase.pascalCase(name) %>Repository extends IRepository< <%= h.changeCase.pascalCase(name) %>Model> {
  list(
    filter?: <%= h.changeCase.pascalCase(name) %>Filter
  ): Promise< <%= h.changeCase.pascalCase(name) %>Model[]>;

  listPaginate(
    filter?: <%= h.changeCase.pascalCase(name) %>Filter,
  ): Promise<{ items: <%= h.changeCase.pascalCase(name) %>Model[]; pagination: Record<string, any> }>;
}
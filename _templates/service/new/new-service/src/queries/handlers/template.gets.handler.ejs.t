---
to: apps/<%=name%>-service/src/queries/handlers/gets-<%=name%>.handler.ts
---
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Gets<%= h.changeCase.pascalCase(name) %>Query } from '@microservice-platform/<%=name%>-service/queries/impl';
import { I<%= h.changeCase.pascalCase(name) %>Repository } from '@microservice-platform/<%=name%>-service/repositories/interfaces';
import { Inject } from '@nestjs/common';
import { REPOSITORIES } from '@microservice-platform/<%=name%>-service/constants';
import { <%= h.changeCase.pascalCase(name) %>Transformer } from '@microservice-platform/<%=name%>-service/transformers';
import { getRelationsFromIncludes } from '@microservice-platform/shared/utils';

@QueryHandler(Gets<%= h.changeCase.pascalCase(name) %>Query)
export class Gets<%= h.changeCase.pascalCase(name) %>Handler implements IQueryHandler<Gets<%= h.changeCase.pascalCase(name) %>Query> {
  @Inject(REPOSITORIES.<%= h.changeCase.constantCase(name) %>_REPOSITORY)
  private repository: I<%= h.changeCase.pascalCase(name) %>Repository;

  @Inject(<%= h.changeCase.pascalCase(name) %>Transformer)
  private transformer: <%= h.changeCase.pascalCase(name) %>Transformer;

  async execute(query: Gets<%= h.changeCase.pascalCase(name) %>Query): Promise<Record<string, any>> {
    const { filter, include } = query;
    let models = await this.repository.list(filter);
    const relations = getRelationsFromIncludes(include);
    models = await this.repository.with(models, relations);
    return this.transformer.collection(models, { include });
  }
}
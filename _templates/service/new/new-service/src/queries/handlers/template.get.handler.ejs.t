---
to: apps/<%=name%>-service/src/queries/handlers/get-<%=name%>.handler.ts
---
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { I<%= h.changeCase.pascalCase(name) %>Repository } from '@microservice-platform/<%=name%>-service/repositories/interfaces';
import { Inject } from '@nestjs/common';
import { REPOSITORIES } from '@microservice-platform/<%=name%>-service/constants';
import { <%= h.changeCase.pascalCase(name) %>Transformer } from '@microservice-platform/<%=name%>-service/transformers';
import { Get<%= h.changeCase.pascalCase(name) %>Query } from '@microservice-platform/<%=name%>-service/queries/impl/get-<%=name%>.query';

@QueryHandler(Get<%= h.changeCase.pascalCase(name) %>Query)
export class Get<%= h.changeCase.pascalCase(name) %>Handler
  implements IQueryHandler<Get<%= h.changeCase.pascalCase(name) %>Query, Record<string, any>>
{
  @Inject(REPOSITORIES.<%= h.changeCase.constantCase(name) %>_REPOSITORY)
  private repository: I<%= h.changeCase.pascalCase(name) %>Repository;

  @Inject(<%= h.changeCase.pascalCase(name) %>Transformer)
  private transformer: <%= h.changeCase.pascalCase(name) %>Transformer;

  async execute(query: Get<%= h.changeCase.pascalCase(name) %>Query): Promise<Record<string, any>> {
    const { id, include } = query;
    let model = await this.repository.findById(id);
    model = await this.repository.with(model, include);
    return this.transformer.item(model, { include });
  }
}

---
to: apps/<%=name%>-service/src/transformers/<%=name%>.transformer.ts
---
import { <%= h.changeCase.pascalCase(name) %>Model } from '@microservice-platform/<%=name%>-service/models';
import { Transformer } from '@microservice-platform/shared/transformers';
import { Transformer$IncludeMethodOptions } from '@microservice-platform/shared/interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class <%= h.changeCase.pascalCase(name) %>Transformer extends Transformer< <%= h.changeCase.pascalCase(name) %>Model> {
  availableIncludes = [];
  defaultIncludes = [];

  constructor() {
    super();
  }

  async transform(
    model: <%= h.changeCase.pascalCase(name) %>Model
  ): Promise<Record<string, any> | null> {
    return {
      id: model.id,
    };
  }

  async include_detail(
    model:  <%= h.changeCase.pascalCase(name) %>Model,
    options: Transformer$IncludeMethodOptions
  ) {
    return {
      created_at: model.created_at,
    };
  }
}
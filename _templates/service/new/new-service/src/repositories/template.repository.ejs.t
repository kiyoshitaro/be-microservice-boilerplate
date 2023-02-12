---
to: apps/<%=name%>-service/src/repositories/<%=name%>.repository.ts
---
import { Injectable } from '@nestjs/common';
import { <%= h.changeCase.pascalCase(name) %>Model } from '../models';
import { I<%= h.changeCase.pascalCase(name) %>Repository } from './interfaces';
import { AnyQueryBuilder, OrderByDirection } from 'objection';
import { <%= h.changeCase.pascalCase(name) %>Filter } from '@microservice-platform/<%=name%>-service/filters';
import { InjectModel, Repository } from "@microservice-platform/shared/objection";

@Injectable()
export class <%= h.changeCase.pascalCase(name) %>Repository
  extends Repository< <%= h.changeCase.pascalCase(name) %>Model>
  implements I<%= h.changeCase.pascalCase(name) %>Repository
{
  @InjectModel(<%= h.changeCase.pascalCase(name) %>Model)
  model: <%= h.changeCase.pascalCase(name) %>Model;

  static get tableName() {
    return <%= h.changeCase.pascalCase(name) %>Model.tableName;
  }

  static queryFilter(
    query: AnyQueryBuilder,
    filter: <%= h.changeCase.pascalCase(name) %>Filter
  ): AnyQueryBuilder {
    if (filter?.ids) {
      query = query.whereIn(`${this.tableName}.id`, filter?.ids);
    }
    if (filter?.ids) {
      query = query.whereIn(`${this.tableName}.id`, filter?.ids);
    }
    return query;
  }

  async list(
    filter?: <%= h.changeCase.pascalCase(name) %>Filter,
    orderBy: string = 'id',
    sortBy: OrderByDirection = 'ASC'
  ): Promise< <%= h.changeCase.pascalCase(name) %>Model[] > {
    const query = <%= h.changeCase.pascalCase(name) %>Repository.queryFilter(this.query(), filter).orderBy(
      orderBy,
      sortBy
    );
    return query;
  }
}

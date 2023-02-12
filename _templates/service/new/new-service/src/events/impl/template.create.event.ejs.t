---
to: apps/<%=name%>-service/src/events/impl/create-<%=name%>.event.ts
---
import { IEvent } from '@nestjs/cqrs';
import { <%= h.changeCase.pascalCase(name) %>Model } from '@microservice-platform/<%=name%>-service/models';
import { IsInt, IsNotEmpty } from 'class-validator';

export class <%= h.changeCase.pascalCase(name) %>CreatedEvent implements IEvent {
  public readonly <%= h.changeCase.camelCase(name) %>: <%= h.changeCase.pascalCase(name) %>Model;

  @IsInt()
  @IsNotEmpty()
  public readonly id: string;

  constructor(<%= h.changeCase.camelCase(name) %>: <%= h.changeCase.pascalCase(name) %>Model, id: string) {
    this.<%= h.changeCase.camelCase(name) %> = <%= h.changeCase.camelCase(name) %>;
    this.id = id;
  }
}
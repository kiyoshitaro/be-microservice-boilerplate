---
to: apps/<%=name%>-service/src/events/handlers/create-<%=name%>.handler.ts
---
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { <%= h.changeCase.pascalCase(name) %>CreatedEvent } from '@microservice-platform/<%=name%>-service/events/impl';

@EventsHandler(<%= h.changeCase.pascalCase(name) %>CreatedEvent)
export class <%= h.changeCase.pascalCase(name) %>CreatedHandler
  implements IEventHandler< <%= h.changeCase.pascalCase(name) %>CreatedEvent >
{
  handle(event: <%= h.changeCase.pascalCase(name) %>CreatedEvent) {
    console.log('<%= h.changeCase.pascalCase(name) %>CreatedEvent...' + event.<%= h.changeCase.camelCase(name) %>.id);
  }
}
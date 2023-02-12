---
to: apps/<%=name%>-service/src/commands/handlers/create-<%=name%>.handler.ts
---
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Create<%= h.changeCase.pascalCase(name) %>Command } from '@microservice-platform/<%=name%>-service/commands/impl';
import { Inject } from '@nestjs/common';
import { REPOSITORIES } from '@microservice-platform/<%=name%>-service/constants';
import { I<%= h.changeCase.pascalCase(name) %>Repository } from '@microservice-platform/<%=name%>-service/repositories/interfaces';
import { <%= h.changeCase.pascalCase(name) %>Transformer } from '@microservice-platform/<%=name%>-service/transformers';
import { <%= h.changeCase.pascalCase(name) %>Model } from '@microservice-platform/<%=name%>-service/models';
import { <%= h.changeCase.pascalCase(name) %>CreatedEvent } from '@microservice-platform/<%=name%>-service/events/impl';
import { MEventPublisher } from '@microservice-platform/shared/m-event-publisher';

@CommandHandler(Create<%= h.changeCase.pascalCase(name) %>Command)
export class Create<%= h.changeCase.pascalCase(name) %>Handler
  implements ICommandHandler<Create<%= h.changeCase.pascalCase(name) %>Command, <%= h.changeCase.pascalCase(name) %>Model>
{
  @Inject(REPOSITORIES.<%= h.changeCase.constantCase(name) %>_REPOSITORY)
  private repository: I<%= h.changeCase.pascalCase(name) %>Repository;

  @Inject(<%= h.changeCase.pascalCase(name) %>Transformer)
  private transformer: <%= h.changeCase.pascalCase(name) %>Transformer;

  @Inject(EventBus)
  private eventBus: EventBus;

  @Inject(MEventPublisher)
  private mEventPublisher: MEventPublisher;

  async execute(command: Create<%= h.changeCase.pascalCase(name) %>Command): Promise<<%= h.changeCase.pascalCase(name) %>Model> {
    const { description, test_column } = command.data;
    const result = await this.repository.create({ description, test_column });
    this.eventBus.publish(
      new <%= h.changeCase.pascalCase(name) %>CreatedEvent(result, result.id.toString())
    );
    //Move this code to another service (this code use to demo)
    this.mEventPublisher.publish('<%= h.changeCase.pascalCase(name) %>CreatedEvent', {
      id: result.id,
      <%= h.changeCase.camelCase(name) %>: result,
    });
    return result;
  }
}
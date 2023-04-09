---
to: apps/<%=name%>-service/src/<%=name%>.module.ts
---
import { Module } from '@nestjs/common';
import { <%= h.changeCase.pascalCase(name) %>Controller } from '@microservice-platform/<%=name%>-service/controllers';
import { <%= h.changeCase.pascalCase(name) %>Service } from '@microservice-platform/<%=name%>-service/services';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { REPOSITORIES } from '@microservice-platform/<%=name%>-service/constants';
import { <%= h.changeCase.pascalCase(name) %>Repository } from '@microservice-platform/<%=name%>-service/repositories';
import * as Transformer from '@microservice-platform/<%=name%>-service/transformers';
import { ObjectionModule } from '@microservice-platform/shared/objection';
import * as Command from '@microservice-platform/<%=name%>-service/commands/handlers';
import * as Query from '@microservice-platform/<%=name%>-service/queries/handlers';
import * as EventHandler from '@microservice-platform/<%=name%>-service/events/handlers';
import { configDb } from '@microservice-platform/<%=name%>-service/configs/database';
import { CqrsModule } from '@nestjs/cqrs';
import { MicroserviceEventPublisherModule } from '@microservice-platform/shared/m-event-publisher';
import { configEventPublisher } from '@microservice-platform/<%=name%>-service/configs/event-publisher';


const transformers = [
  Transformer.<%= h.changeCase.pascalCase(name) %>Transformer
];

const repositories = [
  {
    provide: REPOSITORIES.<%= h.changeCase.constantCase(name) %>_REPOSITORY,
    useClass: <%= h.changeCase.pascalCase(name) %>Repository,
  },
];

const commands = [Command.Create<%= h.changeCase.pascalCase(name) %>Handler];

const queries = [Query.Gets<%= h.changeCase.pascalCase(name) %>Handler, Query.Get<%= h.changeCase.pascalCase(name) %>Handler];

const eventHandlers = [EventHandler.<%= h.changeCase.pascalCase(name) %>CreatedHandler];

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [configDb, configEventPublisher],
    }),
    ObjectionModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('db'),
      inject: [ConfigService],
    }),
    MicroserviceEventPublisherModule.forRootAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('event-publisher'),
      inject: [ConfigService],
    }),
  ],
  controllers: [<%= h.changeCase.pascalCase(name) %>Controller],
  providers: [
    <%= h.changeCase.pascalCase(name) %>Service,
    ...transformers,
    ...repositories,
    ...commands,
    ...queries,
    ...eventHandlers,
  ],
})
export class <%= h.changeCase.pascalCase(name) %>Module {}
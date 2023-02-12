---
to: apps/<%=name%>-service/src/main.ts
---
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { <%= h.changeCase.pascalCase(name) %>Module } from './<%=name%>.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ConfigAppService } from '@microservice-platform/shared/configs';
import { checkDatabaseConnection } from '@microservice-platform/<%=name%>-service/configs/database';

async function bootstrap() {
  await checkDatabaseConnection();
  const <%= h.changeCase.camelCase(name) %>Config = new ConfigAppService().get('<%= h.changeCase.camelCase(name) %>Service');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    <%= h.changeCase.pascalCase(name) %>Module,
    <%= h.changeCase.camelCase(name) %>Config
  );
  await app.listen();
  Logger.log(
    `🚀 <%= h.changeCase.pascalCase(name) %> service is running at port ${<%= h.changeCase.camelCase(name) %>Config.options.port}`
  );
}

bootstrap();

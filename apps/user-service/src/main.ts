import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { UserModule } from './user.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ConfigAppService } from '@microservice-platform/shared/configs';
import { checkDatabaseConnection } from '@microservice-platform/user-service/configs/database';

async function bootstrap() {
  await checkDatabaseConnection();
  const userConfig = new ConfigAppService().get('userService');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    userConfig
  );
  await app.listen();
  Logger.log(`🚀 User service is running at port ${userConfig.options.port}`);
}

bootstrap();

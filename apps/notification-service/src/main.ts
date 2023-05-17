import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { NotificationModule } from './notification.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ConfigAppService } from '@microservice-platform/shared/configs';
import { checkDatabaseConnection } from '@microservice-platform/notification-service/configs/database';

async function bootstrap() {
  await checkDatabaseConnection();
  const notificationConfig = new ConfigAppService().get('notificationService');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NotificationModule,
    notificationConfig
  );
  await app.listen();
  Logger.log(
    `🚀 Notification service is running at port ${notificationConfig.options.port}`
  );
}

bootstrap();

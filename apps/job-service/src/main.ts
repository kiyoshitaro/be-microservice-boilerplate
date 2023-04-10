import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { JobModule } from './job.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ConfigAppService } from '@microservice-platform/shared/configs';
import { checkDatabaseConnection } from '@microservice-platform/job-service/configs/database';

async function bootstrap() {
  await checkDatabaseConnection();
  const jobConfig = new ConfigAppService().get('jobService');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    JobModule,
    jobConfig
  );
  await app.listen();
  Logger.log(`🚀 Job service is running at port ${jobConfig.options.port}`);
}

bootstrap();

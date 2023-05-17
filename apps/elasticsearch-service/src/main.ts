import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { ElasticSearchModule } from './elasticsearch.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ConfigAppService } from '@microservice-platform/shared/configs';
import { checkDatabaseConnection } from '@microservice-platform/elasticsearch-service/configs/database';

async function bootstrap() {
  await checkDatabaseConnection();
  const elasticsearchConfig = new ConfigAppService().get(
    'elasticsearchService'
  );
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ElasticSearchModule,
    elasticsearchConfig
  );
  await app.listen();
  Logger.log(
    `🚀 Elasticsearch service is running at port ${elasticsearchConfig.options.port}`
  );
}

bootstrap();

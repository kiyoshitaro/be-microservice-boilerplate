import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { GameModule } from './game.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ConfigAppService } from '@microservice-platform/shared/configs';
import { checkDatabaseConnection } from '@microservice-platform/game-service/configs/database';
import { MicroserviceExceptionFilter } from '@microservice-platform/shared/exceptions';

async function bootstrap() {
  await checkDatabaseConnection();
  const gameConfig = new ConfigAppService().get('gameService');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    GameModule,
    gameConfig
  );

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // NOTE: catch exception from service out
  app.useGlobalFilters(new MicroserviceExceptionFilter());
  await app.listen();
  Logger.log(`🚀 Game service is running at port ${gameConfig.options.port}`);
}

bootstrap();

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { GameModule } from './game.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ConfigAppService } from '@microservice-platform/shared/configs';
import { checkDatabaseConnection } from '@microservice-platform/game-service/configs/database';

async function bootstrap() {
  await checkDatabaseConnection();
  const gameConfig = new ConfigAppService().get('gameService');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    GameModule,
    gameConfig
  );
  await app.listen();
  Logger.log(`🚀 Game service is running at port ${gameConfig.options.port}`);
}

bootstrap();

import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigAppService } from '@microservice-platform/shared/configs';
import { AppModule } from './game-user-gateway.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import morgan from 'morgan';
import helmet from 'helmet';

const DEFAULT_API_VERSION = '1';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const options = new DocumentBuilder()
    .setTitle('API docs')
    .addTag('templates')
    // .addTag('tasks')
    .setVersion(DEFAULT_API_VERSION)
    .build();
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableVersioning({
    defaultVersion: DEFAULT_API_VERSION,
    type: VersioningType.URI,
  });

  app.use(helmet());

  app.use(morgan('tiny'));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const port = new ConfigAppService().get('gameUserGatewayPort');
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}/v${DEFAULT_API_VERSION}`
  );
}
bootstrap();

import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { GameController } from '@microservice-platform/platform-gateway/controllers';
import { ConfigAppService } from '@microservice-platform/shared/configs';
import { ClientProxyAppFactory } from '@microservice-platform/shared/microservices';
import { HealthModule } from '@microservice-platform/platform-gateway/health/health.module';
import {
  MetricMiddleware,
  MetricModule,
} from '@microservice-platform/shared/metric';
import { LoggerModule } from '@microservice-platform/shared/loggers';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpLoggingInterceptor } from '@microservice-platform/shared/interceptors';

@Module({
  imports: [
    HealthModule,
    LoggerModule,
    MetricModule.register({ app_name: 'platform-gateway' }),
  ],
  controllers: [GameController],
  providers: [
    ConfigAppService,
    {
      provide: 'GAME_SERVICE',
      useFactory: (configService: ConfigAppService) => {
        const gameServiceOptions = configService.get('gameService');
        return ClientProxyAppFactory.create(gameServiceOptions);
      },
      inject: [ConfigAppService],
    },
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigAppService) => {
        const userServiceOptions = configService.get('userService');
        return ClientProxyAppFactory.create(userServiceOptions);
      },
      inject: [ConfigAppService],
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpLoggingInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MetricMiddleware)
      .exclude({ path: '/api/v1/health', method: RequestMethod.GET })
      .exclude({ path: '/api/v1/metrics', method: RequestMethod.GET })
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

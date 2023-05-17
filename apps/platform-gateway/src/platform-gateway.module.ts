import { Module } from '@nestjs/common';
import { GameController } from '@microservice-platform/platform-gateway/controllers';
import { ConfigAppService } from '@microservice-platform/shared/configs';
import { ClientProxyAppFactory } from '@microservice-platform/shared/microservices';
import { HealthModule } from '@microservice-platform/platform-gateway/health/health.module';

@Module({
  imports: [HealthModule],
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
  ],
})
export class AppModule { }

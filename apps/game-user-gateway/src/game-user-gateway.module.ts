import { Module } from '@nestjs/common';
import { GameUserController } from '@microservice-platform/game-user-gateway/controllers';
import { ConfigAppService } from '@microservice-platform/shared/configs';
import { ClientProxyAppFactory } from '@microservice-platform/shared/microservices';
import { HealthModule } from '@microservice-platform/game-user-gateway/health/health.module';

@Module({
  imports: [HealthModule],
  controllers: [GameUserController],
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
export class AppModule {}

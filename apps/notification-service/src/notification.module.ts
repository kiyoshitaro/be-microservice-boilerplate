import { CacheModule, Module } from '@nestjs/common';
import { NotificationController } from '@microservice-platform/notification-service/controllers';
import { NotificationService } from '@microservice-platform/notification-service/services';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { REPOSITORIES } from '@microservice-platform/notification-service/constants';
import { NotificationRepository } from '@microservice-platform/notification-service/repositories';
import * as Transformer from '@microservice-platform/notification-service/transformers';
import { ObjectionModule } from '@microservice-platform/shared/objection';
import * as Command from '@microservice-platform/notification-service/commands/handlers';
import * as Query from '@microservice-platform/notification-service/queries/handlers';
import { configDb } from '@microservice-platform/notification-service/configs/database';
import { CqrsModule } from '@nestjs/cqrs';
import { MicroserviceEventPublisherModule } from '@microservice-platform/shared/m-event-publisher';
import { configEventPublisher } from '@microservice-platform/notification-service/configs/event-publisher';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { configCache } from '@microservice-platform/notification-service/configs/cache';
import * as Notification from '@microservice-platform/notification-service/notifications/handlers';
import { LoggerModule } from '@microservice-platform/shared/loggers';

const transformers = [Transformer.NotificationTransformer];

const repositories = [
  {
    provide: REPOSITORIES.NOTIFICATION_REPOSITORY,
    useClass: NotificationRepository,
  },
];

const commands = [Command.CreateNotificationHandler];

const queries = [Query.GetsNotificationHandler, Query.GetNotificationHandler];

const notifications = [Notification.AddGameSuccessNotificationHandler];

@Module({
  imports: [
    CqrsModule,
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [configDb, configEventPublisher, configCache],
    }),
    ObjectionModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('db'),
      inject: [ConfigService],
    }),
    MicroserviceEventPublisherModule.forRootAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('event-publisher'),
      inject: [ConfigService],
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        const host = config.get<string>('cache.host');
        const port = config.get<number>('cache.port');
        const db = config.get<number>('cache.database');
        const ttl = config.get<number>('cache.ttl');

        return [
          {
            store: await redisStore.redisStore({
              url: `redis://${host}:${port}/${db}`,
              ttl,
            }),
          },
        ] as any;
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    ...transformers,
    ...repositories,
    ...commands,
    ...queries,
    ...notifications,
  ],
})
export class NotificationModule {}

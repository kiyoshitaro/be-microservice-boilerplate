import { CacheModule, Module } from '@nestjs/common';
import { GameController } from '@microservice-platform/elasticsearch-service/controllers';
import { GameService } from '@microservice-platform/elasticsearch-service/services';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { REPOSITORIES } from '@microservice-platform/elasticsearch-service/constants';
import { ElasticsearchRepository } from '@microservice-platform/elasticsearch-service/repositories';
import { ObjectionModule } from '@microservice-platform/shared/objection';
import { configDb } from '@microservice-platform/elasticsearch-service/configs/database';
import { CqrsModule } from '@nestjs/cqrs';
import { MicroserviceEventPublisherModule } from '@microservice-platform/shared/m-event-publisher';
import { configEventPublisher } from '@microservice-platform/elasticsearch-service/configs/event-publisher';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { configCache } from '@microservice-platform/elasticsearch-service/configs/cache';
import { configElasticsearch } from '@microservice-platform/elasticsearch-service/configs/elasticsearch';
import { ConfigAppService } from '@microservice-platform/shared/configs';
import { ClientProxyAppFactory } from '@microservice-platform/shared/microservices';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { LoggerModule } from '@microservice-platform/shared/loggers';

const transformers = [];

const repositories = [
  {
    provide: REPOSITORIES.ELASTICSEARCH_REPOSITORY,
    useClass: ElasticsearchRepository,
  },
];

const commands = [];

const queries = [];

const eventHandlers = [];

@Module({
  imports: [
    CqrsModule,
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [configDb, configEventPublisher, configCache, configElasticsearch],
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
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        configService.get('elasticsearch'),
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
  controllers: [GameController],
  providers: [
    ConfigAppService,
    GameService,
    ...transformers,
    ...repositories,
    ...commands,
    ...queries,
    ...eventHandlers,
    {
      provide: 'GAME_SERVICE',
      useFactory: (configService: ConfigAppService) => {
        const gameServiceOptions = configService.get('gameService');
        return ClientProxyAppFactory.create(gameServiceOptions);
      },
      inject: [ConfigAppService],
    },
  ],
})
export class ElasticSearchModule { }

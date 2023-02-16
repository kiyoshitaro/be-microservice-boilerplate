import { Module } from '@nestjs/common';
import { GameController } from '@microservice-platform/game-service/controllers';
import { GameService } from '@microservice-platform/game-service/services';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { REPOSITORIES } from '@microservice-platform/game-service/constants';
import {
  GameInfoRepository,
  GameRepository,
} from '@microservice-platform/game-service/repositories';
import * as Transformer from '@microservice-platform/game-service/transformers';
import { ObjectionModule } from '@microservice-platform/shared/objection';
import * as Command from '@microservice-platform/game-service/commands/handlers';
import * as Query from '@microservice-platform/game-service/queries/handlers';
import * as EventHandler from '@microservice-platform/game-service/events/handlers';
import * as Event from '@microservice-platform/game-service/events/impl';
import { configDb } from '@microservice-platform/game-service/configs/database';
import { CqrsModule } from '@nestjs/cqrs';
import { MicroserviceEventPublisherModule } from '@microservice-platform/shared/m-event-publisher';
import { configEventPublisher } from '@microservice-platform/game-service/configs/event-publisher';

const transformers = [
  Transformer.GameTransformer,
  Transformer.GameInfoTransformer,
];

const repositories = [
  {
    provide: REPOSITORIES.GAME_REPOSITORY,
    useClass: GameRepository,
  },
  {
    provide: REPOSITORIES.GAME_INFO_REPOSITORY,
    useClass: GameInfoRepository,
  },
];

const commands = [Command.CreateGameHandler];

const queries = [Query.GetGamesHandler, Query.GetGameHandler, Query.GetGamesPaginationHandler];

const eventHandlers = [EventHandler.GameCreatedHandler];

const events = [Event.GameCreatedEvent];

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [configDb, configEventPublisher],
    }),
    ObjectionModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('db'),
      inject: [ConfigService],
    }),
    MicroserviceEventPublisherModule.forRootAsync({
      events,
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('event-publisher'),
      inject: [ConfigService],
    }),
  ],
  controllers: [GameController],
  providers: [
    GameService,
    ...transformers,
    ...repositories,
    ...commands,
    ...queries,
    ...eventHandlers,
  ],
})
export class GameModule { }

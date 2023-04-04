import { Module } from '@nestjs/common';
import { UserController } from '@microservice-platform/user-service/controllers';
import { UserService } from '@microservice-platform/user-service/services';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { REPOSITORIES } from '@microservice-platform/user-service/constants';
import {
  UserGameRepository,
  UserRepository,
} from '@microservice-platform/user-service/repositories';
import * as Transformer from '@microservice-platform/user-service/transformers';
import { ObjectionModule } from '@microservice-platform/shared/objection';
import * as Command from '@microservice-platform/user-service/commands/handlers';
import * as Query from '@microservice-platform/user-service/queries/handlers';
import * as EventHandler from '@microservice-platform/user-service/events/handlers';
import * as Event from '@microservice-platform/user-service/events/impl';
import { configDb } from '@microservice-platform/user-service/configs/database';
import { CqrsModule } from '@nestjs/cqrs';
import { MicroserviceEventPublisherModule } from '@microservice-platform/shared/m-event-publisher';
import { configEventPublisher } from '@microservice-platform/user-service/configs/event-publisher';
import { GameSagas } from './sagas';

const transformers = [
  Transformer.UserTransformer,
  Transformer.UserGameTransformer,
];

const repositories = [
  {
    provide: REPOSITORIES.USER_REPOSITORY,
    useClass: UserRepository,
  },
  {
    provide: REPOSITORIES.USER_GAME_REPOSITORY,
    useClass: UserGameRepository,
  },
];

const commands = [Command.CreateUserHandler, Command.AddGameToUserHandler];

const queries = [
  Query.GetUsersHandler,
  Query.GetUserHandler,
  Query.GetUserGameHandler,
];

const eventHandlers = [EventHandler.UserCreatedHandler];

const sagas = [GameSagas];

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
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('event-publisher'),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    ...transformers,
    ...repositories,
    ...commands,
    ...queries,
    ...eventHandlers,
    ...sagas,
  ],
})
export class UserModule {}

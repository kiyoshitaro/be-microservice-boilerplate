import { Module } from '@nestjs/common';
import { JobController } from '@microservice-platform/job-service/controllers';
import { JobService } from '@microservice-platform/job-service/services';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ObjectionModule } from '@microservice-platform/shared/objection';
import { configDb } from '@microservice-platform/job-service/configs/database';
import { CqrsModule } from '@nestjs/cqrs';
import { MicroserviceEventPublisherModule } from '@microservice-platform/shared/m-event-publisher';
import { configEventPublisher } from '@microservice-platform/job-service/configs/event-publisher';
import { LoggerModule } from '@microservice-platform/shared/loggers';

const transformers = [];

const repositories = [];

const queries = [];

const commands = [];

const eventHandlers = [];

@Module({
  imports: [
    CqrsModule,
    LoggerModule,
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
  controllers: [JobController],
  providers: [
    JobService,
    ...transformers,
    ...repositories,
    ...commands,
    ...queries,
    ...eventHandlers,
  ],
})
export class JobModule { }

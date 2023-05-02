import { Inject } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

export class Service {
  @Inject(QueryBus)
  protected readonly queryBus: QueryBus;

  @Inject(CommandBus)
  protected readonly commandBus: CommandBus;
}
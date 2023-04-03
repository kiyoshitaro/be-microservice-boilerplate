import { IEvent } from '@nestjs/cqrs';
import { CreateGameDto } from '@microservice-platform/shared/dtos';

export class GameCreatedEvent implements IEvent {
  public readonly data: CreateGameDto;

  constructor(data: CreateGameDto) {
    this.data = data;
  }
}

import { CreateGameDto } from '@microservice-platform/shared/dtos';
import { IEvent } from '@nestjs/cqrs';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class AddGameToUserEvent implements IEvent {
  @Type(() => CreateGameDto)
  @ValidateNested()
  public readonly data: CreateGameDto;
  constructor(data: CreateGameDto) {
    this.data = data;
  }
}

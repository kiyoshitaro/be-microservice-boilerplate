import { INotification } from '@microservice-platform/shared/notification';
import { CreateGameDto } from '@microservice-platform/shared/dtos';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class AddGameSuccessNotification implements INotification {
  @Type(() => CreateGameDto)
  @ValidateNested()
  readonly data: CreateGameDto;

  constructor(data: CreateGameDto) {
    this.data = data;
  }
}

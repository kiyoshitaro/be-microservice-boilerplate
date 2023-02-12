import { IEvent } from '@nestjs/cqrs';
import { GameModel } from '@microservice-platform/game-service/models';
import { IsInt, IsNotEmpty } from 'class-validator';

export class GameCreatedEvent implements IEvent {
  public readonly game: GameModel;

  @IsInt()
  @IsNotEmpty()
  public readonly id: string;

  constructor(game: GameModel, id: string) {
    this.game = game;
    this.id = id;
  }
}

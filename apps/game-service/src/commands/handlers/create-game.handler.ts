import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateGameCommand } from '@microservice-platform/game-service/commands/impl';
import { Inject } from '@nestjs/common';
import { REPOSITORIES } from '@microservice-platform/game-service/constants';
import { IGameRepository } from '@microservice-platform/game-service/repositories/interfaces';
import { GameTransformer } from '@microservice-platform/game-service/transformers';
import { GameModel } from '@microservice-platform/game-service/models';
import { GameCreatedEvent } from '@microservice-platform/game-service/events/impl';
import { MEventPublisher } from '@microservice-platform/shared/m-event-publisher';

@CommandHandler(CreateGameCommand)
export class CreateGameHandler
  implements ICommandHandler<CreateGameCommand, GameModel>
{
  @Inject(REPOSITORIES.GAME_REPOSITORY)
  private repository: IGameRepository;

  @Inject(GameTransformer)
  private transformer: GameTransformer;

  @Inject(EventBus)
  private eventBus: EventBus;

  @Inject(MEventPublisher)
  private mEventPublisher: MEventPublisher;

  async execute(command: CreateGameCommand): Promise<GameModel> {
    const { description, test_column } = command.data;
    const result = await this.repository.create({ description, test_column });
    this.eventBus.publish(new GameCreatedEvent(result, result.id.toString()));
    //Move this code to another service (this code use to demo)
    this.mEventPublisher.publish('GameCreatedEvent', {
      id: result.id,
      game: result,
    });
    return result;
  }
}

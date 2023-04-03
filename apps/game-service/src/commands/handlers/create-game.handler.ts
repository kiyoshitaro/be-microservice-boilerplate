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

  async execute(command: CreateGameCommand): Promise<GameModel> {
    const { client_id, logo_url, name, cover_url } = command.data;
    const result = await this.repository.create({
      client_id,
      logo_url,
      name,
      cover_url,
    });
    this.eventBus.publish(new GameCreatedEvent(result));

    return result;
  }
}

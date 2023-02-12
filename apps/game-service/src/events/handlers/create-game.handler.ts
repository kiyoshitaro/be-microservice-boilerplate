import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { GameCreatedEvent } from '@microservice-platform/game-service/events/impl';

@EventsHandler(GameCreatedEvent)
export class GameCreatedHandler implements IEventHandler<GameCreatedEvent> {
  handle(event: GameCreatedEvent) {
    console.log('GameCreatedEvent...' + event.game.id);
  }
}

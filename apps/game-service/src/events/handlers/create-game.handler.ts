import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { GameCreatedEvent } from '@microservice-platform/game-service/events/impl';
import { Inject } from '@nestjs/common';
import { MEventPublisher } from '@microservice-platform/shared/m-event-publisher';

@EventsHandler(GameCreatedEvent)
export class GameCreatedHandler implements IEventHandler<GameCreatedEvent> {

  @Inject(MEventPublisher)
  private mEventPublisher: MEventPublisher;

  handle(event: GameCreatedEvent) {
    this.mEventPublisher.publish('AddGameToUserEvent', {
      data: event.data
    });
  }
}

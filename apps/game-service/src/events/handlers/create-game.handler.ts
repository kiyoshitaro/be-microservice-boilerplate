import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { GameCreatedEvent } from '@microservice-platform/game-service/events/impl';
import { Inject } from '@nestjs/common';
import { MEventPublisher, MNotificationPublisher } from '@microservice-platform/shared/m-event-publisher';

@EventsHandler(GameCreatedEvent)
export class GameCreatedHandler implements IEventHandler<GameCreatedEvent> {
  @Inject(MEventPublisher)
  private mEventPublisher: MEventPublisher;

  @Inject(MNotificationPublisher)
  private mNotificationPublisher: MNotificationPublisher;


  handle(event: GameCreatedEvent) {
    this.mEventPublisher.publish('AddGameToUserEvent', {
      data: event.data,
    });
    this.mNotificationPublisher.notify(
      'AddGameSuccessNotification',
      {
        data: event.data,
      }
    );
  }
}

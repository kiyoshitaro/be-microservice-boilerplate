import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from '@microservice-platform/user-service/events/impl';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  handle(event: UserCreatedEvent) {
    console.log('UserCreatedEvent...' + event.user.id);
  }
}

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddGameToUserCommand } from '@microservice-platform/user-service/commands/impl';
import { Inject } from '@nestjs/common';
import { REPOSITORIES } from '@microservice-platform/user-service/constants';
import { IUserRepository } from '@microservice-platform/user-service/repositories/interfaces';
import { UserModel } from '@microservice-platform/user-service/models';
// import { UserTransformer } from '@microservice-platform/user-service/transformers';
// import { UserCreatedEvent } from '@microservice-platform/user-service/events/impl';
// import { MEventPublisher } from '@microservice-platform/shared/m-event-publisher';

@CommandHandler(AddGameToUserCommand)
export class AddGameToUserHandler
  implements ICommandHandler<AddGameToUserCommand, UserModel>
{
  @Inject(REPOSITORIES.USER_REPOSITORY)
  private repository: IUserRepository;

  // @Inject(UserTransformer)
  // private transformer: UserTransformer;

  // @Inject(EventBus)
  // private eventBus: EventBus;

  // @Inject(MEventPublisher)
  // private mEventPublisher: MEventPublisher;

  async execute(command: AddGameToUserCommand): Promise<any> {
    // const { email, id } = command.data;
    console.log("🚀 ~ file: add-game-to-user.handler.ts:29 ~ execute ~ command.data:", command.data)
    // return await this.repository.create({ email, username: email, id });
  }
}

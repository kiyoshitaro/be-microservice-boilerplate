import { IEvent } from '@nestjs/cqrs';
import { UserModel } from '@microservice-platform/user-service/models';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UserCreatedEvent implements IEvent {
  public readonly user: UserModel;

  @IsInt()
  @IsNotEmpty()
  public readonly id: string;

  constructor(user: UserModel, id: string) {
    this.user = user;
    this.id = id;
  }
}

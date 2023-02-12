import { CreateUserDto } from '@microservice-platform/shared/dtos';

export class CreateUserCommand {
  constructor(public readonly data: CreateUserDto) { }
}

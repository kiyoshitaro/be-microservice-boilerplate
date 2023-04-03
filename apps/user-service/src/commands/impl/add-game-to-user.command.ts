import { CreateGameDto } from '@microservice-platform/shared/dtos';

export class AddGameToUserCommand {
  constructor(public readonly data: CreateGameDto) {}
}

import { CreateGameDto } from '@microservice-platform/shared/dtos';

export class CreateGameCommand {
  constructor(
    public readonly data: CreateGameDto & { game_service_category_id?: string }
  ) { }
}

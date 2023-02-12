import { Injectable } from '@nestjs/common';
import { GameFilter } from '@microservice-platform/game-service/filters';
import { Service } from '@microservice-platform/game-service/services/service';
import { GetsGameQuery } from '@microservice-platform/game-service/queries/impl';
import { CreateGameCommand } from '@microservice-platform/game-service/commands/impl';
import { GetGameQuery } from '@microservice-platform/game-service/queries/impl';
import { CreateGameDto } from '@microservice-platform/shared/dtos';

@Injectable()
export class GameService extends Service {
  async list(
    filters?: GameFilter,
    include = ''
  ): Promise<Record<string, any>[]> {
    return this.queryBus.execute(new GetsGameQuery(filters, include));
  }

  async create(
    data: CreateGameDto & { template_category_id?: string }
  ): Promise<Record<string, any>> {
    const template = await this.commandBus.execute(new CreateGameCommand(data));
    return this.queryBus.execute(new GetGameQuery(template.id, 'detail'));
  }
}

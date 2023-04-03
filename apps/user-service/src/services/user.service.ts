import { Injectable } from '@nestjs/common';
import {
  UserFilter,
  UserGameFilter,
} from '@microservice-platform/shared/filters/user-service';
import { Service } from '@microservice-platform/user-service/services/service';
import {
  GetUserGameQuery,
  GetUsersQuery,
} from '@microservice-platform/user-service/queries/impl';
import { CreateUserCommand } from '@microservice-platform/user-service/commands/impl';
import { GetUserQuery } from '@microservice-platform/user-service/queries/impl';
import { CreateUserDto } from '@microservice-platform/shared/dtos';

@Injectable()
export class UserService extends Service {
  async list(
    filters?: UserFilter,
    include = ''
  ): Promise<Record<string, any>[]> {
    return this.queryBus.execute(new GetUsersQuery(filters, include));
  }

  async create(data: CreateUserDto): Promise<Record<string, any>> {
    const template = await this.commandBus.execute(new CreateUserCommand(data));
    return this.queryBus.execute(new GetUserQuery(template.id, ''));
  }

  async getUserGames(
    filters: UserGameFilter,
    include: string
  ): Promise<Record<string, any>> {
    return this.queryBus.execute(new GetUserGameQuery(filters, include));
  }
}

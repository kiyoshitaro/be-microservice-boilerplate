import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IUserRepository } from '@microservice-platform/user-service/repositories/interfaces';
import { Inject } from '@nestjs/common';
import { REPOSITORIES } from '@microservice-platform/user-service/constants';
import { UserTransformer } from '@microservice-platform/user-service/transformers';
import { getRelationsFromIncludes } from '@microservice-platform/shared/utils';
import { GetUserQuery } from '@microservice-platform/user-service/queries/impl/get-user.query';

@QueryHandler(GetUserQuery)
export class GetUserHandler
  implements IQueryHandler<GetUserQuery, Record<string, any>>
{
  @Inject(REPOSITORIES.USER_REPOSITORY)
  private repository: IUserRepository;

  @Inject(UserTransformer)
  private transformer: UserTransformer;

  async execute(query: GetUserQuery): Promise<Record<string, any>> {
    const { id, include } = query;
    let model = await this.repository.findById(id);
    const relations = getRelationsFromIncludes(include, 'detail');
    model = await this.repository.with(model, relations);
    return this.transformer.item(model, { include });
  }
}

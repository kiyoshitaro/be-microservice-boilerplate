import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from '@microservice-platform/user-service/queries/impl';
import { IUserRepository } from '@microservice-platform/user-service/repositories/interfaces';
import { Inject } from '@nestjs/common';
import { REPOSITORIES } from '@microservice-platform/user-service/constants';
import { UserTransformer } from '@microservice-platform/user-service/transformers';
import { getRelationsFromIncludes } from '@microservice-platform/shared/utils';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  @Inject(REPOSITORIES.USER_REPOSITORY)
  private repository: IUserRepository;

  @Inject(UserTransformer)
  private transformer: UserTransformer;

  async execute(query: GetUsersQuery): Promise<Record<string, any>> {
    const { filter, include } = query;
    let models = await this.repository.list(filter);
    const relations = getRelationsFromIncludes(include);
    models = await this.repository.with(models, relations);
    return this.transformer.collection(models, { include });
  }
}

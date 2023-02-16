import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserGameQuery } from '@microservice-platform/user-service/queries/impl';
import { IUserGameRepository } from '@microservice-platform/user-service/repositories/interfaces';
import { Inject } from '@nestjs/common';
import { REPOSITORIES } from '@microservice-platform/user-service/constants';
import { UserGameTransformer } from '@microservice-platform/user-service/transformers';

@QueryHandler(GetUserGameQuery)
export class GetUserGameHandler
  implements IQueryHandler<GetUserGameQuery>
{
  @Inject(REPOSITORIES.USER_GAME_REPOSITORY)
  private repository: IUserGameRepository;

  @Inject(UserGameTransformer)
  private transformer: UserGameTransformer;

  async execute(query: GetUserGameQuery): Promise<Record<string, any>> {
    const { filter, include } = query;
    if (filter.is_pagination) {
      delete filter.is_pagination;
      let modelsPagination = await this.repository.listPaginate(filter);
      const models = await this.repository.with(
        modelsPagination.items,
        include
      );
      return {
        items: await this.transformer.collection(models, { include }),
        pagination: modelsPagination.pagination,
      };
    } else {
      let modelsList = await this.repository.list(filter);
      modelsList = await this.repository.with(modelsList, include);
      return this.transformer.collection(modelsList, { include });
    }
  }
}

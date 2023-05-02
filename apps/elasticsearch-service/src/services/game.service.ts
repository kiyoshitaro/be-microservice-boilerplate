import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Service } from '@microservice-platform/elasticsearch-service/services/service';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ELASTICSEARCH_INDEX } from '@microservice-platform/elasticsearch-service/constants';
import {
  CreateGameIndexByIdDto,
  GameDataIndex,
} from '@microservice-platform/shared/dtos';
import { ClientAppProxy } from '@microservice-platform/shared/microservices';
import { GameElasticSearchFilter } from '@microservice-platform/shared/filters/game-service';

@Injectable()
export class GameService extends Service implements OnApplicationBootstrap {
  constructor(
    private readonly elasticsearchService: ElasticsearchService,

    @Inject('GAME_SERVICE')
    private readonly gameService: ClientAppProxy
  ) {
    super();
  }

  private buildQueryFilter = (filters: GameElasticSearchFilter) => {
    let query = {};
    if (filters.search_text) {
      query['multi_match'] = {
        query: filters.search_text,
        fields: ['name'],
        fuzziness: 'AUTO',
      };
    }
    return query;
  };

  // create game index
  async createGameIndex(gameId: string) {
    const indexName = `${ELASTICSEARCH_INDEX.GAME_BY_ID}${gameId}`;
    const exists = await this.elasticsearchService.indices.exists({
      index: indexName,
    });
    if (!exists) {
      await this.elasticsearchService.indices.create({
        index: indexName,
        body: {
          mappings: {
            properties: {
              id: { type: 'text' },
              name: { type: 'text' },
              logo_url: { type: 'text' },
              cover_url: { type: 'text' },
              expired_at: { type: 'date' },
              // trait_ids: {
              //   type: 'text',
              //   fields: {
              //     keyword: {
              //       type: 'keyword',
              //     },
              //   },
              // },
            },
          },
        },
      });
    }
  }

  async onApplicationBootstrap() {
    // create game index
    const gameData = await this.gameService.sendAwait('get_paging_game', {
      include: '',
      isPagination: false,
      ttl: 10,
    });
    if (gameData.data && gameData.data.length) {
      const indexes = gameData.data.map((item) =>
        this.createGameIndex(item.id)
      );
      await Promise.all(indexes);
    }
  }

  async searchGame(
    id: string,
    filter: GameElasticSearchFilter
  ): Promise<GameDataIndex[]> {
    const { hits } = await this.elasticsearchService.search<GameDataIndex>({
      index: ELASTICSEARCH_INDEX.GAME_BY_ID + id,
      query: this.buildQueryFilter(filter),
    });
    return hits.hits.map((item) => item._source);
  }

  async createIndexGame(id: string, data: CreateGameIndexByIdDto) {
    return await this.elasticsearchService.index<GameDataIndex>({
      index: ELASTICSEARCH_INDEX.GAME_BY_ID + id,
      id: data.id,
      document: data,
    });
  }
}

import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Inject, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { ClientAppProxy } from '@microservice-platform/shared/microservices';
import { GameValidationPipe } from '../validators';
import { GetGamesQueryDto } from '../dtos';

@ApiTags('game-gateway')
@Controller('games')
export class GameController {
  constructor(
    @Inject('GAME_SERVICE')
    private readonly gameService: ClientAppProxy,
  ) { }
  @Get('/')
  public async getPagingGames(@Query(GameValidationPipe) query: GetGamesQueryDto): Promise<any> {
    const res = await this.gameService.sendAwait('get_paging_game', {
      filters: {
        search_text: query.search_text,
        limit: query.limit,
        page: query.page,
        order_by: query.order_by,
        sort_by: query.sort_by
      },
      include: '',
      isPagination: true,
    });
    return res;
  }

  @Get(':id')
  public async getGameDetail(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Promise<any> {
    const res = await this.gameService.sendAwait('get_game_by_id', { id, include: "game_info" });
    return res
  }
}

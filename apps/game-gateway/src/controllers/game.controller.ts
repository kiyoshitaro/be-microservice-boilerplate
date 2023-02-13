import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ClientAppProxy } from '@microservice-platform/shared/microservices';
import { GameValidationPipe } from '../validators';
import { GetGamesQueryDto } from '../dtos';
import {
  GetByIdDto,
} from '@microservice-platform/shared/dtos';

@ApiTags('game-gateway')
@Controller('game')
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
    return res.data;
  }

  @Get(':id')
  // public async getGameDetail(@Param('id') id: string): Promise<any> {
  public async getGameDetail(@Param() data: GetByIdDto): Promise<any> {
    const res = await this.gameService.sendAwait('get_detail', data);
    return res.data
  }
}

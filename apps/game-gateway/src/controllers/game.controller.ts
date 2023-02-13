import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ClientAppProxy } from '@microservice-platform/shared/microservices';
import {
  GetGameDetailDto,
  GetGamesDto,
} from '@microservice-platform/shared/dtos';
import { GameValidationPipe } from '../validators';

@ApiTags('game-gateway')
@Controller('game')
export class GameController {
  constructor(
    @Inject('GAME_SERVICE')
    private readonly gameService: ClientAppProxy,
  ) { }
  @Get('/')
  public async getPagingGames(@Query(GameValidationPipe) data: GetGamesDto): Promise<any> {
    const res = await this.gameService.sendAwait('get_paging_game', data);
    return res.data;
  }

  @Get(':id')
  // public async getGameDetail(@Param('id') id: string): Promise<any> {
  public async getGameDetail(@Param() data: GetGameDetailDto): Promise<any> {
    const res = await this.gameService.sendAwait('get_detail', data);
    return res.data
  }
}

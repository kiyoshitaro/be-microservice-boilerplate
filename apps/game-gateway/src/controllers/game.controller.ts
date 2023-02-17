import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Inject, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { ClientAppProxy } from '@microservice-platform/shared/microservices';
import { GameValidationPipe } from '../validators';
import { GetGamesQueryDto, GetUserGamesQueryDto } from '../dtos';
import { convertQueryDtoToFilter } from '@microservice-platform/shared/utils';

@ApiTags('game-gateway')
@Controller('games')
export class GameController {
  constructor(
    @Inject('GAME_SERVICE')
    private readonly gameService: ClientAppProxy,

    @Inject('USER_SERVICE')
    private readonly userService: ClientAppProxy,

  ) { }
  @Get('/')
  public async getPagingGames(@Query(GameValidationPipe) query: GetGamesQueryDto): Promise<any> {
    const res = await this.gameService.sendAwait('get_paging_game', {
      filters: {
        ...query,
        is_pagination: Boolean(query.limit && query.page),
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

  // @Get('user-games')
  @Get(':id/user-games')
  public async getUserGame(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Query() query: GetUserGamesQueryDto
  ): Promise<any> {
    query = convertQueryDtoToFilter(query, null, {}, { 'userFilter': ['name', "email", "username"] });

    return await this.userService.sendAwait('get_user_games', {
      filters: {
        ...query,
        is_pagination: Boolean(query.limit && query.page),
        // user_ids: [id],
      },
      include: 'user',
    });
  }

}

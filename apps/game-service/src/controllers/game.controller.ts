import { GameService } from '@microservice-platform/game-service/services';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GameFilter } from '@microservice-platform/game-service/filters';
import { Controller, HttpStatus } from '@nestjs/common';
import {
  CreateGameDto,
  GetGameDetailDto,
  GetGamesDto,
  ServiceResponseDto,
} from '@microservice-platform/shared/dtos';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) { }

  @MessagePattern('get_paging_game')
  async getData(
    @Payload() filters?: GetGamesDto
  ): Promise<ServiceResponseDto> {
    const result = await this.gameService.getPagingGames({
      searchText: filters.search_text,
      limit: filters.limit,
      offset: filters.offset,
      orderBy: 'created_at',
      sortBy: "DESC"
    });
    return {
      statusCode: HttpStatus.OK,
      data: result,
    };
  }

  @MessagePattern('get_detail')
  async getGameDetail(@Payload() data: GetGameDetailDto): Promise<ServiceResponseDto> {
    const res = await this.gameService.findById(data.id, "game_info");
    return {
      statusCode: HttpStatus.OK,
      data: res
    }
  }

  @MessagePattern('create_game')
  async createTemplate(
    @Payload() data: CreateGameDto
  ): Promise<ServiceResponseDto> {
    const result = await this.gameService.create(data);
    return {
      statusCode: HttpStatus.OK,
      data: result,
    };
  }
}

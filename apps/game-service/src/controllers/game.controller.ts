import { GameService } from '@microservice-platform/game-service/services';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller, HttpStatus } from '@nestjs/common';
import {
  CreateGameDto,
  GetByIdDto,
  ServiceResponseDto,
} from '@microservice-platform/shared/dtos';
import { GetGamesDto } from '../dtos';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @MessagePattern('get_paging_game')
  async getData(@Payload() data?: GetGamesDto): Promise<ServiceResponseDto> {
    const { filters, include } = data;
    const result = await this.gameService.getPagingGames(filters, include);
    return {
      statusCode: HttpStatus.OK,
      data: result,
    };
  }

  @MessagePattern('get_game_by_id')
  async getGameDetail(
    @Payload() data: GetByIdDto
  ): Promise<ServiceResponseDto> {
    const { id, include } = data;
    const res = await this.gameService.findById(id, include);
    return {
      statusCode: HttpStatus.OK,
      data: res,
    };
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

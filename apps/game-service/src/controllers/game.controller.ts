import { GameService } from '@microservice-platform/game-service/services';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GameFilter } from '@microservice-platform/game-service/filters';
import { Controller, HttpStatus } from '@nestjs/common';
import {
  CreateGameDto,
  ServiceResponseDto,
} from '@microservice-platform/shared/dtos';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) { }

  @MessagePattern('get_all')
  async getData(filters?: GameFilter): Promise<ServiceResponseDto> {
    const result = await this.gameService.list(filters);
    return {
      statusCode: HttpStatus.OK,
      data: result,
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

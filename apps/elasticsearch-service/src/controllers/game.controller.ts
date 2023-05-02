import { GameService } from '@microservice-platform/elasticsearch-service/services';
import { Controller } from '@nestjs/common';

@Controller('elasticsearch')
export class GameController {
  constructor(private readonly gameService: GameService) {}
}

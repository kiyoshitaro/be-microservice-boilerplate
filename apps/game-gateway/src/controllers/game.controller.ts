import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

@ApiTags('game-gateway')
@Controller('game')
export class GameController {
  @Get('')
  public async pingGame(): Promise<any> {
    return {
      data: 'Hello World, Game Gateway',
    };
  }
}

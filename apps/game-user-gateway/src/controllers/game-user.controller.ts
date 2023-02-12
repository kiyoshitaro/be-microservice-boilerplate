import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

@ApiTags('game-user-gateway')
@Controller('game-user')
export class GameUserController {
  @Get('')
  public async pingGameUser(): Promise<any> {
    return {
      data: 'Hello World, GameUser Gateway',
    };
  }
}

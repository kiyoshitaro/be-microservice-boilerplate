import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

@ApiTags('platform-gateway')
@Controller('platform')
export class PlatformController {
  @Get('')
  public async pingPlatform(): Promise<any> {
    return {
      data: 'Hello World, Platform Gateway',
    };
  }
}

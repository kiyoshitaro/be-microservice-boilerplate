import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';
import { ConfigAppService } from '@microservice-platform/shared/configs';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private microservice: MicroserviceHealthIndicator,
    private configService: ConfigAppService
  ) { }
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      async () =>
        this.microservice.pingCheck(
          'game_service',
          this.configService.get('gameService')
        ),
      async () =>
        this.microservice.pingCheck(
          'user_service',
          this.configService.get('userService')
        ),
    ]);
  }
}

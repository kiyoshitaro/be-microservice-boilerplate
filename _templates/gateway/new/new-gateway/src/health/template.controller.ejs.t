---
to: apps/<%=name%>-gateway/src/health/health.controller.ts
---
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
  ) {}
  @Get()
  @HealthCheck()
  check(){
    return this.health.check([])
  }
}
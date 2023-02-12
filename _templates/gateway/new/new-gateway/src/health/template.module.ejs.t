---
to: apps/<%=name%>-gateway/src/health/health.module.ts
---
import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigAppService } from '@microservice-platform/shared/configs';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [ConfigAppService],
})
export class HealthModule {}
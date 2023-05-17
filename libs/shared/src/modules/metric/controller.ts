import { Controller, Get, Inject, Res } from '@nestjs/common';
import { Response } from 'express';
import { MetricService } from './service';

@Controller('metrics')
export class MetricController {
  @Inject()
  public metricService: MetricService;

  @Get()
  async index(@Res({ passthrough: true }) response: Response): Promise<string> {
    response.header(
      'Content-Type',
      this.metricService.metricConfig.register.contentType
    );
    return this.metricService.metricConfig.register.metrics();
  }
}

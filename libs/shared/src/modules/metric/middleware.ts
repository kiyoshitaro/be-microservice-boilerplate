import url from 'url';
import { MetricService } from './service';
import { Injectable, Inject, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class MetricMiddleware implements NestMiddleware {
  @Inject()
  public metricService: MetricService;

  use(req: Request, res: Response, next: NextFunction) {
    const stopRequestDurationHistogram =
      this.metricService.requestDurationHistogram.startTimer();

    res.once('finish', () => {
      const url_rule: string = url.parse(req.url).pathname;
      stopRequestDurationHistogram({
        url_rule,
        method: req.method,
        status: res.statusCode,
      }),
        this.metricService.requestCounter.inc({
          url_rule,
          method: req.method,
          status: res.statusCode,
        });
    });

    return next();
  }
}

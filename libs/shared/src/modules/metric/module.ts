import { Module, DynamicModule } from '@nestjs/common';
import { MetricController } from './controller';
import { MetricService, MetricConfig } from './service';
import { MetricMiddleware } from './middleware';

@Module({})
export class MetricModule {
  static register(defaultLabels: object): DynamicModule {
    return {
      module: MetricModule,
      providers: [
        {
          provide: MetricConfig,
          useFactory: () => new MetricConfig(defaultLabels),
        },
        MetricService,
        MetricController,
        MetricMiddleware,
      ],
      controllers: [MetricController],
      exports: [MetricMiddleware, MetricService],
    };
  }
}

---
to: apps/<%=name%>-gateway/src/<%=name%>-gateway.module.ts
---
import { 
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { <%= h.changeCase.pascalCase(name) %>Controller } from '@microservice-platform/<%=name%>-gateway/controllers';
import { ConfigAppService } from '@microservice-platform/shared/configs';
import { ClientProxyAppFactory } from '@microservice-platform/shared/microservices';
import {HealthModule} from "@microservice-platform/<%=name%>-gateway/health/health.module"
import { LoggerModule } from '@microservice-platform/shared/loggers';
import {
  MetricMiddleware,
  MetricModule,
} from '@microservice-platform/shared/metric';
import { HttpLoggingInterceptor } from '@microservice-platform/shared/interceptors';

@Module({
    imports: [
        HealthModule,
        LoggerModule,
        MetricModule.register({ app_name: '<%=name%>-gateway' }),
    ],
    controllers: [<%= h.changeCase.pascalCase(name) %>Controller],
    providers : [
        ConfigAppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: HttpLoggingInterceptor,
        },
    ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MetricMiddleware)
      .exclude({ path: '/api/v1/health', method: RequestMethod.GET })
      .exclude({ path: '/api/v1/metrics', method: RequestMethod.GET })
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
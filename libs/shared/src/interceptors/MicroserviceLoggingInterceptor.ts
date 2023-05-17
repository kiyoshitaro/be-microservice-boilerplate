import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from '@microservice-platform/shared/loggers';

@Injectable()
export class MicroserviceLoggingInterceptor implements NestInterceptor {
  @Inject(LoggerService)
  private loggerService: LoggerService;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const pattern = context.getArgs()[1].args[1];
    const params = context.getArgByIndex(0);
    const now = Date.now();

    // this.loggerService.log(`Processing pattern ${pattern}`, params);
    const serviceName =
      process.env.APP_NAME || process.env.DB_DATABASE || 'service_name';

    return next.handle().pipe(
      tap(() =>
        this.loggerService.log(`${serviceName} ${pattern}`, {
          pattern,
          data: params,
          duration: Date.now() - now,
        })
      )
    );
  }
}

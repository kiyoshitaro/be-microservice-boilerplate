import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
  Scope,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoggerService } from '@microservice-platform/shared/loggers';

@Injectable({ scope: Scope.REQUEST })
export class HttpLoggingInterceptor implements NestInterceptor {
  @Inject(LoggerService)
  private loggerService: LoggerService;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const now = Date.now();
    const method = request.method;
    const url = request.url;
    const data: any = {};
    if (!url.includes('health') && !url.includes('metrics')) {
      if (request.query && Object.keys(request.query).length) {
        data['query'] = request.query;
      }
      if (request.body && Object.keys(request.body).length) {
        data['body'] = request.body;
      }
      if (request.params && Object.keys(request.params).length) {
        data['params'] = request.params;
      }

      return next.handle().pipe(
        tap(() => {
          if (response.statusCode >= 200 && response.statusCode < 400) {
            this.loggerService.log(`${method} ${url}`, {
              statusCode: response.statusCode,
              data,
              duration: Date.now() - now,
              method,
            });
          } else {
            this.loggerService.error(`${method} ${url}`, {
              statusCode: response.statusCode,
              data,
              duration: Date.now() - now,
              method,
            });
          }
        }),
        catchError(
          (error: any) => {
            this.loggerService.error(`${method} ${url}`, {
              statusCode: error.status || response.statusCode || 500,
              data,
              duration: Date.now() - now,
              method,
            });
            throw error;
          }
          // handle the error here and generate an error response
        )
      );
    }
  }
}

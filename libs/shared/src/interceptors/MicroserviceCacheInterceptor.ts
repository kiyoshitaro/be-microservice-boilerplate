import {
  CACHE_TTL_METADATA,
  CacheInterceptor,
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  StreamableFile,
} from '@nestjs/common';
import * as process from 'process';
import SHA256 from 'crypto-js/sha256';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isFunction, isNil } from '@nestjs/common/utils/shared.utils';
import { LoggerService } from '@microservice-platform/shared/loggers';

@Injectable()
export class MicroserviceCacheInterceptor extends CacheInterceptor {
  @Inject(LoggerService)
  protected readonly loggerService: LoggerService;

  private cacheManagerIsv5OrGreater: boolean;

  async intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<any>> {
    const key = this.trackBy(context);
    const ttlValueOrFactory =
      this.reflector.get(CACHE_TTL_METADATA, context.getHandler()) ?? null;

    if (!key) {
      return next.handle();
    }
    try {
      const value = await this.cacheManager.get(key);
      if (!isNil(value)) {
        const pattern = context.getArgs()[1].args[1];
        const params = context.getArgByIndex(0);

        const serviceName =
          process.env.APP_NAME || process.env.DB_DATABASE || 'service_name';

        this.loggerService.log(`${serviceName} ${pattern}`, {
          pattern,
          data: params,
          status: 'cached',
          cache_key: key,
        });

        return of(value);
      }
      const ttl = isFunction(ttlValueOrFactory)
        ? await ttlValueOrFactory(context)
        : ttlValueOrFactory;

      return next.handle().pipe(
        tap(async (response) => {
          if (response instanceof StreamableFile) {
            return;
          }

          const args = [key, response];
          if (!isNil(ttl)) {
            args.push(this.cacheManagerIsv5OrGreater ? ttl : { ttl });
          }

          try {
            await this.cacheManager.set(...args);
          } catch (err) {
            Logger.error(
              `An error has occurred when inserting "key: ${key}", "value: ${response}"`,
              'CacheInterceptor'
            );
          }
        })
      );
    } catch {
      return next.handle();
    }
  }

  trackBy(context: ExecutionContext): string | undefined {
    const serviceName =
      process.env.APP_NAME || process.env.DB_DATABASE || 'service_name';
    const handlerName = context.getHandler().name;
    const params = context.getArgByIndex(0);
    const hash = SHA256(JSON.stringify(params)).toString();
    return `${serviceName}_${handlerName}_${hash}`;
  }
}

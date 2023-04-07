import { CacheInterceptor, ExecutionContext, Injectable } from '@nestjs/common';
import * as process from 'process';
import SHA256 from 'crypto-js/sha256';

@Injectable()
export class MicroserviceCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const serviceName =
      process.env.APP_NAME || process.env.DB_DATABASE || 'service_name';
    const handlerName = context.getHandler().name;
    const params = context.getArgByIndex(0);
    const hash = SHA256(JSON.stringify(params)).toString();
    return `${serviceName}_${handlerName}_${hash}`;
  }
}

import { ExecutionContext } from '@nestjs/common';

export const MicroserviceCacheFactory = (
  ctx: ExecutionContext
): Promise<number> | number => {
  const params = ctx.getArgByIndex(0);
  if (Number(params?.ttl) > 0) {
    return Number(params?.ttl);
  }
  const strParams = JSON.stringify(params);
  if (strParams.includes('user')) {
    return 3;
  }
  return null;
};

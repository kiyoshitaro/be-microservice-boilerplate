import { firstValueFrom, Observable } from 'rxjs';

export const testService = async (promise: Observable<any>) => {
  try {
    return await firstValueFrom(promise);
  } catch (e) {
    if (e?.statusCode) {
      return e;
    }
    throw e;
  }
};

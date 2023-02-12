import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Observable, throwError } from 'rxjs';

@Catch()
export class MicroserviceExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost): Observable<any> {
    if (exception.response) {
      return throwError(() => exception.response);
    }

    let message =
      exception.message || 'Something went wrong. Please try again later';
    console.log(exception.response);
    const status = exception.status ? exception.status : 500;
    message = exception.status ? message : 'Internal Server Error';

    return throwError(() => ({
      statusCode: status,
      message: message,
    }));
  }
}

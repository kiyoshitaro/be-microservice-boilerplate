import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Observable, throwError } from 'rxjs';

@Catch()
export class MicroserviceExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost): Observable<any> {
    if (exception.response) {
      console.error(exception.response);
      return throwError(() => exception.response);
    }

    let message;
    // NOTE: catch blockchain error
    if (
      exception instanceof String ||
      (exception instanceof Object && Object.keys(exception).length === 0)
    ) {
      message = String(exception);
    } else if (exception.logs) {
      message = exception.logs.join('\n');
    } else if (exception.message) {
      // NOTE: catch server error
      message = exception.status ? exception.message : 'Internal Server Error';
    } else {
      message = 'Something went wrong. Please try again later';
    }
    console.error(exception);
    const status = exception.status ? exception.status : 500;

    return throwError(() => ({
      statusCode: status,
      message: message,
    }));
  }
}

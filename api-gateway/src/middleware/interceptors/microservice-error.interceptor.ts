import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MicroserviceErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        console.log('here', err);

        const status = err.status || err.code;
        const response = err.response || err.message;
        response.message =
          typeof response.message === 'object'
            ? response.message[0]
            : response.message;

        return throwError(new HttpException(response, status));
      }),
    );
  }
}

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

        if (err.message && err.code) {
          return throwError(new HttpException(err.message, err.code));
        }

        const message =
          typeof err.response.message === 'object'
            ? err.response.message[0]
            : err.response.message;

        return throwError(new HttpException(message, err.status));
      }),
    );
  }
}

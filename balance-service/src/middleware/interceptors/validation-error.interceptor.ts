import { RpcException } from '@nestjs/microservices';
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
export class ValidationErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        console.log('here', err);

        if (!err.response) {
          return throwError(err);
        }

        const message =
          typeof err.response.message === 'object'
            ? err.response.message[0]
            : err.response.message;

        return throwError(new RpcException({ message, code: err.status }));
      }),
    );
  }
}

import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UnauthorizedException } from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { UnauthorizedError } from '../errors/UnauthorizedError';

@Injectable()
export class UnauthorizedInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError((error): any => {
          if (error instanceof UnauthorizedError) {
            throw new UnauthorizedException(error.message)
          }
          throw error
        })
      );
  }
}

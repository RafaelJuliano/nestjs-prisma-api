import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { NotFoundError } from '../errors/NotFoundError';

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError((error): any => {
          if (error instanceof NotFoundError) {
            throw new NotFoundException(error.message)
          }
          throw error
        })
      );
  }
}

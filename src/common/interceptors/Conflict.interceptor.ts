import { Injectable, NestInterceptor, ExecutionContext, CallHandler, ConflictException } from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { ConflictError } from '../errors/ConflictError';

@Injectable()
export class ConflictInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError((error): any => {
          if (error instanceof ConflictError) {
            throw new ConflictException(error.message)
          }
          throw error
        })
      );
  }
}

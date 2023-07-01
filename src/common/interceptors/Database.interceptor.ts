import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { isPrismaError } from '../utils/isPrismaError';
import { handleDatabaseErrors } from '../utils/handleDatabaseErrors';
import { DatabaseError } from '../errors/DatabaseError';

@Injectable()
export class DatabaseInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError((error): any => {
          if (isPrismaError(error)) {
            error = handleDatabaseErrors(error)
          }
          if (error instanceof DatabaseError) {
            throw new BadRequestException(error.message)
          } else {
            throw error
          }
        })
      );
  }
}

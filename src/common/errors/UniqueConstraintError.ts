import { ConflictError } from './ConflictError';
import { PrismaClientError } from './PrismaClientError';

export class UniqueConstraintError extends ConflictError {
  constructor(error: PrismaClientError) {
    const uniqueFiled = error.meta.target

    super(`A record with this ${uniqueFiled} already exists`)
  }
}

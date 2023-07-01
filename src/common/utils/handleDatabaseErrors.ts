import { DatabaseError } from '../errors/DatabaseError';
import { PrismaClientError } from '../errors/PrismaClientError';
import { UniqueConstraintError } from '../errors/UniqueConstraintError';

enum PrismaErrors {
  uniqueConstraintFail = 'P2002'
}

export const handleDatabaseErrors = (error: PrismaClientError): Error => {
  switch (error.code) {
    case PrismaErrors.uniqueConstraintFail:
      return new UniqueConstraintError(error)
    default:
      return new DatabaseError(error.message);
  }
}

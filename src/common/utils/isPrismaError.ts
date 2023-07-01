import { PrismaClientError } from '../errors/PrismaClientError';

export const isPrismaError = (error: PrismaClientError): boolean => {
  return typeof error.code === 'string' &&
    typeof error.clientVersion === 'string' &&
    (typeof error.meta === 'undefined' || typeof error.meta === 'object')
}

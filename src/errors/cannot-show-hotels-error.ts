import { ApplicationError } from '@/protocols';

export function cannotShowHotelsError(): ApplicationError {
  return {
    name: 'CannotShowHotelsError',
    message: 'Cannot show hotels!',
  };
}

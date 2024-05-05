import { Either, left, right, fold as foldEither } from 'fp-ts/Either';

export type Result<Success, Failure> = Either<Failure, Success>;

export function toEither<Success, Failure>(result: Result<Success, Failure>): Either<Failure, Success> {
    return result;
}

export function toResult<Success, Failure>(either: Either<Failure, Success>): Result<Success, Failure> {
    return either;
}

export function success<Success, Failure>(val: Success): Result<Success, Failure> {
  return toResult(right(val));
}

export function failure<Success, Failure>(val: Failure): Result<Success, Failure> {
  return toResult(left(val));
}

export function fold<Success, Failure, R>(
    onSuccess: (success: Success) => R,
    onFailure: (failure: Failure) => R,
): (result: Result<Success, Failure>) => R {
    return (result) => foldEither(onFailure, onSuccess)(toEither(result));
}

export function handle<R, Success, Failure>(
    result: Result<Success, Failure>,
    onSuccess: (success: Success) => R,
    onFailure: (failure: Failure) => R
): R {
    return fold(onSuccess, onFailure)(result);
}

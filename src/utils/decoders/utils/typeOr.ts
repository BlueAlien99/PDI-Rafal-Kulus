export type TypeOr<T> = (fallback?: T) => (x: unknown) => T;

export const numberOr: TypeOr<number> =
    (fallback = 0) =>
    x =>
        typeof x === 'number' ? x : fallback;

export const arrayOr: TypeOr<unknown[]> =
    (fallback = []) =>
    (x): unknown[] =>
        Array.isArray(x) ? x : fallback;

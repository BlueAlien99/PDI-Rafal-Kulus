import * as R from 'ramda';
import { TypeOr, arrayOr } from './typeOr';

export const propOfType =
    <T>(prop: string, ensureType: ReturnType<TypeOr<T>>) =>
    (x: unknown): T =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
        ensureType((x as any)?.[prop]);

export const arrayOfType =
    <T>(ensureType: ReturnType<TypeOr<T>>) =>
    (x: unknown): T[] =>
        R.pipe(arrayOr(), R.map(ensureType))(x);

export const zip3 = <T>(a1: T[], a2: T[], a3: T[]): [T, T, T][] =>
    R.zipWith(R.prepend, a1, R.zip(a2, a3)) as unknown as [T, T, T][];

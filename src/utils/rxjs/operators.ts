import { Observable, Subject } from 'rxjs';

export const pipeIf =
    <T>(
        predicate: (value: T) => boolean,
        conditionalPipe: (conditionalSource: Observable<T>) => Observable<T>
    ) =>
    (source: Observable<T>): Observable<T> => {
        const subject = new Subject<T>();

        const conditionalOutput = conditionalPipe(subject);

        return new Observable<T>(subscriber => {
            const conditionalSubscription = conditionalOutput.subscribe(subscriber);

            const sourceSubscription = source.subscribe({
                next: val => (predicate(val) ? subject.next(val) : subscriber.next(val)),
                error: err => subscriber.error(err),
                complete: () => subscriber.complete(),
            });

            return () => {
                sourceSubscription.unsubscribe();
                conditionalSubscription.unsubscribe();
            };
        });
    };

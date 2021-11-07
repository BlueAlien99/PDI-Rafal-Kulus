import { Observable } from 'rxjs';
import { Socket } from 'socket.io-client';

export const fromSocketEvent = (socket: Socket, eventName: string): Observable<unknown> =>
    new Observable(subscriber => {
        const listener = (data: unknown) => subscriber.next(data);

        socket.on(eventName, listener);

        return () => socket.off(eventName, listener);
    });

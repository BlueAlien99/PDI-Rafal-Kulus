import * as R from 'ramda';
import { map, tap } from 'rxjs';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAppDispatch } from 'hooks/redux';
import {
    webSocketConnected,
    webSocketConnectionError,
    webSocketDisconnected,
} from 'features/webSocket/webSocketSlice';
import { aliceEventReceived } from 'features/aliceData/aliceDataSlice';
import { propOfType } from 'utils/decoders/utils/utils';
import { eventDecoder } from 'utils/decoders/eventDecoder';
import { fromSocketEvent } from 'utils/rxjs/observables';
import { store } from 'app/store';

declare global {
    interface Window {
        sss: number;
        kkk: number;
        resss: {
            [key: string]: number[];
        };
    }
}

function WebSocketConnection(): null {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const socket = io();

        socket.on('connect', () => dispatch(webSocketConnected()));
        socket.on('connect_error', () => dispatch(webSocketConnectionError()));
        socket.on('disconnect', reason => dispatch(webSocketDisconnected({ reason })));

        fromSocketEvent(socket, 'track')
            .pipe(
                tap(() => {
                    const ttt = store.getState().aliceData.trackCount;
                    window.resss = window.resss || {};
                    window.resss[ttt] = window.resss[ttt] || [];
                    window.resss[ttt].push(window.kkk - window.sss);

                    window.sss = performance.now();
                }),
                map(propOfType('sJ', R.identity)),
                map(data => eventDecoder(data)),
                map(aliceEventReceived)
            )
            .subscribe(dispatch);

        return () => {
            socket.close();
        };
    }, [dispatch]);

    return null;
}

export default WebSocketConnection;

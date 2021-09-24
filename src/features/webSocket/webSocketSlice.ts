import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'AppTypes';

export interface WebSocketState {
    status: 'connected' | 'connection_error' | 'disconnected';
    disconnectionReason: string;
}

const initialState: WebSocketState = {
    status: 'disconnected',
    disconnectionReason: '',
};

export const webSocketSlice = createSlice({
    name: 'webSocket',
    initialState,
    reducers: {
        webSocketConnected: state => {
            state.status = 'connected';
        },
        webSocketConnectionError: state => {
            state.status = 'connection_error';
        },
        webSocketDisconnected: (state, action: PayloadAction<{ reason: string }>) => {
            state.status = 'disconnected';
            state.disconnectionReason = action.payload.reason;
        },
    },
});

export const { webSocketConnected, webSocketConnectionError, webSocketDisconnected } =
    webSocketSlice.actions;

export const selectWebSocket = (state: RootState): WebSocketState => state.webSocket;

export default webSocketSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'AppTypes';
import { AliceEvent } from 'utils/decoders/eventDecoder';

const initialState: AliceEvent = {
    id: 0,
    tracks: [],
};

export const aliceDataSlice = createSlice({
    name: 'aliceData',
    initialState,
    reducers: {
        aliceEventReceived: (state, action: PayloadAction<AliceEvent>) => action.payload,
    },
});

export const { aliceEventReceived } = aliceDataSlice.actions;

export const selectAliceData = (state: RootState): AliceEvent => state.aliceData;

export default aliceDataSlice.reducer;

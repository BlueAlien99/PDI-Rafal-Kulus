import { createAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { filter, map } from 'rxjs';
import { RootState, AppEpic } from 'AppTypes';
import { fetchCount } from './counterAPI';

export interface CounterState {
    value: number;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
    value: 0,
    status: 'idle',
};

export const incrementAsync = createAsyncThunk('counter/fetchCount', async (amount: number) => {
    const response = await fetchCount(amount);
    return response.data;
});

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: state => {
            state.value += 1;
        },
        decrement: state => {
            state.value -= 1;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(incrementAsync.pending, state => {
                state.status = 'loading';
            })
            .addCase(incrementAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value += action.payload;
            });
    },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const selectCount = (state: RootState): number => state.counter.value;

export const incrementIfOdd = createAction<number>('counter/incrementIfOdd');

export const incrementIfOddEpic: AppEpic = (action$, state$) =>
    action$.pipe(
        filter(incrementIfOdd.match),
        filter(() => selectCount(state$.value) % 2 === 1),
        map(action => incrementByAmount(action.payload))
    );

export default counterSlice.reducer;

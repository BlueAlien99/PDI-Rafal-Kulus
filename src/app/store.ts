import { configureStore, ThunkAction, Action, AnyAction, combineReducers } from '@reduxjs/toolkit';
import aliceDataReducer from 'features/aliceData/aliceDataSlice';
import counterReducer, { incrementIfOddEpic } from 'features/counter/counterSlice';
import webSocketReducer from 'features/webSocket/webSocketSlice';
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';

const rootReducer = combineReducers({
    aliceData: aliceDataReducer,
    counter: counterReducer,
    webSocket: webSocketReducer,
});

const rootEpic = combineEpics(incrementIfOddEpic);

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, RootState>();

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
export type AppEpic = Epic<AnyAction, AnyAction, RootState>;

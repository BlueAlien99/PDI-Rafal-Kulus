import { configureStore, AnyAction, combineReducers } from '@reduxjs/toolkit';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import aliceDataReducer from 'features/aliceData/aliceDataSlice';
import counterReducer, { incrementIfOddEpic } from 'features/counter/counterSlice';
import webSocketReducer from 'features/webSocket/webSocketSlice';

const rootReducer = combineReducers({
    aliceData: aliceDataReducer,
    counter: counterReducer,
    webSocket: webSocketReducer,
});

const rootEpic = combineEpics(incrementIfOddEpic);

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, ReturnType<typeof rootReducer>>();

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);

import { configureStore, AnyAction, combineReducers } from '@reduxjs/toolkit';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import aliceDataReducer from 'features/aliceData/aliceDataSlice';
import counterReducer, { incrementIfOddEpic } from 'features/counter/counterSlice';
import screenshotReducer, { screenshotTakenEpic } from 'features/screenshot/screenshotSlice';
import stylesReducer from 'features/styles/stylesSlice';
import webSocketReducer from 'features/webSocket/webSocketSlice';

const rootReducer = combineReducers({
    aliceData: aliceDataReducer,
    counter: counterReducer,
    screenshot: screenshotReducer,
    styles: stylesReducer,
    webSocket: webSocketReducer,
});

const rootEpic = combineEpics(incrementIfOddEpic, screenshotTakenEpic);

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, ReturnType<typeof rootReducer>>();

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);

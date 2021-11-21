import { configureStore, AnyAction, combineReducers } from '@reduxjs/toolkit';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import aliceDataReducer from 'features/aliceData/aliceDataSlice';
import screenshotReducer, { screenshotTakenEpic } from 'features/screenshot/screenshotSlice';
import stylesReducer from 'features/styles/stylesSlice';
import webSocketReducer from 'features/webSocket/webSocketSlice';

const rootReducer = combineReducers({
    aliceData: aliceDataReducer,
    screenshot: screenshotReducer,
    styles: stylesReducer,
    webSocket: webSocketReducer,
});

const rootEpic = combineEpics(screenshotTakenEpic);

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, ReturnType<typeof rootReducer>>();

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);

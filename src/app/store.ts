import { configureStore, ThunkAction, Action, AnyAction, combineReducers } from '@reduxjs/toolkit';
import counterReducer, { incrementIfOddEpic } from 'features/counter/counterSlice';
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';

const rootReducer = combineReducers({
    counter: counterReducer,
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

declare module 'AppTypes' {
    import { ThunkAction, Action, AnyAction } from '@reduxjs/toolkit';
    import { Epic } from 'redux-observable';

    export type AppDispatch = typeof import('app/store').store.dispatch;
    export type RootState = ReturnType<typeof import('app/store').store.getState>;
    export type AppThunk<ReturnType = void> = ThunkAction<
        ReturnType,
        RootState,
        unknown,
        Action<string>
    >;
    export type AppEpic = Epic<AnyAction, AnyAction, RootState>;
}

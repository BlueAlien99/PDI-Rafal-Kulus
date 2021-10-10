import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'AppTypes';
import { predefinedStyles, ThreeStyle } from './predefinedStyles';

export interface StylesState {
    styles: ThreeStyle[];
    currentStyle: ThreeStyle;
}

const initialState: StylesState = {
    styles: predefinedStyles,
    currentStyle: predefinedStyles[0],
};

export const stylesSlice = createSlice({
    name: 'styles',
    initialState,
    reducers: {
        currentStyleUpdated: (state, action: PayloadAction<Partial<ThreeStyle>>) => {
            state.currentStyle = {
                ...state.currentStyle,
                ...action.payload,
            };
        },
    },
});

export const { currentStyleUpdated } = stylesSlice.actions;

export const selectStyles = (state: RootState): ThreeStyle[] => state.styles.styles;
export const selectCurrentStyle = (state: RootState): ThreeStyle => state.styles.currentStyle;

export default stylesSlice.reducer;

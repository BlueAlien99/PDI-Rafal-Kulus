import * as R from 'ramda';
import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { AppEpic, RootState } from 'AppTypes';
import { bufferCount, filter, map, mergeMap, switchMap, tap } from 'rxjs';
import { download } from 'utils/utils';
import { pipeIf } from 'utils/rxjs/operators';
import { generateFilename, SVGElementToUrl, UrlToBlobText, UrlToImageElement } from './utils';
import { combinePNGs, combineSVGs } from './imageCombiners';
import { Size } from './dimensions';

export type SupportedVariants = 'png' | 'svg';

export interface ScreenshotState {
    request: {
        id: number;
        viewId: number;
        variant: SupportedVariants;
    };
    size: Size;
}

const initialState: ScreenshotState = {
    request: {
        id: 0,
        // viewId === -1 means all views (combined screenshot)
        viewId: -1,
        variant: 'png',
    },
    size: {
        width: 1920,
        height: 1080,
    },
};

export const screenshotSlice = createSlice({
    name: 'screenshot',
    initialState,
    reducers: {
        screenshotRequested: (
            state,
            action: PayloadAction<{ viewId: number; variant: SupportedVariants }>
        ) => {
            state.request.id += 1;
            state.request.viewId = action.payload.viewId;
            state.request.variant = action.payload.variant;
        },
        screenshotSizeUpdated: (state, action: PayloadAction<Size>) => {
            state.size = R.map(val => R.max(val, 1), action.payload);
        },
    },
});

export const { screenshotRequested, screenshotSizeUpdated } = screenshotSlice.actions;

export const selectScreenshotRequest = (state: RootState): ScreenshotState['request'] =>
    state.screenshot.request;
export const selectScreenshotSize = (state: RootState): Size => state.screenshot.size;

export interface ScreenshotTakenPayload {
    requestId: number;
    viewId: number;
    variant: SupportedVariants;
    imageUrl: string;
    filename: string;
}

export const screenshotTaken = createAction<ScreenshotTakenPayload>('screenshot/screenshotTaken');

const combineImages =
    ({ request: { id, viewId, variant }, size }: ScreenshotState) =>
    async (imageUrls: string[]) => {
        let imageUrl = '';

        if (variant === 'png') {
            const images = await Promise.all(imageUrls.map(UrlToImageElement));
            imageUrl = combinePNGs(images, size).toDataURL('image/png');
        } else if (variant === 'svg') {
            const images = await Promise.all(imageUrls.map(UrlToBlobText));
            imageUrl = SVGElementToUrl(combineSVGs(images, size));
        } else {
            const _exhaustiveCheck: never = variant;
            return _exhaustiveCheck;
        }

        return screenshotTaken({
            requestId: id,
            viewId,
            variant,
            imageUrl,
            filename: generateFilename(new Date(), 'Combined', variant),
        });
    };

export const screenshotTakenEpic: AppEpic = (action$, state$) =>
    action$.pipe(
        filter(screenshotRequested.match),
        map(() => state$.value.screenshot.request),
        switchMap(({ id, viewId, variant }) =>
            action$.pipe(
                filter(screenshotTaken.match),
                filter(action => action.payload.requestId === id),
                filter(action => action.payload.variant === variant),
                pipeIf(
                    () => viewId === -1,
                    conditionalSource =>
                        conditionalSource.pipe(
                            bufferCount(3),
                            map(actions =>
                                actions
                                    .map(action => action.payload)
                                    .sort((a, b) => a.viewId - b.viewId)
                                    .map(payload => payload.imageUrl)
                            ),
                            mergeMap(combineImages(state$.value.screenshot))
                        )
                )
            )
        ),
        tap(({ payload: { imageUrl, filename } }) => download(filename, imageUrl)),
        filter(() => false)
    );

export default screenshotSlice.reducer;

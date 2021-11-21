/**
 * vertical divisor
 */
export const vDiv = 2;
/**
 * horizontal divisor
 */
export const hDiv = 3;

export type Size = {
    width: number;
    height: number;
};

export type SupportedViewIds = 0 | 1 | 2;

export type ScreenshotDimensions = {
    [key in SupportedViewIds]: {
        sx: number;
        sy: number;
        sWidth: number;
        sHeight: number;
        dx: number;
        dy: number;
        dWidth: number;
        dHeight: number;
    };
};

export const getScreenshotDimensions = ({ width, height }: Size): ScreenshotDimensions => {
    const getElementDimensions = (widthRatio: number, heightRatio: number) => {
        const normalizedWidthRatio = widthRatio / heightRatio;

        return {
            dWidth: width * widthRatio,
            dHeight: height * heightRatio,
            sx: (width * (1 - normalizedWidthRatio)) / 2,
            sy: 0,
            sWidth: width * normalizedWidthRatio,
            sHeight: height,
        };
    };

    return {
        0: {
            dx: 0,
            dy: 0,
            ...getElementDimensions((hDiv - 1) / hDiv, 1),
        },
        1: {
            dx: (width * (hDiv - 1)) / hDiv,
            dy: 0,
            ...getElementDimensions(1 / hDiv, (vDiv - 1) / vDiv),
        },
        2: {
            dx: (width * (hDiv - 1)) / hDiv,
            dy: (height * (vDiv - 1)) / vDiv,
            ...getElementDimensions(1 / hDiv, 1 / vDiv),
        },
    };
};

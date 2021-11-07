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
    const source = {
        sx: width / (hDiv * 2),
        sy: 0,
        sWidth: (width * (hDiv - 1)) / hDiv,
        sHeight: height,
    };

    return {
        0: {
            ...source,
            dx: 0,
            dy: 0,
            dWidth: (width * (hDiv - 1)) / hDiv,
            dHeight: height,
        },
        1: {
            ...source,
            dx: (width * (hDiv - 1)) / hDiv,
            dy: 0,
            dWidth: width / hDiv,
            dHeight: height / vDiv,
        },
        2: {
            ...source,
            dx: (width * (hDiv - 1)) / hDiv,
            dy: height / vDiv,
            dWidth: width / hDiv,
            dHeight: height / vDiv,
        },
    };
};

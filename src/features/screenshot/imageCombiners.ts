import { getScreenshotDimensions, ScreenshotDimensions, Size } from './dimensions';

const drawImage = (
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    dim: ScreenshotDimensions[0]
): void => {
    ctx.drawImage(
        image,
        dim.sx,
        dim.sy,
        dim.sWidth,
        dim.sHeight,
        dim.dx,
        dim.dy,
        dim.dWidth,
        dim.dHeight
    );
};

export const combinePNGs = (images: HTMLImageElement[], size: Size): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    canvas.width = size.width;
    canvas.height = size.height;
    const ctx = canvas.getContext('2d');

    const dims = getScreenshotDimensions(size);

    if (ctx) {
        drawImage(ctx, images[0], dims[0]);
        drawImage(ctx, images[1], dims[1]);
        drawImage(ctx, images[2], dims[2]);
    }

    return canvas;
};

const repositionSVG = (svg: string, dim: ScreenshotDimensions[0]): string => {
    const regexWidth = /width="[^"]*"/;
    const regexHeight = /height="[^"]*"/;

    return svg
        .replace(regexWidth, `x="${dim.dx}" width="${dim.dWidth}"`)
        .replace(regexHeight, `y="${dim.dy}" height="${dim.dHeight}"`);
};

export const combineSVGs = (images: string[], { width, height }: Size): SVGSVGElement => {
    const style = /(?<=style=")[^"]*"/.exec(images[0]);

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('width', `${width}`);
    svg.setAttribute('height', `${height}`);
    svg.setAttribute('style', style ? style[0] : '');

    const dims = getScreenshotDimensions({ width, height });

    svg.innerHTML = [
        repositionSVG(images[0], dims[0]),
        repositionSVG(images[1], dims[1]),
        repositionSVG(images[2], dims[2]),
    ].join('');

    return svg;
};

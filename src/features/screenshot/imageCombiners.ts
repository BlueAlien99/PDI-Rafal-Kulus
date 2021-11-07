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

export const combineSVGs = (images: string[], { width, height }: Size): SVGSVGElement => {
    const style = /(?<=style=")[^"]*"/.exec(images[0]);

    const rgw = /width="[^"]*"/;
    const rgh = /height="[^"]*"/;

    images[0] = images[0]
        .replace(rgw, `x="${0}" width="${(width * 2) / 3}"`)
        .replace(rgh, `y="${0}" height="${height}"`);
    images[1] = images[1]
        .replace(rgw, `x="${(width * 2) / 3}" width="${(width * 1) / 3}"`)
        .replace(rgh, `y="${0}" height="${height / 2}"`);
    images[2] = images[2]
        .replace(rgw, `x="${(width * 2) / 3}" width="${(width * 1) / 3}"`)
        .replace(rgh, `y="${height / 2}" height="${height / 2}"`);

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('width', `${width}`);
    svg.setAttribute('height', `${height}`);
    svg.setAttribute('style', style ? style[0] : '');

    svg.innerHTML = images.join('');

    return svg;
};

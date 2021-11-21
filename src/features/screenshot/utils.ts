import { toISOStringWithTimezone } from 'utils/date';

export const SVGElementToUrl = (node: SVGElement): string => {
    const imageData = new XMLSerializer().serializeToString(node);
    const imageBlob = new Blob([imageData], {
        type: 'image/svg+xml;charset=utf-8',
    });
    return URL.createObjectURL(imageBlob);
};

export const UrlToImageElement = (url: string): Promise<HTMLImageElement> =>
    new Promise<HTMLImageElement>(res => {
        const image = new Image();
        image.src = url;
        image.onload = () => res(image);
    });

export const UrlToBlobText = (url: string): Promise<string> =>
    fetch(url)
        .then(resp => resp.blob())
        .then(blob => blob.text());

export const generateFilename = (date: Date, label: string, variant: string): string =>
    `${toISOStringWithTimezone(date)}__${label}.${variant}`;

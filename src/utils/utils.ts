export const download = (filename: string, url: string): void => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
};

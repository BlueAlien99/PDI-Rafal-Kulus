export const download = (filename: string, data: string): void => {
    const link = document.createElement('a');
    link.href = data;
    link.download = filename;
    link.click();
};

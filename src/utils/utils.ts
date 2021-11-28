export const download = (filename: string, url: string): void => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
};

export const getSequenceGenerator = (): (() => number) => {
    let i = -1;

    return () => {
        i += 1;
        return i;
    };
};

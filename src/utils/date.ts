export const toISOStringWithTimezone = (date: Date): string => {
    const offset = date.getTimezoneOffset() * 60000;

    return new Date(date.getTime() - offset).toISOString().slice(0, -1);
};

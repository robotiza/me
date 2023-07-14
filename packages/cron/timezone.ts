export const offset = (date: Date, timeZone: string): Date => {
    const dtf = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: 'h23',
        // fractionalSecondDigits: 3,
        timeZone
    });

    return new Date(dtf.format(date));
}
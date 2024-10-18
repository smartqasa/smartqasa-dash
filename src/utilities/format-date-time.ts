export const formattedDate = (date: Date = new Date()): string => {
    const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        month: "short",
        day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
};

export const formattedTime = (date: Date = new Date()): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours % 12 || 12}:${minutes < 10 ? "0" + minutes : minutes}`;
};

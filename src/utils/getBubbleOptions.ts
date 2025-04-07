export const getBubbleOptions = (allOptions: string[], selected: string[]) => {
    return allOptions
        .filter(option => selected.every(group => option?.groups?.includes(group)))
        .slice(0, 7);
};

export function calculateMedian(runs: number[]): number {
    if (!runs?.length) return -1;

    // NOTE: for large datasets it might make sense to implement our own sorting algorithm,
    // where we calculate our values at the same time, but for such a small dataset it shouldn't matter

    runs.sort((a, b) => a - b);

    return runs.length % 2 === 0
        ? (runs[Math.floor((runs.length - 1) / 2)] + runs[Math.ceil((runs.length - 1) / 2)]) / 2
        : runs[(runs.length - 1) / 2];
}

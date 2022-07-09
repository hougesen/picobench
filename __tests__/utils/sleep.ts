export const defaultSleepValue = 100;

export function sleep(ms = defaultSleepValue) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

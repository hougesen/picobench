import * as microtime from 'microtime';

import { IBenchOptions, IBenchResult } from '../';
import { calculateMedian } from './calculateMedian';

export function benchSync<T>(
    callback: () => Promise<T> | T,
    options: IBenchOptions = {
        runs: 10,
        warmupRuns: 5,
    }
): IBenchResult {
    const runs: number[] = [];
    let maximum = -1;
    let minimum = -1;
    let total = 0;

    for (let i = 0; i < (options?.warmupRuns ?? 5); i += 1) {
        callback();
    }

    for (let currentRun = 1; currentRun <= (options?.runs ?? 5); currentRun += 1) {
        const startTime = microtime.now();

        callback();

        const endTime = microtime.now();

        const timeToFinish = (endTime - startTime) / 1000;

        total += timeToFinish;

        if (maximum === -1 || timeToFinish > maximum) {
            maximum = timeToFinish;
        }

        if (minimum === -1 || timeToFinish < minimum) {
            minimum = timeToFinish;
        }

        runs.push(timeToFinish);
    }

    const average = total && runs.length ? total / runs.length : 0;

    return {
        ops: 1 / (average / 1000),
        average,
        median: calculateMedian(runs),
        minimum,
        maximum,
        runs,
    };
}

import { describe, expect, it } from 'vitest';

import { benchAsync } from '../src/lib/benchAsync';

const expectedOverheadMs = 10;

const defaultSleepValue = 100;

function sleep(ms = defaultSleepValue) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

describe.concurrent('lib/benchAsync.ts', async () => {
    it.concurrent('can call benchAsync function without params', async () => {
        const benchmarkResult = await benchAsync(sleep);

        expect(benchmarkResult).toHaveProperty('ops');
        expect(benchmarkResult).toHaveProperty('average');
        expect(benchmarkResult).toHaveProperty('median');
        expect(benchmarkResult).toHaveProperty('minimum');
        expect(benchmarkResult).toHaveProperty('maximum');
        expect(benchmarkResult).toHaveProperty('runs');

        expect(benchmarkResult?.minimum).toBeGreaterThan(defaultSleepValue - 2);

        expect(benchmarkResult?.maximum).toBeLessThan(defaultSleepValue + expectedOverheadMs);

        expect(benchmarkResult?.average).toBeGreaterThanOrEqual(defaultSleepValue - 2);

        expect(benchmarkResult?.average).toBeLessThan(defaultSleepValue + expectedOverheadMs);
    });

    it.concurrent('test average, minimum, maximum', async () => {
        const sleepDuration = 100;

        const benchmarkResult = await benchAsync(async () => await sleep(sleepDuration));

        let total = 0;
        let minimum = benchmarkResult?.runs[0];
        let maximum = benchmarkResult?.runs[0];

        for (let i = 0; i < benchmarkResult?.runs?.length; i += 1) {
            total += benchmarkResult?.runs[i];

            if (minimum > benchmarkResult?.runs[i]) {
                minimum = benchmarkResult?.runs[i];
            }
            if (maximum < benchmarkResult?.runs[i]) {
                maximum = benchmarkResult?.runs[i];
            }
        }

        expect(benchmarkResult?.average).toBeCloseTo(total / benchmarkResult?.runs?.length);

        expect(benchmarkResult?.minimum).toEqual(minimum);

        expect(benchmarkResult?.maximum).toEqual(maximum);

        expect(benchmarkResult).toHaveProperty('ops');
        expect(benchmarkResult).toHaveProperty('average');
        expect(benchmarkResult).toHaveProperty('median');
        expect(benchmarkResult).toHaveProperty('minimum');
        expect(benchmarkResult).toHaveProperty('maximum');
        expect(benchmarkResult).toHaveProperty('runs');
    });

    it.concurrent('test median', async () => {
        const oddBenchmarkRuns = await benchAsync(async () => await sleep(50), { runs: 3, warmupRuns: 0 });

        const sortedOddBenchmarkRuns = oddBenchmarkRuns?.runs?.sort((a, b) => a - b);

        expect(oddBenchmarkRuns?.median).toEqual(sortedOddBenchmarkRuns[1]);

        const evenBenchmarkRuns = await benchAsync(async () => await sleep(50), { runs: 4, warmupRuns: 0 });

        const sortedEvenBenchmarkRuns = evenBenchmarkRuns?.runs?.sort((a, b) => a - b);

        expect(evenBenchmarkRuns?.median).toEqual((sortedEvenBenchmarkRuns[1] + sortedEvenBenchmarkRuns[2]) / 2);
    });

    it.concurrent('50 milliseconds function', async () => {
        const sleepDuration = 50;

        const benchmarkResult = await benchAsync(async () => await sleep(sleepDuration));

        expect(benchmarkResult?.minimum).toBeGreaterThan(sleepDuration - 2);

        expect(benchmarkResult?.maximum).toBeLessThan(sleepDuration + expectedOverheadMs);

        expect(benchmarkResult?.average).toBeGreaterThanOrEqual(sleepDuration - 2);

        expect(benchmarkResult?.average).toBeLessThan(sleepDuration + expectedOverheadMs);

        expect(benchmarkResult).toHaveProperty('ops');
        expect(benchmarkResult).toHaveProperty('average');
        expect(benchmarkResult).toHaveProperty('median');
        expect(benchmarkResult).toHaveProperty('minimum');
        expect(benchmarkResult).toHaveProperty('maximum');
        expect(benchmarkResult).toHaveProperty('runs');
    });

    it.concurrent('100 milliseconds function', async () => {
        const sleepDuration = 100;

        const benchmarkResult = await benchAsync(async () => await sleep(sleepDuration));

        expect(benchmarkResult?.minimum).toBeGreaterThan(sleepDuration - 2);

        expect(benchmarkResult?.maximum).toBeLessThan(sleepDuration + expectedOverheadMs);

        expect(benchmarkResult?.average).toBeGreaterThanOrEqual(sleepDuration - 2);

        expect(benchmarkResult?.average).toBeLessThan(sleepDuration + expectedOverheadMs);

        expect(benchmarkResult).toHaveProperty('ops');
        expect(benchmarkResult).toHaveProperty('average');
        expect(benchmarkResult).toHaveProperty('median');
        expect(benchmarkResult).toHaveProperty('minimum');
        expect(benchmarkResult).toHaveProperty('maximum');
        expect(benchmarkResult).toHaveProperty('runs');
    });

    it.concurrent('150 milliseconds function', async () => {
        const sleepDuration = 150;

        const benchmarkResult = await benchAsync(async () => await sleep(sleepDuration));

        expect(benchmarkResult?.minimum).toBeGreaterThan(sleepDuration - 2);

        expect(benchmarkResult?.maximum).toBeLessThan(sleepDuration + expectedOverheadMs);

        expect(benchmarkResult?.average).toBeGreaterThanOrEqual(sleepDuration - 2);

        expect(benchmarkResult?.average).toBeLessThan(sleepDuration + expectedOverheadMs);

        expect(benchmarkResult).toHaveProperty('ops');
        expect(benchmarkResult).toHaveProperty('average');
        expect(benchmarkResult).toHaveProperty('median');
        expect(benchmarkResult).toHaveProperty('minimum');
        expect(benchmarkResult).toHaveProperty('maximum');
        expect(benchmarkResult).toHaveProperty('runs');
    });

    it.concurrent('200 milliseconds function', async () => {
        const sleepDuration = 200;

        const benchmarkResult = await benchAsync(async () => await sleep(sleepDuration));

        expect(benchmarkResult?.minimum).toBeGreaterThan(sleepDuration - 2);

        expect(benchmarkResult?.maximum).toBeLessThan(sleepDuration + expectedOverheadMs);

        expect(benchmarkResult?.average).toBeGreaterThanOrEqual(sleepDuration - 2);

        expect(benchmarkResult?.average).toBeLessThan(sleepDuration + expectedOverheadMs);

        expect(benchmarkResult).toHaveProperty('ops');
        expect(benchmarkResult).toHaveProperty('average');
        expect(benchmarkResult).toHaveProperty('median');
        expect(benchmarkResult).toHaveProperty('minimum');
        expect(benchmarkResult).toHaveProperty('maximum');
        expect(benchmarkResult).toHaveProperty('runs');
    });

    it.concurrent('250 milliseconds function', async () => {
        const sleepDuration = 250;

        const benchmarkResult = await benchAsync(async () => await sleep(sleepDuration));

        expect(benchmarkResult?.minimum).toBeGreaterThan(sleepDuration - 2);

        expect(benchmarkResult?.maximum).toBeLessThan(sleepDuration + expectedOverheadMs);

        expect(benchmarkResult?.average).toBeGreaterThanOrEqual(sleepDuration - 2);

        expect(benchmarkResult?.average).toBeLessThan(sleepDuration + expectedOverheadMs);

        expect(benchmarkResult).toHaveProperty('ops');
        expect(benchmarkResult).toHaveProperty('average');
        expect(benchmarkResult).toHaveProperty('median');
        expect(benchmarkResult).toHaveProperty('minimum');
        expect(benchmarkResult).toHaveProperty('maximum');
        expect(benchmarkResult).toHaveProperty('runs');
    });
});

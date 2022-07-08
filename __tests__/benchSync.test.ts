import { describe, expect, it } from 'vitest';

import { benchSync } from '../src/lib/benchSync';

/**
 * @summary unoptimized fibonacci number calculator
 * @note doesn't use memorization to increase time to calculate
 */
function fib(n = 30): number {
    if (n < 2) {
        return n;
    }

    return fib(n - 2) + fib(n - 1);
}

describe.concurrent('lib/benchSync', () => {
    it.concurrent('can call benchSync function without params', () => {
        const benchmarkResult = benchSync(fib);

        expect(benchmarkResult).toHaveProperty('ops');
        expect(benchmarkResult).toHaveProperty('average');
        expect(benchmarkResult).toHaveProperty('median');
        expect(benchmarkResult).toHaveProperty('minimum');
        expect(benchmarkResult).toHaveProperty('maximum');
        expect(benchmarkResult).toHaveProperty('runs');
    });

    it.concurrent('test average, minimum, maximum', async () => {
        const benchmarkResult = benchSync(() => fib(10));

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

        expect(benchmarkResult).toHaveProperty('ops');
        expect(benchmarkResult).toHaveProperty('average');
        expect(benchmarkResult).toHaveProperty('median');
        expect(benchmarkResult).toHaveProperty('minimum');
        expect(benchmarkResult).toHaveProperty('maximum');
        expect(benchmarkResult).toHaveProperty('runs');

        expect(benchmarkResult?.average).toBeCloseTo(total / benchmarkResult?.runs?.length);

        expect(benchmarkResult?.minimum).toEqual(minimum);

        expect(benchmarkResult?.maximum).toEqual(maximum);
    });

    it.concurrent('test median', async () => {
        const oddBenchmarkRuns = benchSync(() => fib(30), { runs: 3, warmupRuns: 0 });

        const sortedOddBenchmarkRuns = oddBenchmarkRuns?.runs?.sort((a, b) => a - b);

        expect(oddBenchmarkRuns?.median).toEqual(sortedOddBenchmarkRuns[1]);

        const evenBenchmarkRuns = benchSync(() => fib(30), { runs: 4, warmupRuns: 0 });

        const sortedEvenBenchmarkRuns = evenBenchmarkRuns?.runs?.sort((a, b) => a - b);

        expect(evenBenchmarkRuns?.median).toEqual((sortedEvenBenchmarkRuns[1] + sortedEvenBenchmarkRuns[2]) / 2);

        expect(oddBenchmarkRuns).toHaveProperty('ops');
        expect(oddBenchmarkRuns).toHaveProperty('average');
        expect(oddBenchmarkRuns).toHaveProperty('median');
        expect(oddBenchmarkRuns).toHaveProperty('minimum');
        expect(oddBenchmarkRuns).toHaveProperty('maximum');
        expect(oddBenchmarkRuns).toHaveProperty('runs');

        expect(evenBenchmarkRuns).toHaveProperty('ops');
        expect(evenBenchmarkRuns).toHaveProperty('average');
        expect(evenBenchmarkRuns).toHaveProperty('median');
        expect(evenBenchmarkRuns).toHaveProperty('minimum');
        expect(evenBenchmarkRuns).toHaveProperty('maximum');
        expect(evenBenchmarkRuns).toHaveProperty('runs');
    });
});

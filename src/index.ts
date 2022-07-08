export interface IBenchOptions {
    runs?: number;
    warmupRuns?: number;
}

export interface IBenchResult {
    /**
     * @summary operations per seconds
     * @calculation 1 / (average_in_ms / 1000)
     */
    ops: number;
    /**
     * @summary averate time to run in milliseconds
     */
    average: number;
    /**
     * @summary median time to run in milliseconds
     */
    median: number;
    /**
     * @summary slowest run in milliseconds
     */
    minimum: number;
    /**
     * @summary fastest run in milliseconds
     */
    maximum: number;
    /**
     * @summary all runs in milliseconds
     */
    runs: number[];
}

export * from './lib/benchAsync';
export * from './lib/benchSync';

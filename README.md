# picobench

A pico (very small) library for testing performance of functions. Meant to be used in combination with a unit test framework like Vitest or Jest

[![ci](https://github.com/hougesen/picobench/workflows/ci/badge.svg)](https://github.com/hougesen/picobench/actions/workflows/ci.yml)
[![npm-publish](https://github.com/hougesen/picobench/workflows/npm-publish/badge.svg)](https://github.com/hougesen/picobench/actions/workflows/npm-publish.yml)
[![npm version](https://badge.fury.io/js/picobench.svg)](https://badge.fury.io/js/picobench)

## Note for TypeScript users

If you are using TypeScript, you should consider transpiling your project first, and then running the benchmark against the transpiled code. This will give a more precise result.

## Installation

```sh
npm i -D picobench
```

## Usage

To benchmark function you should use [benchSync](./src/lib/benchSync.ts) for synchronous code, and [benchAsync](./src/lib/benchAsync.ts) for asynchronous code.

The output of the timing functions look like the following:

```ts
interface IBenchResult {
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
```

### Synchronous code

```ts
import { benchSync } from 'picobench';
// or
const { benchSync } = require('picobench');
// or
const benchSync = require('picobench').benchSync;

function dummyFn() {
    let sum = 0;
    for (let i = 0; i < 1000000; i += 1) sum += 1;
    return sum;
}

const benchmarkResult = benchSync(dummyFn);

//  {
//      ops: 1052.6315789473683,
//      average: 0.95,
//      median: 0.9604999999999999,
//      minimum: 0.903,
//      maximum: 0.97,
//      runs: [0.903, 0.908, 0.951, 0.958, 0.96, 0.961, 0.961, 0.964, 0.964, 0.97]
//  }
```

### Synchronous code

```ts
import { benchSync } from 'picobench';
// or
const { benchAsync } = require('picobench');
// or
const benchAsync = require('picobench').benchSync;

function dummyFn(n = 1000000): number {
    let sum = 0;
    for (let i = 0; i < n; i += 1) sum += 1;
    return sum;
}

// if the function doesn't take parameters you can call it like this
const benchmarkResult = benchSync(dummyFn);
// otherwise you will have to call it with a callback function
const benchmarkResult = benchSync(() => dummyFn(10000));

//  {
//      ops: 1052.6315789473683,
//      average: 0.95,
//      median: 0.9604999999999999,
//      minimum: 0.903,
//      maximum: 0.97,
//      runs: [0.903, 0.908, 0.951, 0.958, 0.96, 0.961, 0.961, 0.964, 0.964, 0.97]
//  }
```

### Asynchronous code

```ts
import { benchAsync } from 'picobench';
// or
const { benchAsync } = require('picobench');
// or
const benchAsync = require('picobench').benchAsync;

async function sleep(ms = 500) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// if the function doesn't take parameters you can call it like this
const benchmarkResult = await benchAsync(sleep);
// otherwise you will have to call it like a callback function
const benchmarkResult = await benchAsync(() => await sleep(500));

//  {
//      ops: 1.996369801153583,
//      average: 500.9091999999999,
//      median: 500.87800000000004,
//      minimum: 500.796,
//      maximum: 501.292,
//      runs: [500.796, 500.823, 500.851, 500.869, 500.877, 500.879, 500.894, 500.898, 500.913, 501.292]
//  }
```

### Callbacks

If you wish to benchmark a function that needs parameters, you have to pass the function as a callback function.

```ts
import { benchSync, benchAsync } from 'picobench';

const syncBenchmark = benchSync(() => {
    callSomeSyncFunction('param1', 'param2');
});

const asyncBenchmark = await benchAsync(async () => {
    await callSomeAsyncFunc('param1', 'param2');
});
```

The same goes if you wish to benchmark code that isn't wrapped in a function already.

```ts
import { benchSync } from 'picobench';

const syncBenchmark = benchSync(() => {
    const numbers = 1000;
    Array.from({ length: numbers }, () => Math.floor(Math.random() * numbers));
});
```

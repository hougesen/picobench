/**
 * @summary unoptimized fibonacci number calculator
 * @note doesn't use memorization to increase time to calculate
 */
export function fib(n = 30): number {
    if (n < 2) {
        return n;
    }

    return fib(n - 2) + fib(n - 1);
}

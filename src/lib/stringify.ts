export function stringifyFunction(fn: Function, ...params: unknown[]): string {
    return `(${fn.toString()})(${JSON.stringify(params).slice(1, -1)})`;
}

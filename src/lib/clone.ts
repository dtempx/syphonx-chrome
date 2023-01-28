export function clone<T = unknown>(value: T): T {
    return JSON.parse(JSON.stringify(value));
}
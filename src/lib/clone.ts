export function clone<T = unknown>(value: T): T {
    if (!(value === undefined || value === null || value instanceof Date))
        return JSON.parse(JSON.stringify(value))
    else
        return value;
}

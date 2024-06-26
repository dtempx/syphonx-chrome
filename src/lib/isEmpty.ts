export function isEmpty(obj: unknown): boolean {
    if (obj === null) return true;
    if (obj === undefined) return true;
    if (Array.isArray(obj)) return obj.length === 0;
    if (typeof obj === "string") return obj.length === 0;
    if (typeof obj === "object") return Object.keys(obj).length === 0;
    return false;
}

export function isEmptyDeep(obj: unknown, seen = new WeakSet()): boolean {
    if (obj === null) return true;
    if (typeof obj === "object") {
        if (seen.has(obj)) return false; // circular reference
        seen.add(obj);
        if (Array.isArray(obj))
            return obj.length === 0 || obj.every(value => isEmptyDeep(value, seen));
        return Object.keys(obj).length === 0 || 
            Object.values(obj).every(value => isEmptyDeep(value, seen));
    }
    if (typeof obj === "string") return obj.length === 0;
    return isEmpty(obj);
}

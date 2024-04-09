export function isEmpty(obj: unknown): boolean {
    if (obj === undefined || obj === null) {
        return true;
    }
    else if (obj instanceof Array) {
        return obj.length === 0;
    }
    else if (typeof obj === "string") {
        return obj.length === 0;
    }
    else {
        return false;
    }
}
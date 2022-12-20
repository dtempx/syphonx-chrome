export function slice(path: string): string[] {
    const result = [];
    let i = 0;
    while (i >= 0) {
        const text = path.slice(0, i + 1);
        result.push(text);
        i = path.indexOf("/", i + 1);
    }
    return result;
}
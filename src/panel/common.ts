export function tryParseJSON(text: string): unknown {
    try {
        return JSON.parse(text);
    }
    catch (err) {
        return undefined;
    }
}
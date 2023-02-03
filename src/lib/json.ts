import JSON5 from "json5";

export function tryParseJson(value: string): unknown {
    try {
        return JSON5.parse(value);
    }
    catch {
        return undefined;
    }
}
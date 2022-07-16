import { Action } from "syphonx-core";

export function tryParseJSON(text: string): unknown {
    try {
        return JSON.parse(text);
    }
    catch (err) {
        return undefined;
    }
}

export function parseScript(script: string): Action[] {
    const obj = tryParseJSON(script) as Action[];
    return obj ? obj as Action[] : [];    
}

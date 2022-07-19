import * as syphonx from "syphonx-core";

export function formatScript(script: unknown): string {
    let text = JSON.stringify(script, null, 2);
    let i = text.indexOf(`"$": [\n`);
    while (i >= 0) {
        i = text.indexOf("[", i);
        const j = matchBrace(text, i, "[]");
        if (j > i) {
            text = `${text.substring(0, i)}${text.substring(i, j).replace(/\s*\[/g, "[").replace(/\s*\]/g, "]").replace(/\[\s*"/g, `["`).replace(/",\s*"/g, `","`)}${text.substring(j)}`;
            i = text.indexOf(`"$": [\n`);
        }
        else {
            break;
        }
    }
    return text;
}

export function isObject(obj: unknown): boolean {
    return typeof obj === "object" && obj !== null && !(obj instanceof Array) && !(obj instanceof Date);
}

export function matchBrace(text: string, i: number, token: string): number {
    let n = 0;
    while (i++ < text.length) {
        if (text[i] === token[1] && --n < 0) {
            return i + 1;
        }
        else if (text[i] === token[0]) {
            n += 1;
        }
    }
    return -1;
}

export function removeDOMRefs(obj: unknown): unknown {
    if (obj instanceof Array) {
        return obj.map(item => removeDOMRefs(item));
    }
    else if (isObject(obj) && typeof (obj as {}).hasOwnProperty === "function" && (obj as {}).hasOwnProperty("value")) {
        return removeDOMRefs((obj as { value: unknown }).value);
    }
    else if (isObject(obj)) {
        const source = obj as Record<string, unknown>;
        const target = {} as Record<string, unknown>;
        for (const key of Object.keys(obj as {})) {
            if (isObject(source[key]) && typeof (source[key] as {}).hasOwnProperty === "function" && (source[key] as {}).hasOwnProperty("value")) {
                target[key] = removeDOMRefs((source[key] as { value: unknown }).value); // unwrap value
            }
            else {
                target[key] = removeDOMRefs(source![key]);
            }
        }
        return target;
    }
    else {
        return obj;
    }
}

export async function runScript(script: unknown): Promise<syphonx.ExtractResult> {
    return new Promise<syphonx.ExtractResult>((resolve, reject) => {
        if (typeof chrome === "object" && chrome.devtools) {
            const message = {
                key: "submit",
                script,
                tabId: chrome.devtools.inspectedWindow.tabId
            };
            chrome.runtime.sendMessage(message, response => {
                if (response) {
                    resolve(response.result);
                }
            });    
        }
        else {
            resolve({ data: { title: "Example Domain", href: "https://www.example.com/" }} as syphonx.ExtractResult);
        }
    });
}

export function tryParseJSON(text: string): unknown {
    try {
        return JSON.parse(text);
    }
    catch (err) {
        return undefined;
    }
}
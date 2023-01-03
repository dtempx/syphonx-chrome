import * as syphonx from "syphonx-lib";

export const active = typeof chrome === "object" && chrome.devtools;

export async function applyTemplate(template: syphonx.Template): Promise<syphonx.ExtractResult | undefined> {
    const result = await sendMessage<syphonx.ExtractResult>("applyTemplate", template);
    return result;
}

export async function disableTracking(): Promise<void> {
    await sendMessage("disableTracking");
}

export async function enableTracking(): Promise<void> {
    await sendMessage("enableTracking");
}

export function log(message: string) {
    if (active)
        chrome.runtime.sendMessage({ log: message });
    else
        console.log("BACKGROUND", message);
}

export async function queryTracking(): Promise<string[]> {
    const result = await sendMessage<string[]>("queryTracking");
    return result || [];
}

export async function selectElements(selectors: string[]): Promise<Array<string | null>> {
    const result = await sendMessage<Array<string | null>>("selectElements", selectors);
    return result || [];
}

function sendMessage<T = unknown>(key: string, ...params: unknown[]): Promise<T | undefined> {
    return new Promise<T | undefined>((resolve, reject) => {
        if (active) {
            const tabId = chrome.devtools.inspectedWindow.tabId;
            chrome.runtime.sendMessage(
                { key, params, tabId },
                response => {
                    if (response?.error) {
                        reject(response.error);
                    }
                    else {
                        resolve(response?.result);
                    }
                });
        }
        else {
            console.log("BACKGROUND", key, ...params);
            resolve(undefined);
        }
    });
}
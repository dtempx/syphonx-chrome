import * as syphonx from "syphonx-lib";

export const active = typeof chrome === "object" && chrome.devtools;

export async function highlightElements(selector: string): Promise<void> {
    await executeScript("highlightElements", selector);
}

export async function applyTemplate(template: syphonx.Template): Promise<syphonx.ExtractResult> {
    const result = await executeScript<syphonx.ExtractResult>("applyTemplate", template);
    return result;
}

export function log(message: string) {
    chrome.runtime.sendMessage({ log: message });
}

function executeScript<T = unknown>(key: string, ...params: unknown[]): Promise<T> {
    if (!active)
        throw new Error("Cannot execute script, not running in Chrome devtools");
    return new Promise<T>((resolve, reject) => {
        const tabId = chrome.devtools.inspectedWindow.tabId;
        chrome.runtime.sendMessage(
            { key, params, tabId },
            response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(response.result);
                }
            });    
    });
}
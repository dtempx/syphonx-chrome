import * as syphonx from "syphonx-lib";

import {
    QueryTrackingOptions,
    SelectElementsOptions,
    SliceHtmlOptions
} from "./service_worker_scripts"

export const active = typeof chrome === "object" && chrome.devtools;

export async function applyTemplate(template: syphonx.Template): Promise<syphonx.ExtractResult | undefined> {
    const { result } = await sendMessage<{ result: syphonx.ExtractResult }>("applyTemplate", template);
    return result;
}

export async function disableTracking(): Promise<void> {
    await sendMessage("disableTracking");
}

export async function enableTracking(): Promise<void> {
    await sendMessage("enableTracking");
}

export function log(message: string): void {
    if (active)
        chrome.runtime.sendMessage({ log: message });
    else
        console.log("BACKGROUND", message);
}

export async function queryTracking(options: QueryTrackingOptions): Promise<string[]> {
    const { result } = await sendMessage<{ result: string[] }>("queryTracking", options);
    return result || [];
}

export async function selectElements(options: SelectElementsOptions): Promise<Array<string | null>> {
    const { result } = await sendMessage<{ result: Array<string | null> }>("selectElements", options);
    return result || [];
}

export async function sliceHtml(options: SliceHtmlOptions): Promise<string> {
    const { result } = await sendMessage<{ result: string }>("sliceHtml", options);
    return result;
}

function sendMessage<T = unknown>(key: string, ...params: unknown[]): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        const tabId = chrome.devtools.inspectedWindow.tabId;
        chrome.runtime.sendMessage(
            { key, params, tabId },
            response => {
                if (response?.error) {
                    reject(response.error);
                }
                else {
                    resolve(response);
                }
            }
        );
    });
}

export namespace inspectedWindow {
    export async function activeTab(): Promise<Partial<chrome.tabs.Tab>> {
        const { tab } = await sendMessage<{ tab: chrome.tabs.Tab }>("tab");
        return tab;
    }

    export async function navigate(url: string): Promise<void> {
        await sendMessage("navigate", url);
    }

    export async function reload(): Promise<void> {
        await sendMessage("reload");
    }
}

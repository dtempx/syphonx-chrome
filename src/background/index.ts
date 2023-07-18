import * as syphonx from "syphonx-lib";

import {
    QueryTrackingOptions,
    SelectElementsOptions,
    SliceHtmlOptions
} from "./page-scripts"

export const active = typeof chrome === "object" && chrome.devtools;

export async function applyTemplate(template: syphonx.Template & { debug?: boolean }): Promise<syphonx.ExtractResult | undefined> {
    const { result } = await sendBackgroundMessage<{ result: syphonx.ExtractResult }>("applyTemplate", template);
    return result;
}

export async function disableTracking(): Promise<void> {
    await sendBackgroundMessage("disableTracking");
}

export async function enableTracking(): Promise<void> {
    await sendBackgroundMessage("enableTracking");
}

export function log(message: string): void {
    if (active)
        chrome.runtime.sendMessage({ log: message });
    else
        console.log("BACKGROUND", message);
}

export async function queryTracking(options: QueryTrackingOptions): Promise<string[]> {
    const { result } = await sendBackgroundMessage<{ result: string[] }>("queryTracking", options);
    return result || [];
}

export async function selectElements(options: SelectElementsOptions): Promise<Array<string | null>> {
    const { result } = await sendBackgroundMessage<{ result: Array<string | null> }>("selectElements", options);
    return result || [];
}

export async function sliceHtml(options: SliceHtmlOptions): Promise<string> {
    const { result } = await sendBackgroundMessage<{ result: string }>("sliceHtml", options);
    return result;
}

export function sendBackgroundMessage<T = unknown>(key: string, ...params: unknown[]): Promise<T> {
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

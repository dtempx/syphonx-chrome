export async function disableTracking(): Promise<void> {
    await sendBackgroundMessage("disableTracking");
}

export async function enableTracking(): Promise<void> {
    await sendBackgroundMessage("enableTracking");
}

export async function navigated(url: string, tracking: boolean): Promise<void> {
    await sendBackgroundMessage("navigated", url, tracking);
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

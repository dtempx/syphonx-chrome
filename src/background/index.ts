export async function disableTracking(): Promise<void> {
    await sendBackgroundMessage("disableTracking");
}

export async function enableTracking(): Promise<void> {
    await sendBackgroundMessage("enableTracking");
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

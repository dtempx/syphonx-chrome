import { sendBackgroundMessage } from "../../background";

export async function activeTab(): Promise<Partial<chrome.tabs.Tab>> {
    const { tab } = await sendBackgroundMessage<{ tab: chrome.tabs.Tab }>("tab");
    return tab;
}

export function evaluate<T = any>(expression: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        chrome.devtools.inspectedWindow.eval(expression, (result, err) => {
            if (err)
                reject(err);
            else
                resolve(result as T);
        });
    });
}

export async function navigate(url: string): Promise<void> {
    await sendBackgroundMessage("navigate", url);
}

export async function reload(): Promise<void> {
    await sendBackgroundMessage("reload");
}

export async function url(): Promise<string> {
    const tab = await activeTab();
    return tab.url || "";
}

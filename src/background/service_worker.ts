import * as scripts from "./page-scripts";

/**
 * Executes a function in the context of the page corresponding to a tabId.
 * 
 * @param tabId Specifies the tab in which to execute the function.
 * @param func A reference to a function to execute in the context of the page.
 * @param args Optional arguments to pass to the function.
 * @returns The result returned by the function. If the resulting value of the function execution is a promise, Chrome will wait for the promise to settle and return the resulting value. {@link https://developer.chrome.com/docs/extensions/reference/scripting/#promises}
 * @see {@link https://developer.chrome.com/docs/extensions/reference/scripting/#runtime-functions}
 */
function executeScript<T = unknown>(tabId: number, func: () => void, ...args: any): Promise<T | void> {
    return new Promise(resolve =>
        chrome.scripting.executeScript(
            { target: { tabId }, func, args },
            results => {
                // The results of executing JavaScript are passed to the extension. A single result is included per-frame. The main frame is guaranteed to be the first index in the resulting array; all other frames are in a non-deterministic order.
                if (results instanceof Array && results.length > 0)
                    resolve(results[0].result); // only take the first frame result for now
                else if (chrome.runtime.lastError) // avoids error "Unchecked runtime.lastError: Exactly one of 'func' and 'files' must be specified"
                    console.warn(chrome.runtime.lastError.message); // https://stackoverflow.com/questions/28431505/unchecked-runtime-lasterror-when-using-chrome-api
                else
                    resolve();
            }
        )
    );
}

/**
 * Executes a script in the context of the page corresponding to a tabId.
 * Also used to inject a library such as jQuery so it can be called subsequently.
 * 
 * @param tabId Specifies the tab in which to execute the script.
 * @param file A file containing the script to execute in the context of the page.
 * @returns The result returned by executing the script.
 * @see {@link https://developer.chrome.com/docs/extensions/reference/scripting/#runtime-functions}
 */
function executeScriptFile<T = unknown>(tabId: number, file: string): Promise<T> {
    return new Promise((resolve, reject) =>
        chrome.scripting.executeScript(
            { target: { tabId }, files: [file] },
            results => {
                // The results of executing JavaScript are passed to the extension. A single result is included per-frame. The main frame is guaranteed to be the first index in the resulting array; all other frames are in a non-deterministic order.
                if (results instanceof Array && results.length > 0)
                    resolve(results[0].result); // only take the first frame result for now
                else if (chrome.runtime.lastError) // avoids error "Unchecked runtime.lastError: Exactly one of 'func' and 'files' must be specified"
                    console.warn(chrome.runtime.lastError.message); // https://stackoverflow.com/questions/28431505/unchecked-runtime-lasterror-when-using-chrome-api
                else
                    reject({ message: `Failed to execute script file ${file}` });
            }
        )
    );
}

declare global {
    interface Window {
        syphonx: unknown;
    }
}

async function injectAll(tabId: number, tracking: boolean): Promise<void> {
    const injected = await executeScript<boolean>(tabId, () => typeof window.syphonx === "object");
    if (!injected) {
        await executeScript(tabId, () => (window as {syphonx: {}}).syphonx = {}); // set inclusion guard
        if (tracking)
            await executeScript(tabId, scripts.enableTracking);
        await chrome.scripting.insertCSS({ target: { tabId }, files: ["syphonx.css"] });
        console.log(`BACKGROUND css injected, tracking=${tracking ? "enabled" : "disabled"}, tabId=${tabId}`);
    }
}

function waitForNavigation(): Promise<void> {
    return new Promise<void>(resolve => {
        function onCompleted({ frameId }: chrome.webNavigation.WebNavigationFramedCallbackDetails) {
            if (frameId === 0) {
                chrome.webNavigation.onCompleted.removeListener(onCompleted);
                resolve();
            }
        }
        chrome.webNavigation.onCompleted.addListener(onCompleted);
    });
}

// This method listens for updates to tabs.
// It is triggered every time a tab is updated, which can be caused by various events such as loading a page, changing the URL, the tab reloading, etc.
// The listener receives the tabId, an object containing details about the change (changeInfo), and an object with info about the tab (tabInfo).
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.active) {
        // forward messages from the DOM window into the chrome runtime
        await executeScript(tabId, () => {
            window.addEventListener("message", event => {
                if (event.source === window && event.data.direction === "syphonx")
                    chrome.runtime.sendMessage({ syphonx: (event as any).data.message });
            });
        });
    }
});

// This method listens for messages that are sent from either content scripts or other parts of your extension (like a popup script or background script).
// It's primarily used for inter-component communication within your extension.
// This could include sending data between your background and content scripts, triggering specific actions in response to certain messages, etc.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.log) {
        console.log("MESSAGE", message.log);
        return false; // immediate synchronous response
    }

    if (message.click) {
        console.log("MESSAGE", "click", { message, sender });
        return false; // immediate synchronous response
    }

    if (message.syphonx) {
        console.log("MESSAGE", "syphonx", { message, sender });
        return false; // immediate synchronous response
    }

    if (typeof message.tabId !== "number") {
        console.warn("MESSAGE", message.key, { message, sender, error: `Property "tabId" is invalid: "${message.tabId}"` });
        return false; // immediate synchronous response
    }

    const tabId = message.tabId as number;
    if (message.key === "navigate") {
        const [url] = message.params;
        console.log("MESSAGE", message.key, url, { message, sender });
        (async () => {
            await chrome.tabs.update(tabId, { url });
            await waitForNavigation();
            sendResponse();
        })();
        return true; // response will be sent asynchronously
    }
    else if (message.key === "reload") {
        console.log("MESSAGE", message.key, { message, sender });
        (async () => {
            const tab = await chrome.tabs.get(tabId);
            if (tab.active && tab.url) {
                await chrome.tabs.reload(tabId);
                await waitForNavigation();
            }
            sendResponse();
        })();
        return true; // response will be sent asynchronously
    }
    else if (message.key === "goback") {
        console.log("MESSAGE", message.key, { message, sender });
        (async () => {
            const tab = await chrome.tabs.get(tabId);
            if (tab.active && tab.url) {
                await chrome.tabs.goBack(tabId);
                await waitForNavigation();
            }
            sendResponse();
        })();
        return true; // response will be sent asynchronously
    }
    else if (message.key === "tab") {
        (async () => {
            const tab = await chrome.tabs.get(tabId);
            sendResponse({ tab });
            console.log("MESSAGE", message.key, { message, sender, tab });
        })();
        return true; // response will be sent asynchronously
    }
    else if (message.key === "navigated") {
        const [url, tracking] = message.params;
        console.log("MESSAGE", message.key, `${url} (tracking ${tracking ? "enabled" : "disabled"})`, { message, sender });
        (async () => {
            await injectAll(tabId, tracking);
            sendResponse();
        })();
        return true; // response will be sent asynchronously
    }
    else if (!Object.keys(scripts).includes(message.key)) {
        console.warn("MESSAGE", { message, sender, error: `Property "key" is invalid: "${message.key}"` });
        return false; // immediate synchronous response
    }

    (async () => {
        try {
            const script = (scripts as unknown as Record<string, () => void>)[message.key];
            const result = await executeScript(message.tabId, script, ...message.params);
            //const result = await executeScript(message.tabId, scripts[message.key] as () => void, ...message.params);
            console.log("MESSAGE", message.key, { message, sender, result });
            sendResponse({ result });
        }
        catch (error) {
            console.error("MESSAGE", message.key, { message, sender, error });
            sendResponse({ error });
        }
    })();

    return true; // response will be sent asynchronously
});

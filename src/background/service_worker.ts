import {
    applyTemplate,
    disableTracking,
    enableTracking,
    selectElements,
    sliceHtml
} from "./service_worker_scripts";

const scriptMap: Record<string, Function> = {
    "applyTemplate": applyTemplate,
    "disableTracking": disableTracking,
    "enableTracking": enableTracking,
    "selectElements": selectElements,
    "sliceHtml": sliceHtml
};

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

async function injectAll(tabId: number): Promise<void> {
    const injected = await executeScript<boolean>(tabId, () => typeof window.syphonx === "object");
    if (!injected) {
        await executeScriptFile(tabId, "jquery.slim.js");
        await executeScriptFile(tabId, "syphonx.js");
        await chrome.scripting.insertCSS({ target: { tabId }, files: ["sx.css"] });
        console.log(`BACKGROUND sx injected tabId=${tabId}`);
    }
}

function waitForNavigation(): Promise<void> {
    return new Promise<void>(resolve => {
        function onCompleted(details: chrome.webNavigation.WebNavigationFramedCallbackDetails) {
            if (details.frameId === 0) {
                chrome.webNavigation.onCompleted.removeListener(onCompleted);
                resolve();
            }
        }
        chrome.webNavigation.onCompleted.addListener(onCompleted);
    });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.log) {
        console.log("MESSAGE", message.log);
        return false; // immediate synchronous response
    }

    if (message.click) {
        console.log("MESSAGE", "click", { message, sender });
        return false; // immediate synchronous response
    }

    if (typeof message.tabId !== "number") {
        console.warn("MESSAGE", message.key, { message, sender, error: `Property "tabId" is invalid: "${message.tabId}"` });
        return false; // immediate synchronous response
    }

    if (message.key === "navigate") {
        console.log("MESSAGE", message.key, { message, sender });
        (async () => {
            await chrome.tabs.update({ url: message.params[0] });
            await waitForNavigation();
            sendResponse();
        })();
        return true; // response will be sent asynchronously
    }
    else if (message.key === "reload") {
        console.log("MESSAGE", message.key, { message, sender });
        (async () => {
            await chrome.tabs.reload();
            await waitForNavigation();
            sendResponse();
        })();
        return true; // response will be sent asynchronously
    }
    else if (message.key === "tab") {
        (async () => {
            const tab = await chrome.tabs.get(message.tabId);
            sendResponse({ tab });
            console.log("MESSAGE", message.key, { message, sender, tab });
        })();
        return true; // response will be sent asynchronously
    }
    else if (!Object.keys(scriptMap).includes(message.key)) {
        console.warn("MESSAGE", { message, sender, error: `Property "key" is invalid: "${message.key}"` });
        return false; // immediate synchronous response
    }

    (async () => {
        try {
            await injectAll(message.tabId);
            const result = await executeScript(message.tabId, scriptMap[message.key] as () => void, ...message.params);
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

console.log("BACKGROUND ready");
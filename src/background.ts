import * as scripts from "./scripts";

const scriptMap: Record<string, Function> = {
    "applyTemplate": scripts.applyTemplate,
    "disableTracking": scripts.disableTracking,
    "enableTracking": scripts.enableTracking,
    "queryTracking": scripts.queryTracking,
    "selectElements": scripts.selectElements,
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
function executeScript<T = unknown>(tabId: number, func: () => void, ...args: any): Promise<T> {
    return new Promise((resolve, reject) =>
        chrome.scripting.executeScript(
            { target: { tabId }, func, args },
            results =>
                results.length > 0 ? resolve(results[0].result) : reject({ message: `Failed to execute script` })
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
            results =>
                results.length > 0 ? resolve(results[0].result) : reject({ message: `Failed to execute script file ${file}` })
        )
    );
}

async function injectAll(tabId: number): Promise<void> {
    const injected = await executeScript<boolean>(tabId, () => typeof window.syphonx === "object");
    if (!injected) {
        await executeScriptFile(tabId, "jquery.slim.js");
        await executeScriptFile(tabId, "syphonx.js");
        await executeScriptFile(tabId, "syphonx.dictionary.js");
        await chrome.scripting.insertCSS({ target: { tabId }, files: ["sx.css"] });
        console.log(`BACKGROUND sx injected tabId=${tabId}`);
    }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.log) {
        console.log("MESSAGE", message.log);
        return false;
    }

    if (!Object.keys(scriptMap).includes(message.key)) {
        console.warn("MESSAGE", { message, sender, error: `Property "key" is invalid: "${message.key}"` });
        return false;
    }

    if (typeof message.tabId !== "number") {
        console.warn("MESSAGE", message.key, { message, sender, error: `Property "tabId" is invalid: "${message.tabId}"` });
        return false;
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

/*
chrome.runtime.onConnect.addListener(port => {
    port.onMessage.addListener(onDevToolsMessage);
    port.onDisconnect.addListener(() => port.onMessage.removeListener(onDevToolsMessage));
});

function onDevToolsMessage(message: any, port: chrome.runtime.Port): boolean {
    if (message.log) {
        console.log("DEVTOOLS", message.log);
        return false;
    }
    else if (message.key === "load" && typeof message.tabId === "number") {
        (async () => {
            try {
                const url = await getTabUrl(message.tabId);
                console.log("DEVTOOLS", { message }, url);
            }
            catch (error) {
                console.error("DEVTOOLS", { message, error });
            }
        })();
        return true; // response will be sent asynchronously
    }
    else {
        console.warn("DEVTOOLS UNKNOWN MESSAGE", { message });
        return false;
    }
}
*/
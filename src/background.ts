import * as syphonx from "syphonx-lib";
import * as functions from "./functions";

const scripts: Record<string, Function> = {
    "applyTemplate": syphonx.extract,
    "highlightElements": functions.highlightElements
};

async function onDevToolsMessage(message: any, port: chrome.runtime.Port) {
    console.log("DEVTOOLS", { message });
    if (message.key === "load" && typeof message.tabId === "number") {
        const file = "jquery.slim.js";
        await executeScriptFile(message.tabId, file);
        console.log(`DEVTOOLS injected ${file}`);
    }
}

function executeScript(tabId: number, func: () => void, ...args: any): Promise<unknown> {
    return new Promise((resolve, reject) =>
        chrome.scripting.executeScript(
            { target: { tabId }, func, args },
            results =>
                results.length > 0 ? resolve(results[0].result) : reject({ message: `Failed to execute script` })
        )
    );
}

function executeScriptFile(tabId: number, file: string): Promise<unknown> {
    return new Promise((resolve, reject) =>
        chrome.scripting.executeScript(
            { target: { tabId }, files: [file] },
            results =>
                results.length > 0 ? resolve(results[0].result) : reject({ message: `Failed to execute script file ${file}` })
        )
    );
}

chrome.runtime.onConnect.addListener(port => {
    port.onMessage.addListener(onDevToolsMessage);
    port.onDisconnect.addListener(() => port.onMessage.removeListener(onDevToolsMessage));
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (!Object.keys(scripts).includes(message.key)) {
        console.warn("MESSAGE", { message, error: `Property "key" is invalid: "${message.key}"` });
        return false;
    }

    if (typeof message.tabId !== "number") {
        console.warn("MESSAGE", message.key, { message, error: `Property "tabId" is invalid: "${message.tabId}"` });
        return false;
    }

    executeScript(message.tabId, scripts[message.key] as () => void, message.params)
        .then(result => {
            console.log("MESSAGE", message.key, { message, result });
            sendResponse({ result });
        })
        .catch(error => {
            console.warn("MESSAGE", message.key, { message, error });
            sendResponse({ error });
        });

    return true;
});

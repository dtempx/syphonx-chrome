async function onDevToolsMessage(message: any, port: chrome.runtime.Port) {
    console.log("DEVTOOLS MESSAGE", message, port);
    if (message.key === "load") {
        const file = "jquery.js";
        await executeScriptFile(message.tabId, file);
        console.log(`injected ${file}`);
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
    console.log("MESSAGE", message);
    if (message.key === "submit") {
        const { selector, script } = message;
        executeScript(message.tabId, syphonx.extract, script)
            .then(result => {
                sendResponse({ status: "OK", result });
            });
        return true;
        /*
        sendResponse({
            status: "OK",
            result: `*** ${selector} ***`
        });
        return false;
        */
    }
    else {
        return false;
    }
});

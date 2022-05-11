(function () {
    const tabId = chrome.devtools.inspectedWindow.tabId;
    const elements = {
        script: document.getElementById("script") as HTMLTextAreaElement,
        status: document.getElementById("status") as HTMLElement,
        output: document.getElementById("output") as HTMLElement
    };
    
    document.getElementById("submit")!.addEventListener("click", () => {
        const script = tryParseJSON(elements.script.value);
        if (script) {
            const message = {
                key: "submit",
                script,
                selector: "h1",
                tabId
            };
            chrome.runtime.sendMessage(message, response => {
                elements.status.innerText = response.status;
                elements.output.innerText = response.result;
            });
            elements.status.innerText = "EXECUTING";
        }
        else {
            elements.output.innerText = "INVALID";
        }
    });    
})();

function tryParseJSON(text: string): unknown {
    try {
        return JSON.parse(text);
    }
    catch (err) {
        return undefined;
    }
}
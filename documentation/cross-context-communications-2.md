# Establish communication between webpage and chrome extension contexts

This method demonstrates how to run a script in the context of a web page being inspected by a Chrome extension's DevTools, and then pass the result of that script back to the extension. This is achieved by using the window.postMessage() API to send the result as a message from the web page to the extension, where it is received and used to update the extension's state.

The function below is used to inject JavaScript code into the web page loaded in the tab. The function it contains adds an event listener for messages to the DOM window. When a message is received, it checks if the message was sent from the DOM window itself (i.e., it is not a message forwarded from somewhere else), and if the message has the direction of "syphonx". If both conditions are met, it sends the message to the Chrome extension's runtime using chrome.runtime.sendMessage(), allowing it to be received by a listener in the extension.

`src/background/service_worker.ts`
```js
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.active) {
        // forward messages from the DOM window into the chrome runtime
        await executeScript(tabId, () => {
            window.addEventListener("message", event => {
                if (event.source === window && event.data.direction === "syphonx") {
                    chrome.runtime.sendMessage({
                        syphonx: (event as any).data.message
                    });
                }
            });
        });
    }
});
```

A useEffect hook is used to setup an event listener. The event listener is listening for messages sent from the runtime, such as those forwarded from the DOM window in the previous snippet. It removes this listener when the component unmounts. When a message is received and has the syphonx property, the message's contents are used to update the state using setExtract().

`src/panel/TemplateEditor/context/DataContext.tsx`
```js
useEffect(() => {
    // message is sent from the content script that forwards the message from the DOM window
    chrome.runtime.onMessage.addListener(listener);
    return () => chrome.runtime.onMessage.removeListener(listener);

    function listener(message: any): void {
        if (message.syphonx)
            setExtract(message.syphonx);
    }
}, []);
```

The third code snippet is creating a script as a string. This script is designed to be executed in the inspected window's context, where it produces a result and posts a message to the window with the direction "syphonx". This message is what the event listener set up in the first code snippet is listening for.

```js
const script = `(async () => {
    const result = await ${syphonx.script}(${JSON.stringify({ ...template.obj, url, debug: true })})
    window.postMessage({ direction: "syphonx", message: result });
})()`;

await inspectedWindow.evaluate(script);
```
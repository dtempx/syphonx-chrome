# Establish communication between webpage and chrome extension contexts

This method demonstrates a way to capture click event details in a webpage and forward them to the Chrome extension using chrome.runtime.sendMessage(). These event details are then used to update the state within a React component in the Chrome extension.

This is used to send a message from the page script to the extension's background script. The message being sent contains details about a click event that has occurred on the webpage. This could be part of a click event listener that sends a message every time a click occurs.

`src/background/page-scripts/tracking.ts`
```js
chrome.runtime.sendMessage({
    click: {
        altKey: event.altKey,
        button: event.button,
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,
        x: event.x,
        y: event.y
    }
});
```

This is adding an event listener that listens for messages sent from the runtime. When a message is received, it uses setClick() to update the click state with the click event data contained in the message.

`src/panel/TemplateEditor/context/PageContext.tsx`
```js
const [click, setClick] = useState<Click | undefined>(); 

chrome.runtime.onMessage.addListener(message => {
    setClick(message.click);
});
```



# Links
* [Material UI Documentation](https://v4.mui.com/)
* [Chrome Extending DevTools](https://developer.chrome.com/docs/extensions/mv3/devtools/)
* [Building a Chrome Extension with TypeScript (starter overview)](https://www.youtube.com/watch?v=01vp9cYbQus)

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

## Add jQuery to any page
```js
(() => {
    const script = document.createElement('script');
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.slim.min.js';
    document.getElementsByTagName('head')[0].appendChild(script);
    //jQuery.noConflict();
})();
```

## Add SyphonX to any page
1. Hit F12 from the active tab to open devtools and goto Console
2. Copy/paste contents of `dist/syphonx.js` file to devtools console
3. Paste the code below to run a SyphonX query
```js
await window.syphonx.extract({actions:[{select:[{name:"title",query:[["h1"]]}]}]})
```

## Run SyphonX query manually within the page context
1. Hit F12 from the active tab to open devtools and goto Console
2. Change the Console window context from `top` to `SyphonX`
3. Paste the code below to run a SyphonX query
```js
await window.syphonx.extract({actions:[{select:[{name:"title",query:[["h1"]]}]}]})
```

## Debug SyphonX within the page context
1. Hit F12 from the active tab to open devtools and goto Sources
2. Change the Sources window context from `Page` to `Content scripts`
3. Expand the `SyphonX` node and select `syphonx.js`
4. Set a breakpoint anywhere in the code

## Debug background
1. Goto chrome://extensions
2. Click the `service worker` to open devtools window
3. Select the `Sources` window
4. Set a breakpoint anywhere in the code

## Debug panel
TODO


## Misc


How to get the Selected elements in Chrome Panel? [Chrome Extension Development] [XPath Selenium]
https://www.youtube.com/watch?v=tFpU95kMJ7U&list=PL699Xf-_ilW7aQ6lBWXjaIheZsduOpcR5&index=10

```js
chrome.devtools.panels.elements.createSidebarPane("LetXPath", panel => {
    chrome.devtools.panels.elements.onSelectionChanged.addListener(() => {
        panel.setExpression(`$0.attributes`);
    });
});
```

Build XPath Form Selected Node | Chrome Extension Development | XPath Selenium | LetCode
https://www.youtube.com/watch?v=EuGxrTCj5Ac&list=PL699Xf-_ilW7aQ6lBWXjaIheZsduOpcR5&index=12

* https://developer.chrome.com/docs/extensions/mv3/getstarted/
* https://developer.chrome.com/docs/extensions/mv3/devtools/

```
npx parcel build --no-source-maps --no-optimize --no-content-hash src/panel/panel.html
npx parcel build --no-source-maps --no-optimize --no-content-hash src/devtools.html
npx parcel build --no-source-maps --no-optimize src/background.ts
npx http-server dist -c-1 -o
```


https://v4.mui.com/

https://developer.chrome.com/docs/extensions/mv3/devtools/

Building a Chrome Extension with TypeScript (starter overview)
https://www.youtube.com/watch?v=01vp9cYbQus



How to get the Selected elements in Chrome Panel? [Chrome Extension Development] [XPath Selenium]
https://www.youtube.com/watch?v=tFpU95kMJ7U&list=PL699Xf-_ilW7aQ6lBWXjaIheZsduOpcR5&index=10

chrome.devtools.panels.elements.createSidebarPane("LetXPath", panel => {
    chrome.devtools.panels.elements.onSelectionChanged.addListener(() => {
        panel.setExpression(`$0.attributes`);
    });
});


Build XPath Form Selected Node | Chrome Extension Development | XPath Selenium | LetCode
https://www.youtube.com/watch?v=EuGxrTCj5Ac&list=PL699Xf-_ilW7aQ6lBWXjaIheZsduOpcR5&index=12




* https://developer.chrome.com/docs/extensions/mv3/getstarted/
* https://developer.chrome.com/docs/extensions/mv3/devtools/

const $c5c3beb62a6d2af0$var$background = chrome.runtime.connect({
    name: "devtools"
});
$c5c3beb62a6d2af0$var$background.onMessage.addListener((message)=>{
// handle reponse from background page
});
$c5c3beb62a6d2af0$var$background.postMessage({
    key: "load",
    tabId: chrome.devtools.inspectedWindow.tabId
});
// https://developer.chrome.com/docs/extensions/reference/devtools_panels/#method-create
chrome.devtools.panels.create("SyphonX", "icon16.png", "panel.html", (panel)=>{
    console.log("panel created");
});
chrome.devtools.panels.elements.createSidebarPane("SyphonX", (sidebar)=>{
    sidebar.setObject({
        some_data: "Some data to show"
    });
});



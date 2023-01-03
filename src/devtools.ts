const background = chrome.runtime.connect({ name: "devtools" });

background.onMessage.addListener(message => {
    // handle reponse from background page
});

if (chrome.devtools.inspectedWindow.tabId)
    background.postMessage({
        key: "load",
        tabId: chrome.devtools.inspectedWindow.tabId
    });

// https://developer.chrome.com/docs/extensions/reference/devtools_panels/#method-create
chrome.devtools.panels.create("SyphonX", "icon16.png", "panel.html", panel => {
    console.log("panel created");
});

chrome.devtools.panels.elements.createSidebarPane("SyphonX", sidebar => {
    sidebar.setObject({ some_data: "Some data to show" });
});

chrome.devtools.network.onNavigated.addListener(url => {
    background.postMessage({ log: `Navigated to ${url} tabId=${chrome.devtools.inspectedWindow.tabId}`});
});
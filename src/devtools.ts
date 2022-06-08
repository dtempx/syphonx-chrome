const background = chrome.runtime.connect({ name: "devtools" });

background.onMessage.addListener(message => {
    // handle reponse from background page
});

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

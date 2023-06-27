import { background } from "../lib";

export function addListeners() {
    // watch for a new tab being created where the url ends with "#syphonx"
    chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
        if (tab.url) {
            const i = tab.url.indexOf("#syphonx");
            if (i > 0) {
                const url = tab.url.substring(0, i);
                await chrome.tabs.remove(tabId);
                await background.inspectedWindow.navigate(url);
            }
        }
    });
}

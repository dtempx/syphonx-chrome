(() => {
async function $12ab43309876626d$export$f78a296632f66e69(template) {
    const result = await syphonx.extract(template);
    return result;
}


function $46d53147699ca8a7$export$f2909722c7f0f932(selectors, limit = 100) {
    document.querySelectorAll(".sx-select").forEach((element)=>element.classList.remove("sx-select"));
    const result = [];
    for (const selector of selectors)if (selector && result.length <= limit) document.querySelectorAll(selector).forEach((element)=>{
        element.classList.add("sx-select");
        result.push(element.textContent);
    });
    return result;
}


function $b2515d1c013cc4bc$export$e684be5f4b22cc14() {
    syphonx.tracking = false;
    document.querySelectorAll(".sx-hover").forEach((element)=>{
        element.classList.remove("sx-hover");
        if (element.classList.length === 0) element.removeAttribute("class");
    });
    document.querySelectorAll(".sx-click").forEach((element)=>{
        element.classList.remove("sx-click");
        if (element.classList.length === 0) element.removeAttribute("class");
    });
}
function $b2515d1c013cc4bc$export$1f8ffc6fd33b1d16() {
    syphonx.tracking = true;
    window.addEventListener("beforeunload", (event)=>{
        if (syphonx.tracking) {
            event.preventDefault();
            event.stopPropagation();
            return "";
        }
    });
    document.addEventListener("mousemove", (event)=>{
        document.querySelectorAll(".sx-hover").forEach((element)=>{
            element.classList.remove("sx-hover");
            if (element.classList.length === 0) element.removeAttribute("class");
        });
        if (syphonx.tracking) {
            if (event.target instanceof HTMLElement) event.target.classList.add("sx-hover");
        }
    });
    document.addEventListener("click", onClick);
    document.addEventListener("auxclick", onClick);
    function onClick(event) {
        document.querySelectorAll(".sx-click").forEach((element)=>{
            element.classList.remove("sx-click");
            if (element.classList.length === 0) element.removeAttribute("class");
        });
        document.querySelectorAll(".sx-hover").forEach((element)=>{
            element.classList.remove("sx-hover");
            if (element.classList.length === 0) element.removeAttribute("class");
        });
        if (syphonx.tracking) {
            if (event.target instanceof HTMLElement) event.target.classList.add("sx-click");
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
    }
}
function $b2515d1c013cc4bc$export$225ea495d1fa0d5() {
    const element1 = document.querySelector(".sx-click");
    if (element1) {
        element1.classList.remove("sx-click");
        if (element1.classList.length === 0) element1.removeAttribute("class");
        return singleSelector(element1);
    } else return [];
    function semantic(name) {
        if (!name) return false;
        name = name.replace(/[^a-z0-9_-]/gi, "") // remove any characters that aren't letters, digits, dashes, or underscores
        .replace(/^[-_]+|[-_]+$/g, "") // trim "-" or "_" from beginning or end of a string
        .replace(/_/g, "-") // replace all "_" with "-"
        .replace(/-{2,}/g, "-") // dedup "-"
        .replace(/([a-z])([A-Z])/g, "$1-$2") // convert from camel-case
        .toLowerCase();
        // reject if any digits are present in the name
        if (/\d/.test(name)) return false;
        // split words by "-" including only word lengths greater than 3 
        const words = name.split("-").filter((word)=>word.length > 3);
        // reject if any word of length greater than 3 is not in the English dictionary
        return words.length > 0 && words.every((word)=>syphonx.dictionary.has(word));
    }
    function singleSelector(element) {
        let open = [];
        const closed = [];
        while(element && element.tagName !== "BODY"){
            const tag = element.tagName.toLowerCase();
            const paths = open.length > 0 ? open : [
                ""
            ];
            const next = [];
            function append(target) {
                for (const path of paths){
                    const selector = path ? `${target} > ${path}` : target;
                    if (document.querySelectorAll(selector).length === 1) closed.push(selector);
                    else if (element.parentElement) {
                        const n = element.parentElement.querySelectorAll(selector).length;
                        if (n === 1) next.push(selector);
                    }
                }
            }
            const id = element.getAttribute("id");
            if (semantic(id)) append(`#${id}`);
            // find class-names that don't start with "sx-" and appear to have semantic meaning
            (element.getAttribute("class") || "").split(" ").filter((className)=>!className.startsWith("sx-") && semantic(className)).forEach((className)=>append(`.${className}`));
            // find attributes with exceptions
            Array.from(element.attributes).filter((attr)=>![
                    "id",
                    "class",
                    "style",
                    "src",
                    "href",
                    "title",
                    "lang"
                ].includes(attr.name)).forEach((attr)=>append(`[${attr.name}${semantic(attr.value) ? `='${attr.value.replace(/'/g, "\\'")}'` : ""}]`));
            for (const path1 of paths){
                let selector = path1 ? `${tag} > ${path1}` : tag;
                if (document.querySelectorAll(selector).length === 1) closed.push(selector);
                if (element.parentElement) {
                    const n = element.parentElement.querySelectorAll(selector).length;
                    if (n > 1) {
                        const i = Array.from(element.parentElement.children).findIndex((child)=>child === element);
                        selector = `${tag}:nth-of-type(${i + 1})${path1 ? ` > ${path1}` : ""}`;
                    }
                    next.push(selector);
                }
            }
            if (next.length === 0) break; // no more open paths so nothing left to do (shouldn't ever happen)
            open = next;
            element = element.parentElement;
        }
        return [
            ...closed,
            ...open
        ].sort((a, b)=>(a.match(/:nth-/g) || []).length - (b.match(/:nth-/g) || []).length || (a.match(/>/g) || []).length - (b.match(/>/g) || []).length || a.length - b.length || a.localeCompare(b));
    }
}




const $07c03eb40a016611$var$scriptMap = {
    "applyTemplate": $12ab43309876626d$export$f78a296632f66e69,
    "disableTracking": $b2515d1c013cc4bc$export$e684be5f4b22cc14,
    "enableTracking": $b2515d1c013cc4bc$export$1f8ffc6fd33b1d16,
    "queryTracking": $b2515d1c013cc4bc$export$225ea495d1fa0d5,
    "selectElements": $46d53147699ca8a7$export$f2909722c7f0f932
};
/**
 * Executes a function in the context of the page corresponding to a tabId.
 * 
 * @param tabId Specifies the tab in which to execute the function.
 * @param func A reference to a function to execute in the context of the page.
 * @param args Optional arguments to pass to the function.
 * @returns The result returned by the function. If the resulting value of the function execution is a promise, Chrome will wait for the promise to settle and return the resulting value. {@link https://developer.chrome.com/docs/extensions/reference/scripting/#promises}
 * @see {@link https://developer.chrome.com/docs/extensions/reference/scripting/#runtime-functions}
 */ function $07c03eb40a016611$var$executeScript(tabId, func, ...args) {
    return new Promise((resolve)=>chrome.scripting.executeScript({
            target: {
                tabId: tabId
            },
            func: func,
            args: args
        }, (results)=>{
            // The results of executing JavaScript are passed to the extension. A single result is included per-frame. The main frame is guaranteed to be the first index in the resulting array; all other frames are in a non-deterministic order.
            if (results instanceof Array && results.length > 0) resolve(results[0].result); // only take the first frame result for now
            else resolve();
        }));
}
/**
 * Executes a script in the context of the page corresponding to a tabId.
 * Also used to inject a library such as jQuery so it can be called subsequently.
 * 
 * @param tabId Specifies the tab in which to execute the script.
 * @param file A file containing the script to execute in the context of the page.
 * @returns The result returned by executing the script.
 * @see {@link https://developer.chrome.com/docs/extensions/reference/scripting/#runtime-functions}
 */ function $07c03eb40a016611$var$executeScriptFile(tabId, file) {
    return new Promise((resolve, reject)=>chrome.scripting.executeScript({
            target: {
                tabId: tabId
            },
            files: [
                file
            ]
        }, (results)=>results.length > 0 ? resolve(results[0].result) : reject({
                message: `Failed to execute script file ${file}`
            })));
}
async function $07c03eb40a016611$var$injectAll(tabId) {
    const injected = await $07c03eb40a016611$var$executeScript(tabId, ()=>typeof window.syphonx === "object");
    if (!injected) {
        await $07c03eb40a016611$var$executeScriptFile(tabId, "jquery.slim.js");
        await $07c03eb40a016611$var$executeScriptFile(tabId, "syphonx.js");
        await $07c03eb40a016611$var$executeScriptFile(tabId, "syphonx.dictionary.js");
        await chrome.scripting.insertCSS({
            target: {
                tabId: tabId
            },
            files: [
                "sx.css"
            ]
        });
        console.log(`BACKGROUND sx injected tabId=${tabId}`);
    }
}
chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    if (message.log) {
        console.log("MESSAGE", message.log);
        return false;
    }
    if (typeof message.tabId !== "number") {
        console.warn("MESSAGE", message.key, {
            message: message,
            sender: sender,
            error: `Property "tabId" is invalid: "${message.tabId}"`
        });
        return false;
    }
    if (message.key === "navigate") {
        console.log("MESSAGE", message.key, {
            message: message,
            sender: sender
        });
        chrome.tabs.update({
            url: message.params[0]
        });
    } else if (!Object.keys($07c03eb40a016611$var$scriptMap).includes(message.key)) {
        console.warn("MESSAGE", {
            message: message,
            sender: sender,
            error: `Property "key" is invalid: "${message.key}"`
        });
        return false;
    }
    (async ()=>{
        try {
            await $07c03eb40a016611$var$injectAll(message.tabId);
            const result = await $07c03eb40a016611$var$executeScript(message.tabId, $07c03eb40a016611$var$scriptMap[message.key], ...message.params);
            console.log("MESSAGE", message.key, {
                message: message,
                sender: sender,
                result: result
            });
            sendResponse({
                result: result
            });
        } catch (error) {
            console.error("MESSAGE", message.key, {
                message: message,
                sender: sender,
                error: error
            });
            sendResponse({
                error: error
            });
        }
    })();
    return true; // response will be sent asynchronously
});

})();
//# sourceMappingURL=background.js.map

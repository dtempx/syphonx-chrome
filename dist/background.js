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


function $1740b9fa11a9f8ad$export$ff5493406baa93c1(upLimit = 3, downLimit = 3) {
    const elements = mark();
    const output = [];
    render(document.documentElement);
    unmark();
    return output.join("\n");
    function mark() {
        const elements = Array.from(document.querySelectorAll(".sx-click"));
        removeAllTrackingClasses();
        for (const element of elements){
            element.setAttribute("marked", "");
            traverseUp(element);
            if (element.parentElement) traverseDown(element.parentElement);
        }
        return elements;
    }
    function removeAllTrackingClasses() {
        removeTrackingClass("sx-click");
        removeTrackingClass("sx-hover");
        removeTrackingClass("sx-select");
    }
    function removeTrackingClass(className) {
        document.querySelectorAll(`.${className}`).forEach((element)=>{
            element.classList.remove(className);
            if (element.classList.length === 0) element.removeAttribute("class");
        });
    }
    function unmark() {
        document.querySelectorAll("[marked]").forEach((element)=>element.removeAttribute("marked"));
    }
    function traverseUp(element, n = 0) {
        if (element.parentElement && n <= upLimit) {
            element.parentElement.setAttribute("marked", "");
            traverseUp(element.parentElement, n + 1);
        }
    }
    function traverseDown(element, level = Infinity, n = 0) {
        if (--level >= 0 && n <= downLimit) for (const child of element.children){
            child.setAttribute("marked", "");
            traverseDown(child, level, n + 1);
        }
    }
    function render(element) {
        const tag = element.tagName.toLowerCase();
        const exclude = [
            "noscript",
            "script",
            "style",
            "svg"
        ];
        const container = ![
            "area",
            "base",
            "br",
            "col",
            "embed",
            "hr",
            "img",
            "input",
            "link",
            "meta",
            "param",
            "source",
            "track",
            "wbr"
        ].includes(tag);
        const attributes = renderAttributes(element.attributes);
        const marked = element.hasAttribute("marked");
        if (elements.includes(element) && marked) output.push(`<!-- SELECT THE FOLLOWING ELEMENT -->`);
        if (!container && marked) output.push(`<${tag}${attributes}>`);
        else if (element.children.length > 0) {
            if (marked) output.push(`<${tag}${attributes}>`);
            const children = Array.from(element.children).filter((child)=>!exclude.includes(child.tagName.toLocaleLowerCase()));
            for (const child of children)render(child);
            if (marked) output.push(`</${tag}>`);
        } else if (element.textContent !== null && element.textContent.trim().length > 0 && marked) {
            const text = truncateText(element.textContent.trim().replace(/\s+/gm, " "));
            output.push(`<${tag}${attributes}>${text}</${tag}>`);
        } else if (marked) output.push(`<${tag}${attributes}></${tag}>`);
        function renderAttributes(attributes) {
            const text = Array.from(element.attributes).filter((attr)=>attr.value && attr.name !== "marked").map((attr)=>`${attr.name}="${attr.value.replace(/"/g, '"')}"`).join(" ");
            return text ? " " + text : "";
        }
        function truncateText(text, max = 80) {
            if (text.length > max) {
                const k = Math.floor(max / 2);
                const i = Math.max(text.slice(0, k).lastIndexOf(" "), k);
                const j = Math.max(k - text.slice(-k).indexOf(" "), k);
                text = text.slice(0, i) + " … " + text.slice(-j);
            }
            return text;
        }
    }
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
    if (syphonx.reset) {
        syphonx.reset();
        syphonx.reset = undefined;
    }
}
function $b2515d1c013cc4bc$export$1f8ffc6fd33b1d16() {
    syphonx.tracking = true;
    syphonx.reset = ()=>{
        document.removeEventListener("click", onClick);
        document.removeEventListener("auxclick", onClick);
        document.removeEventListener("contextmenu", onContext);
        document.removeEventListener("mousemove", onMouseMove);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("auxclick", onClick);
    document.addEventListener("contextmenu", onContext);
    document.addEventListener("mousemove", onMouseMove);
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
            if (event.target instanceof HTMLElement) {
                event.target.classList.add("sx-click");
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
            }
            event.preventDefault();
            event.stopPropagation();
        }
    }
    function onContext(event) {
        event.preventDefault();
    }
    function onMouseMove(event) {
        document.querySelectorAll(".sx-hover").forEach((element)=>{
            element.classList.remove("sx-hover");
            if (element.classList.length === 0) element.removeAttribute("class");
        });
        if (syphonx.tracking) {
            if (event.target instanceof HTMLElement) event.target.classList.add("sx-hover");
        }
    }
}




const $07c03eb40a016611$var$scriptMap = {
    "applyTemplate": $12ab43309876626d$export$f78a296632f66e69,
    "disableTracking": $b2515d1c013cc4bc$export$e684be5f4b22cc14,
    "enableTracking": $b2515d1c013cc4bc$export$1f8ffc6fd33b1d16,
    "selectElements": $46d53147699ca8a7$export$f2909722c7f0f932,
    "sliceHtml": $1740b9fa11a9f8ad$export$ff5493406baa93c1
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
            else if (chrome.runtime.lastError) console.warn(chrome.runtime.lastError.message); // https://stackoverflow.com/questions/28431505/unchecked-runtime-lasterror-when-using-chrome-api
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
        }, (results)=>{
            // The results of executing JavaScript are passed to the extension. A single result is included per-frame. The main frame is guaranteed to be the first index in the resulting array; all other frames are in a non-deterministic order.
            if (results instanceof Array && results.length > 0) resolve(results[0].result); // only take the first frame result for now
            else if (chrome.runtime.lastError) console.warn(chrome.runtime.lastError.message); // https://stackoverflow.com/questions/28431505/unchecked-runtime-lasterror-when-using-chrome-api
            else reject({
                message: `Failed to execute script file ${file}`
            });
        }));
}
async function $07c03eb40a016611$var$injectAll(tabId) {
    const injected = await $07c03eb40a016611$var$executeScript(tabId, ()=>typeof window.syphonx === "object");
    if (!injected) {
        await $07c03eb40a016611$var$executeScriptFile(tabId, "jquery.slim.js");
        await $07c03eb40a016611$var$executeScriptFile(tabId, "syphonx.js");
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
function $07c03eb40a016611$var$waitForNavigation() {
    return new Promise((resolve)=>{
        function onCompleted(details) {
            if (details.frameId === 0) {
                chrome.webNavigation.onCompleted.removeListener(onCompleted);
                resolve();
            }
        }
        chrome.webNavigation.onCompleted.addListener(onCompleted);
    });
}
chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    if (message.log) {
        console.log("MESSAGE", message.log);
        return false; // immediate synchronous response
    }
    if (message.click) {
        console.log("MESSAGE", "click", {
            message: message,
            sender: sender
        });
        return false; // immediate synchronous response
    }
    if (typeof message.tabId !== "number") {
        console.warn("MESSAGE", message.key, {
            message: message,
            sender: sender,
            error: `Property "tabId" is invalid: "${message.tabId}"`
        });
        return false; // immediate synchronous response
    }
    if (message.key === "navigate") {
        console.log("MESSAGE", message.key, {
            message: message,
            sender: sender
        });
        (async ()=>{
            await chrome.tabs.update({
                url: message.params[0]
            });
            await $07c03eb40a016611$var$waitForNavigation();
            sendResponse();
        })();
        return true; // response will be sent asynchronously
    } else if (message.key === "reload") {
        console.log("MESSAGE", message.key, {
            message: message,
            sender: sender
        });
        (async ()=>{
            await chrome.tabs.reload();
            await $07c03eb40a016611$var$waitForNavigation();
            sendResponse();
        })();
        return true; // response will be sent asynchronously
    } else if (message.key === "tab") {
        (async ()=>{
            const tab = await chrome.tabs.get(message.tabId);
            sendResponse({
                tab: tab
            });
            console.log("MESSAGE", message.key, {
                message: message,
                sender: sender,
                tab: tab
            });
        })();
        return true; // response will be sent asynchronously
    } else if (!Object.keys($07c03eb40a016611$var$scriptMap).includes(message.key)) {
        console.warn("MESSAGE", {
            message: message,
            sender: sender,
            error: `Property "key" is invalid: "${message.key}"`
        });
        return false; // immediate synchronous response
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
console.log("BACKGROUND ready");

})();
//# sourceMappingURL=background.js.map

(() => {
function $parcel$exportWildcard(dest, source) {
  Object.keys(source).forEach(function(key) {
    if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function get() {
        return source[key];
      }
    });
  });

  return dest;
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $c87da5d7c68b75f5$exports = {};
var $8cdb1712ec29f242$exports = {};

$parcel$export($8cdb1712ec29f242$exports, "queryTracking", () => $8cdb1712ec29f242$export$225ea495d1fa0d5);
function $8cdb1712ec29f242$export$225ea495d1fa0d5({ className: className , nthOfTypeRunLimit: nthOfTypeRunLimit = 3  }) {
    const result = [];
    const targetElement = document.querySelector(`.${className}`);
    if (targetElement) {
        const closed = [];
        let open = [];
        let element = targetElement;
        while(element && element.tagName !== "BODY"){
            const next = new Set();
            const tag = element.tagName.toLowerCase();
            append(tag);
            const id = element.getAttribute("id");
            if (id) append(`#${id}`);
            const classes = element.getAttribute("class") ? element.getAttribute("class").split(" ").filter((name)=>name !== className) // filter out target class name
            .filter((name)=>/^-?[_a-z]+[_a-z0-9-]*$/i.test(name)) // filter out invalid class names
             : [];
            classes.forEach((name)=>append(`.${name}`));
            const attributes = Array.from(element.attributes).filter((attr)=>![
                    "id",
                    "class",
                    "style",
                    "src",
                    "href",
                    "title",
                    "lang"
                ].includes(attr.name)).map((attr)=>({
                    name: attr.name,
                    value: attr.value
                }));
            attributes.forEach((attr)=>append(`[${attr.name}${attr.value ? `='${attr.value.replace(/'/g, "\\'")}'` : ""}]`));
            if (next.size === 0) break; // no more open paths so nothing left to do (shouldn't ever happen)
            open = Array.from(next);
            element = element.parentElement; // climb up the tree
            // adds target to either closed or nextı
            function append(target) {
                const paths = open.length > 0 ? open : [
                    ""
                ];
                for (const path of paths){
                    const selector = path ? `${target} > ${path}` : target;
                    const elements = Array.from(document.querySelectorAll(selector));
                    // if selector is unique within the document and it matches the target element, then we are done
                    if (elements.length === 1 && elements[0].isEqualNode(targetElement)) {
                        // add selector to closed set
                        closed.push(selector);
                        // remove closed path from open set
                        const i = open.indexOf(path);
                        open.splice(i, 1);
                    } else if (element?.parentElement && /^[a-z]+$/.test(target)) {
                        const i = Array.from(element.parentElement.children).filter((child)=>child.tagName.toLowerCase() === target).findIndex((child)=>child.isEqualNode(element));
                        if (i === 0) next.add(`${target}:first-of-type${path ? ` > ${path}` : ""}`);
                        else if (i > 0) next.add(`${target}:nth-of-type(${i + 1})${path ? ` > ${path}` : ""}`);
                    } else if (element?.parentElement) {
                        const elements = element.parentElement.querySelectorAll(selector);
                        if (elements.length === 1 && elements[0].isEqualNode(targetElement)) next.add(selector);
                    }
                }
            }
        }
        // attempt to reduce nth-of-type runs
        const selectors = Array.from(new Set([
            ...closed,
            ...open
        ]));
        for(let i = selectors.length - 1; i >= 0; --i){
            const selector1 = selectors[i];
            if (/ > [a-z]+:(?:first-of-type|nth-of-type\(\d+\)) > /.test(selector1)) {
                const elements1 = document.querySelectorAll(selector1);
                const selector2 = selector1.replace(/( > [a-z]+:(?:first-of-type|nth-of-type\(\d+\)))+ > /g, " ");
                const elements2 = document.querySelectorAll(selector2);
                if (elements1.length === elements2.length && elements1[0].isEqualNode(elements2[0])) selectors.splice(i, 1, selector2);
                else if (selectors.length > 1) {
                    const hits = Array.from(selector1.matchAll(/( > [a-z]+:(?:first-of-type|nth-of-type\(\d+\)))/g));
                    if (hits.length - 1 > nthOfTypeRunLimit) selectors.splice(i, 1); // remove if run length exceeds limit, but don't remove the last selector
                }
            }
        }
        result.push(...Array.from(new Set(selectors)).sort((a, b)=>(a.match(/:nth-/g) || []).length - (b.match(/:nth-/g) || []).length || (a.match(/>/g) || []).length - (b.match(/>/g) || []).length || a.length - b.length || a.localeCompare(b)));
    }
    return result;
}


var $ffe3c7192d2650f5$exports = {};

$parcel$export($ffe3c7192d2650f5$exports, "selectElements", () => $ffe3c7192d2650f5$export$f2909722c7f0f932);
function $ffe3c7192d2650f5$export$f2909722c7f0f932({ selectors: selectors , className: className , limit: limit = 100 , scrollIntoView: scrollIntoView = true  }) {
    document.querySelectorAll(`.${className}`).forEach((element)=>element.classList.remove(className));
    const result = [];
    for (const selector of selectors)if (selector && result.length <= limit) document.querySelectorAll(selector).forEach((element)=>{
        if (scrollIntoView) {
            setTimeout(()=>{
                element.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "center"
                });
            }, 500);
            scrollIntoView = false;
        }
        element.classList.add(className);
        result.push(element.textContent);
    });
    return result;
}


var $1890a324f309be77$exports = {};

$parcel$export($1890a324f309be77$exports, "sliceHtml", () => $1890a324f309be77$export$ff5493406baa93c1);
function $1890a324f309be77$export$ff5493406baa93c1({ selector: selector , up: up = 3 , down: down = 3  }) {
    const elements = mark();
    const output = [];
    render(document.documentElement);
    unmark();
    return output.join("\n");
    function mark() {
        const elements = Array.from(document.querySelectorAll(selector));
        for (const element of elements){
            element.setAttribute("marked", "");
            traverseUp(element);
            if (element.parentElement) traverseDown(element.parentElement);
        }
        return elements;
    }
    function unmark() {
        document.querySelectorAll("[marked]").forEach((element)=>element.removeAttribute("marked"));
    }
    function traverseUp(element, n = 0) {
        if (element.parentElement && n <= up) {
            element.parentElement.setAttribute("marked", "");
            traverseUp(element.parentElement, n + 1);
        }
    }
    function traverseDown(element, level = Infinity, n = 0) {
        if (--level >= 0 && n <= down) for (const child of element.children){
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
        if (elements.includes(element) && marked) output.push(`<!---->`);
        if (!container && marked) output.push(`<${tag}${attributes}>`);
        else if (element.children.length > 0) {
            if (marked) output.push(`<${tag}${attributes}>`);
            const children = Array.from(element.children).filter((child)=>!exclude.includes(child.tagName.toLocaleLowerCase()));
            for (const child of children)render(child);
            if (marked) output.push(`</${tag}>`);
        } else if (element.textContent !== null && element.textContent.trim().length > 0 && marked) {
            const text = trunc(element.textContent.trim().replace(/\s+/gm, " "));
            output.push(`<${tag}${attributes}>${text}</${tag}>`);
        } else if (marked) output.push(`<${tag}${attributes}></${tag}>`);
        function renderAttributes(attributes) {
            const text = Array.from(element.attributes).filter((attr)=>attr.value && attr.name !== "marked" && !attr.name.startsWith("sx-")).map((attr)=>`${attr.name}="${trunc(attr.value.replace(/"/g, '"'))}"`).join(" ");
            return text ? " " + text : "";
        }
        function trunc(text, max = 80) {
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


var $5b2302174baa9f09$exports = {};

$parcel$export($5b2302174baa9f09$exports, "disableTracking", () => $5b2302174baa9f09$export$e684be5f4b22cc14);
$parcel$export($5b2302174baa9f09$exports, "enableTracking", () => $5b2302174baa9f09$export$1f8ffc6fd33b1d16);
function $5b2302174baa9f09$export$e684be5f4b22cc14() {
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
function $5b2302174baa9f09$export$1f8ffc6fd33b1d16() {
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


$parcel$exportWildcard($c87da5d7c68b75f5$exports, $8cdb1712ec29f242$exports);
$parcel$exportWildcard($c87da5d7c68b75f5$exports, $ffe3c7192d2650f5$exports);
$parcel$exportWildcard($c87da5d7c68b75f5$exports, $1890a324f309be77$exports);
$parcel$exportWildcard($c87da5d7c68b75f5$exports, $5b2302174baa9f09$exports);


/**
 * Executes a function in the context of the page corresponding to a tabId.
 * 
 * @param tabId Specifies the tab in which to execute the function.
 * @param func A reference to a function to execute in the context of the page.
 * @param args Optional arguments to pass to the function.
 * @returns The result returned by the function. If the resulting value of the function execution is a promise, Chrome will wait for the promise to settle and return the resulting value. {@link https://developer.chrome.com/docs/extensions/reference/scripting/#promises}
 * @see {@link https://developer.chrome.com/docs/extensions/reference/scripting/#runtime-functions}
 */ function $a84d1809a4222847$var$executeScript(tabId, func, ...args) {
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
 */ function $a84d1809a4222847$var$executeScriptFile(tabId, file) {
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
async function $a84d1809a4222847$var$injectAll(tabId) {
    const injected = await $a84d1809a4222847$var$executeScript(tabId, ()=>typeof window.syphonx === "object");
    if (!injected) {
        //await executeScriptFile(tabId, "jquery.slim.js");
        //await executeScriptFile(tabId, "syphonx.js");
        await $a84d1809a4222847$var$executeScript(tabId, ()=>window.syphonx = {}); // set inclusion guard
        await chrome.scripting.insertCSS({
            target: {
                tabId: tabId
            },
            files: [
                "syphonx.css"
            ]
        });
    //console.log(`BACKGROUND sx injected tabId=${tabId}`);
    }
}
function $a84d1809a4222847$var$waitForNavigation() {
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
// This method listens for updates to tabs.
// It is triggered every time a tab is updated, which can be caused by various events such as loading a page, changing the URL, the tab reloading, etc.
// The listener receives the tabId, an object containing details about the change (changeInfo), and an object with info about the tab (tabInfo).
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab)=>{
    if (changeInfo.status === "complete" && tab.active) // forward messages from the DOM window into the chrome runtime
    await $a84d1809a4222847$var$executeScript(tabId, ()=>{
        window.addEventListener("message", (event)=>{
            if (event.source === window && event.data.direction === "syphonx") chrome.runtime.sendMessage({
                syphonx: event.data.message
            });
        });
        console.log("window.addEventListener");
    });
    console.log("chrome.tabs.onUpdated.addListener");
});
console.log("service_worker");
// This method listens for messages that are sent from either content scripts or other parts of your extension (like a popup script or background script).
// It's primarily used for inter-component communication within your extension.
// This could include sending data between your background and content scripts, triggering specific actions in response to certain messages, etc.
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
    const tabId = message.tabId;
    if (message.key === "navigate") {
        console.log("MESSAGE", message.key, {
            message: message,
            sender: sender
        });
        (async ()=>{
            await chrome.tabs.update(tabId, {
                url: message.params[0]
            });
            await $a84d1809a4222847$var$waitForNavigation();
            sendResponse();
        })();
        return true; // response will be sent asynchronously
    } else if (message.key === "reload") {
        console.log("MESSAGE", message.key, {
            message: message,
            sender: sender
        });
        (async ()=>{
            const tab = await chrome.tabs.get(tabId);
            if (tab.active && tab.url) {
                await chrome.tabs.reload(tabId);
                await $a84d1809a4222847$var$waitForNavigation();
            }
            sendResponse();
        })();
        return true; // response will be sent asynchronously
    } else if (message.key === "goback") {
        console.log("MESSAGE", message.key, {
            message: message,
            sender: sender
        });
        (async ()=>{
            const tab = await chrome.tabs.get(tabId);
            if (tab.active && tab.url) {
                await chrome.tabs.goBack(tabId);
                await $a84d1809a4222847$var$waitForNavigation();
            }
            sendResponse();
        })();
        return true; // response will be sent asynchronously
    } else if (message.key === "tab") {
        (async ()=>{
            const tab = await chrome.tabs.get(tabId);
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
    } else if (!Object.keys($c87da5d7c68b75f5$exports).includes(message.key)) {
        console.warn("MESSAGE", {
            message: message,
            sender: sender,
            error: `Property "key" is invalid: "${message.key}"`
        });
        return false; // immediate synchronous response
    }
    (async ()=>{
        try {
            await $a84d1809a4222847$var$injectAll(message.tabId);
            const script = $c87da5d7c68b75f5$exports[message.key];
            const result = await $a84d1809a4222847$var$executeScript(message.tabId, script, ...message.params);
            //const result = await executeScript(message.tabId, scripts[message.key] as () => void, ...message.params);
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
//# sourceMappingURL=service_worker.js.map

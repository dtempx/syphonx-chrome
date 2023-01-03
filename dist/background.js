(() => {
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
async function $818fa7ea367b0594$export$f9380c9a627682d3(state1) {
    function collapseWhitespace(text, newlines = true) {
        if (typeof text === "string" && text.trim().length === 0) return null;
        else if (typeof text === "string" && newlines) return text.replace(/\s*\n\s*/gm, "\n").replace(/\n{2,}/gm, "\n").replace(/\s{2,}/gm, " ").trim();
        else if (typeof text === "string" && !newlines) return text.replace(/\n/gm, " ").replace(/\s{2,}/gm, " ").trim();
        else return text;
    }
    function coerceValue(value, type) {
        if (type === "string") return typeof value === "string" ? value : typeof value === "number" || typeof value === "boolean" ? value.toString() : null;
        else if (type === "number") return typeof value === "number" ? value : typeof value === "string" ? parseNumber(value) : null;
        else if (type === "boolean") return typeof value === "boolean" ? value : typeof value === "string" ? value.trim().length > 0 : typeof value === "number" && !isNaN(value) ? value !== 0 : null;
        else return null;
    }
    function combineUrl(url, path) {
        if (url && path) return `${rtrim(url, "/")}/${ltrim(path, "/")}`;
        else if (url) return url;
        else if (path) return path;
        else return "";
    }
    function createRegExp(value) {
        if (typeof value === "string" && value.startsWith("/")) {
            const i = value.lastIndexOf("/");
            const pattern = value.substring(1, i);
            const flags = value.length > i ? value.substring(i + 1) : "m";
            return new RegExp(pattern, flags);
        }
    }
    function cut(text, splitter, n, limit) {
        if (typeof text === "string") {
            const a = text.split(splitter, limit).map((value)=>value.trim()).filter((value)=>value.length > 0);
            const i = n >= 0 ? n : a.length + n;
            return i >= 0 && i < a.length ? a[i] : null;
        } else return null;
    }
    function evaluateFormula(expression, args = {}) {
        const keys = Object.keys(args);
        const values = keys.map((key)=>args[key]);
        const fn = new Function(...keys, `return ${expression}`);
        const result = fn(...values);
        return result;
    }
    function formatHTML(value) {
        if (typeof value === "string") return value.replace(/(<[a-z0-9:._-]+>)[ ]*/gi, "$1").replace(/[ ]*<\//g, "</");
        else if (value instanceof Array && value.every((obj)=>typeof obj === "string")) return value.map((obj)=>formatHTML(obj));
        else return value;
    }
    function formatStringValue(value, format, origin) {
        if (format === "href" && typeof value === "string" && origin && !isAbsoluteUrl(value)) return combineUrl(origin, value);
        else if (format === "multiline") return collapseWhitespace(value, true);
        else if (format === "singleline") return collapseWhitespace(value, false);
        else if (format === "none") return value;
        else return value;
    }
    function isAbsoluteUrl(url) {
        return url.startsWith("http://") || url.startsWith("https://");
    }
    function isEmpty(obj) {
        if (obj === undefined || obj === null) return true;
        else if (obj instanceof Array) return obj.length === 0;
        else if (typeof obj === "string") return obj.length === 0;
        else return false;
    }
    function isFormula(value) {
        return typeof value === "string" && value.startsWith("{") && value.endsWith("}");
    }
    function isRegexp(value) {
        return typeof value === "string" && (value.startsWith("/") || value.startsWith("!/"));
    }
    function isInvocableFrom(obj, method) {
        return obj !== null && typeof obj === "object" && typeof obj[method] === "function";
    }
    function isJQueryObject(obj) {
        return typeof obj === "object" && obj !== null && (!!obj.jquery || !!obj.cheerio);
    }
    function isObject(obj) {
        return typeof obj === "object" && obj !== null && !(obj instanceof Array) && !(obj instanceof Date);
    }
    function isNullOrUndefined(obj) {
        return obj === null || obj === undefined;
    }
    function merge(source, target) {
        if (source instanceof Array && target instanceof Array) return [
            ...source,
            ...target
        ];
        else if (isObject(source) && isObject(target)) {
            const obj = {};
            const keys = Array.from(new Set([
                ...Object.keys(source),
                ...Object.keys(target)
            ]));
            for (const key of keys)obj[key] = merge(source[key], target[key]);
            return obj;
        } else if (target) return target;
        else return source;
    }
    function parseNumber(value) {
        if (typeof value === "number") return !isNaN(value) ? value : undefined;
        if (typeof value === "string") {
            let [, text] = /([0-9.,]+)/.exec(value) || [];
            if (/\.\d+$/.test(text)) text = text.replace(/,/g, "");
            if (/,\d+$/.test(text)) text = text.replace(/\./g, "");
            const result = parseFloat(text);
            return !isNaN(result) ? result : undefined;
        }
        return undefined;
    }
    function parseUrl(url) {
        if (/^https?:\/\//.test(url)) {
            const [protocol, , host] = url.split("/");
            const a = host.split(":")[0].split(".").reverse();
            return {
                domain: a.length >= 3 && a[0].length === 2 && a[1].length === 2 ? `${a[2]}.${a[1]}.${a[0]}` : a.length >= 2 ? `${a[1]}.${a[0]}` : undefined,
                origin: protocol && host ? `${protocol}//${host}` : undefined
            };
        }
        return {};
    }
    function regexpExtract(text, regexp, trim = true) {
        if (typeof regexp === "string") {
            regexp = createRegExp(regexp);
            if (!regexp) return null;
        }
        const match = regexp.exec(text);
        const result = match ? match[1] : null;
        if (trim && result) return result.trim();
        else return result;
    }
    function regexpReplace(text, regexp, replace) {
        if (typeof text === "string") return text.replace(regexp, replace);
        else return text;
    }
    function regexpTest(text, pattern) {
        const negate = pattern.startsWith("!");
        if (negate) pattern = pattern.slice(1);
        const regexp = createRegExp(pattern);
        if (!regexp) return null;
        let result = regexp?.test(text);
        if (result === undefined) return null;
        else if (negate) return !result;
        else return result;
    }
    function removeDOMRefs(obj) {
        if (obj instanceof Array) return obj.map((item)=>removeDOMRefs(item));
        else if (isObject(obj) && typeof obj.hasOwnProperty === "function" && obj.hasOwnProperty("value")) return removeDOMRefs(obj.value);
        else if (isObject(obj)) {
            const source = obj;
            const target = {};
            for (const key of Object.keys(obj))if (isObject(source[key]) && typeof source[key].hasOwnProperty === "function" && source[key].hasOwnProperty("value")) target[key] = removeDOMRefs(source[key].value);
            else target[key] = removeDOMRefs(source[key]);
            return target;
        } else return obj;
    }
    function sleep(ms) {
        return new Promise((resolve)=>setTimeout(resolve, ms));
    }
    function trim1(text, pattern = " ") {
        return ltrim(rtrim(text, pattern));
    }
    function ltrim(text, pattern = " ") {
        if (typeof text === "string") {
            if (typeof pattern === "string") while(text.startsWith(pattern))text = text.slice(pattern.length);
            else {
                const hits = pattern.exec(text) || [];
                let hit1 = hits.find((hit)=>text.startsWith(hit));
                while(hit1){
                    text = text.slice(hit1.length);
                    hit1 = hits.find((hit)=>text.startsWith(hit));
                }
            }
        }
        return text;
    }
    function rtrim(text, pattern = " ") {
        if (typeof text === "string") {
            if (typeof pattern === "string") while(text.endsWith(pattern))text = text.slice(0, -1 * pattern.length);
            else {
                const hits = pattern.exec(text) || [];
                let hit4 = hits.find((hit)=>text.endsWith(hit));
                while(hit4){
                    text = text.slice(0, -1 * hit4.length);
                    hit4 = hits.find((hit)=>text.endsWith(hit));
                }
            }
        }
        return text;
    }
    function trunc(obj, max = 80) {
        if (obj) {
            const text = JSON.stringify(obj);
            if (typeof text === "string") return text.length <= max ? text : `${text[0]}${text.slice(1, max)}…${text[text.length - 1]}`;
        }
        return "(empty)";
    }
    function typeName(obj) {
        if (obj === null) return "null";
        else if (obj === undefined) return "undefined";
        else if (typeof obj === "string") return "string";
        else if (typeof obj === "number") return "number";
        else if (obj instanceof Array) return obj.length > 0 ? `Array<${Array.from(new Set(obj.map((value)=>typeName(value)))).join("|")}>` : "[]";
        else if (obj instanceof Date) return "date";
        else if (typeof obj === "object") return "object";
        else return "unknown";
    }
    function $merge(source, target) {
        for (const targetAttr of target[0].attributes){
            const sourceAttr = Array.from(source[0].attributes).find((attr)=>attr.name === targetAttr.name);
            if (sourceAttr && targetAttr.name === "class") {
                const value = Array.from(new Set([
                    ...sourceAttr.value.split(" "),
                    ...targetAttr.value.split(" ")
                ])).join(" ");
                source.attr("class", value);
            } else if (!sourceAttr) source.attr(targetAttr.name, targetAttr.value);
        }
    }
    function $scrollToBottom(delay = 100, max = 100) {
        let n = 0;
        return new Promise((resolve)=>{
            const timer = setInterval(()=>{
                window.scrollBy(0, window.innerHeight);
                n += 1;
                if (window.scrollY >= document.body.scrollHeight - window.innerHeight || --max < 1) {
                    clearInterval(timer);
                    resolve(n);
                }
            }, delay);
        });
    }
    function $statement(query) {
        const valid = query instanceof Array && query.length > 0 && typeof query[0] === "string" && query.slice(1).every((op)=>op instanceof Array);
        if (!valid) return `INVALID: ${JSON.stringify(query)}`;
        const selector = query[0];
        const ops = query.slice(1);
        return [
            `$("${selector}")`,
            ...ops.map((op)=>`${op[0]}(${op.slice(1).map((param)=>JSON.stringify(param)).join(", ")})`)
        ].join(".");
    }
    function $statements(query) {
        if (query && query.length > 0) return `${$statement(query[0])}${query.length > 1 ? ` (+${query.length - 1} more))` : ""}`;
        else return "(none)";
    }
    class ExtractContext {
        constructor(state){
            this.lastLogLine = "";
            this.lastLogLength = 0;
            this.lastLogTimestamp = 0;
            this.jquery = state.root || $;
            this.online = typeof this.jquery.noConflict === "function";
            state.params = state.params || {};
            state.errors = state.errors || [];
            state.debug = state.debug;
            state.log = state.log || "";
            state.vars = {
                __instance: 0,
                __context: [],
                ...state.vars
            };
            if (this.online) state.url = window.location.href;
            const { domain: domain , origin: origin  } = parseUrl(state.url);
            state.domain = domain || "";
            state.origin = origin || "";
            this.state = state;
        }
        appendError(code, message, level, stack) {
            const key = this.contextKey();
            this.state.errors.push({
                code: code,
                message: message,
                key: key,
                level: level,
                stack: stack
            });
            const text = `ERROR ${key ? `${key}: ` : ""}${message} code=${code} level=${level}${stack ? `\n${stack}` : ""}`;
            this.log(text);
        }
        break({ query: query , on: on = "any" , pattern: pattern , when: when , active: active = true  }) {
            if (this.online && active) {
                if (this.when(when, "BREAK")) {
                    if (query) {
                        this.log(`BREAK WAITFOR QUERY ${trunc($)} on=${on}, pattern=${pattern}`);
                        const result = this.queryCheck(query, on, pattern);
                        if (result === null) {
                            this.log(`BREAK ${when}`);
                            return true;
                        }
                    } else {
                        this.log(`BREAK ${when}`);
                        return true;
                    }
                } else this.log(`BREAK SKIPPED ${when}`);
            } else this.log(`BREAK BYPASSED ${when}`);
            return false;
        }
        async click({ query: query , waitfor: waitfor , snooze: snooze , required: required , retry: retry , active: active , when: when  }) {
            if (this.online && (active ?? true)) {
                if (this.when(when, "CLICK")) {
                    const mode = snooze ? snooze[2] || "before" : undefined;
                    if (snooze && (mode === "before" || mode === "before-and-after")) {
                        const seconds = snooze[0];
                        this.log(`CLICK SNOOZE BEFORE (${seconds}s) ${$statements(query)}`);
                        await sleep(seconds * 1000);
                    }
                    const result = this.query({
                        query: query
                    });
                    if (result && result.nodes.length > 0) {
                        if (this.clickElement(result.nodes[0], $statements(query))) {
                            if (waitfor) {
                                const code = await this.waitfor(waitfor, "CLICK");
                                if (!code) {
                                    if (snooze && (mode === "after" || mode === "before-and-after")) {
                                        const seconds = snooze[0];
                                        this.log(`CLICK SNOOZE AFTER (${seconds}s) ${$statements(query)}`);
                                        await sleep(seconds * 1000);
                                    }
                                } else if (code === "timeout") {
                                    this.appendError("click-timeout", `Timeout waiting for click result. ${trunc(waitfor.query)}${waitfor.pattern ? `, pattern=${waitfor.pattern}` : ""}`, 1);
                                    return "timeout";
                                } else code;
                            }
                        }
                    } else {
                        if (required) this.appendError("click-required", `Required click target not found. ${trunc(query)}`, 1);
                        return "not-found";
                    }
                } else this.log(`CLICK SKIPPED ${$statements(query)}`);
            } else this.log(`CLICK BYPASSED ${$statements(query)}`);
            return null;
        }
        clickElement(element, context) {
            if (element instanceof HTMLElement) {
                if (element instanceof HTMLOptionElement && element.parentElement instanceof HTMLSelectElement) {
                    this.log(`CLICK ${context} <select> "${element.parentElement.value}" -> "${element.value}"`);
                    element.parentElement.value = element.value;
                    element.parentElement.dispatchEvent(new Event("change", {
                        bubbles: true,
                        cancelable: false
                    }));
                    element.parentElement.dispatchEvent(new Event("input", {
                        bubbles: true,
                        cancelable: false
                    }));
                } else {
                    this.log(`CLICK ${context}`);
                    element.click();
                }
                return true;
            } else {
                this.log(`CLICK ${context} not insanceof HTMLElement`);
                return false;
            }
        }
        context() {
            const stack = this.state.vars.__context;
            let j = stack.length - 1;
            const context = {
                ...stack[j]
            };
            let subcontext = context;
            while(--j >= 0){
                subcontext.parent = {
                    ...stack[j]
                };
                subcontext = subcontext.parent;
            }
            return context;
        }
        contextKey() {
            const stack = this.state.vars.__context;
            let key = "";
            for (const { name: name , index: index  } of stack)if (name) {
                if (key) key += ".";
                key += name;
                if (index !== undefined) key += `[${index}]`;
            }
            return key;
        }
        contextKeyInfo() {
            const key = this.contextKey();
            const stack = this.state.vars.__context;
            let info = "";
            if (stack.length > 0) {
                const [top] = stack.slice(-1);
                if (top.pivot !== undefined) info = `PIVOT(${top.pivot})`;
                else if (top.union !== undefined) info = `UNION(${top.union})`;
                else if (top.action !== undefined) info = `${top.action.toUpperCase()}`;
            }
            return info ? `${key} ${info}` : key;
        }
        async dispatch(action, step) {
            if (action.hasOwnProperty("select")) {
                const data = this.select(action.select);
                this.state.data = merge(this.state.data, data);
            } else if (action.hasOwnProperty("break")) {
                if (this.break(action.break)) return "break";
            } else if (action.hasOwnProperty("click")) {
                const required = action.click.required;
                const code = await this.click(action.click);
                if (code === "timeout" && required) return "timeout";
                else if (code === "not-found" && required) return "required";
            } else if (action.hasOwnProperty("each")) await this.each(action.each);
            else if (action.hasOwnProperty("error")) this.error(action.error);
            else if (action.hasOwnProperty("repeat")) await this.repeat(action.repeat);
            else if (action.hasOwnProperty("snooze")) await this.snooze(action.snooze);
            else if (action.hasOwnProperty("transform")) await this.transform(action.transform);
            else if (action.hasOwnProperty("waitfor")) {
                const required = action.waitfor.required;
                const code = await this.waitfor(action.waitfor);
                if (code === "timeout" && required) return "timeout";
            } else if (action.hasOwnProperty("yield")) {
                const y = this.yield(action.yield || {});
                if (y) {
                    this.state.yield = {
                        step: step + 1,
                        timeout: y.timeout
                    };
                    return "yield";
                }
            }
            return null;
        }
        async each({ query: query , actions: actions , context: context , active: active , when: when  }) {
            const $ = this.jquery;
            if (active ?? true) {
                if (this.when(when, "CLICK")) {
                    const result = this.query({
                        query: query,
                        repeated: true
                    });
                    if (result && result.nodes.length > 0) {
                        const elements = result.nodes.toArray();
                        for (const element of elements){
                            const nodes = $(element);
                            this.pushContext({
                                nodes: nodes,
                                value: this.text(nodes),
                                action: "each",
                                index: elements.indexOf(element)
                            }, context);
                            const code = await this.run(actions);
                            this.popContext();
                            if (code === "break") break;
                        }
                    }
                }
            }
        }
        eachNode({ nodes: nodes , value: value  }, callback) {
            const $ = this.jquery;
            if (nodes) {
                const elements = nodes.toArray();
                for(let i = 0; i < elements.length; ++i){
                    const node = $(elements[i]);
                    const subvalue = value instanceof Array ? value[i] : value;
                    callback(node, subvalue);
                }
            }
        }
        error({ query: query , code: code = "custom-error" , message: message = "Custom template error" , level: level = 1 , stop: stop , active: active = true , when: when  }) {
            if (active) {
                if (query) {
                    const result = this.query({
                        query: query,
                        type: "boolean",
                        repeated: false
                    });
                    if (result?.value === false) {
                        this.appendError(code, String(this.evaluate(message)), level);
                        if (stop === true || stop === undefined && level === 0) throw "STOP";
                    }
                } else if (this.when(when, "ERROR")) {
                    this.appendError(code, String(this.evaluate(message)), level);
                    if (stop === true || stop === undefined && level === 0) throw "STOP";
                }
            }
        }
        evaluate(input, params = {}) {
            if (isFormula(input)) {
                const { data: data , ...extra } = params;
                const context = this.context();
                const args = {
                    ...this.state.vars,
                    ...this.state,
                    ...context,
                    data: removeDOMRefs(merge(this.state.data, data)),
                    ...extra
                };
                try {
                    const result = evaluateFormula(input.slice(1, -1).trim(), args);
                    return result;
                } catch (err) {
                    this.appendError("eval-error", `Error evaluating formula "${input}": ${err instanceof Error ? err.message : JSON.stringify(err)}`, 0);
                }
            } else if (isRegexp(input)) {
                const result = regexpExtract(params.value, input);
                return result;
            } else return input;
        }
        evaluateBoolean(input, params = {}) {
            if (isRegexp(input)) {
                const result = regexpTest(params.value, input);
                return result;
            } else {
                const result = this.evaluate(input, params);
                return typeof result === "boolean" ? result : null;
            }
        }
        formatResult(result, type, all, limit, format = "multiline", pattern) {
            const $ = this.jquery;
            const regexp = createRegExp(pattern);
            if (!type) {
                const defaultType = result.value instanceof Array ? typeof result.value[0] : typeof result.value;
                type = [
                    "string",
                    "number",
                    "boolean"
                ].includes(defaultType) ? defaultType : "string";
            }
            if (limit !== undefined && limit !== null && result.value instanceof Array) {
                result.nodes = $(result.nodes.toArray().slice(0, limit));
                result.value = result.value.slice(0, limit);
            }
            if (type === "string" && result.value instanceof Array) {
                if (!result.formatted) result.value = result.value.map((value)=>formatStringValue(coerceValue(value, "string"), format, this.state.origin));
                if (regexp && !isEmpty(result.value)) result.valid = result.value.every((value)=>regexp.test(value));
            } else if (type === "string") {
                if (!result.formatted) result.value = formatStringValue(coerceValue(result.value, "string"), format, this.state.origin);
                if (regexp && !isEmpty(result.value)) result.valid = regexp.test(result.value);
            } else if (type === "boolean" && result.value instanceof Array && result.value.length === 0) result.value = false;
            else if (type === "boolean" && result.value instanceof Array && all) result.value = result.value.every((value)=>coerceValue(value, "boolean") === true);
            else if (type === "boolean" && result.value instanceof Array && !all) result.value = result.value.some((value)=>coerceValue(value, "boolean") === true);
            else if (type === "boolean") result.value = coerceValue(result.value, "boolean");
            else if (type === "number" && result.value instanceof Array) result.value = result.value.map((value)=>coerceValue(value, "number"));
            else if (type === "number") result.value = coerceValue(result.value, "number");
            return result;
        }
        log(text) {
            if (this.state.debug) {
                if (this.lastLogLine === text) {
                    const elapsed = (new Date().valueOf() - this.lastLogTimestamp) / 1000;
                    this.state.log = `${this.state.log.slice(0, this.lastLogLength)}${text} (${elapsed.toFixed(1)}s)\n`;
                } else {
                    this.lastLogLine = text;
                    this.lastLogLength = this.state.log.length;
                    this.lastLogTimestamp = new Date().valueOf();
                    this.state.log += text + "\n";
                }
            }
        }
        mergeQueryResult(source, target) {
            const $ = this.jquery;
            if (source && target) {
                const nodes = source.nodes && target.nodes ? $([
                    ...source.nodes.toArray(),
                    ...target.nodes.toArray()
                ]) : target.nodes || source.nodes;
                let value = undefined;
                if (source.value instanceof Array && target.value instanceof Array) value = [
                    ...source.value,
                    ...target.value
                ];
                else if (source.value instanceof Array && !isNullOrUndefined(target.value)) value = [
                    ...source.value,
                    target.value
                ];
                else if (target.value instanceof Array && !isNullOrUndefined(source.value)) value = [
                    source.value,
                    ...target.value
                ];
                else if (!isNullOrUndefined(source.value) && !isNullOrUndefined(target.value)) value = [
                    source.value,
                    target.value
                ];
                else value = target.value ?? source.value;
                return {
                    nodes: nodes,
                    key: this.contextKey(),
                    value: value,
                    valid: target.valid ?? source.valid
                };
            } else if (target) return target;
            else return source;
        }
        nodeKey(node) {
            const $ = this.jquery;
            const path = [];
            const elements = $(node && node.length > 1 ? node[0] : node).parents().addBack().not("html").toArray().reverse();
            for (const element of elements){
                const $parent = $(element).parent();
                const tag = element.tagName.toLowerCase();
                const id = $(element).attr("id");
                const className = $(element).attr("class")?.split(" ")[0];
                const n = $(element).index() + 1;
                const uniqueId = $(`#${id}`).length === 1;
                const uniqueClassName = $(`${tag}.${className}`).length === 1;
                const onlyTag = $parent.children(tag).length === 1;
                const onlyClassName = className ? $parent.children(`${tag}.${className}`).length === 1 : false;
                if (uniqueId) {
                    path.push(`#${id}`);
                    break;
                } else if (uniqueClassName) {
                    path.push(`${tag}.${className}`);
                    break;
                } else if (onlyTag) path.push(tag);
                else if (onlyClassName) path.push(`${tag}.${className}`);
                else path.push(`${tag}:nth-child(${n})`);
            }
            return path.reverse().join(" > ");
        }
        nodeKeys(nodes) {
            if (typeof nodes === "object" && typeof nodes.toArray === "function") return nodes.toArray().map((node)=>this.nodeKey(node));
            else return [];
        }
        pokeContext(context) {
            const stack = this.state.vars.__context;
            const i = stack.length - 1;
            if (i >= 0) stack[i] = {
                ...stack[i],
                ...context
            };
            if (context.nodes) this.log(`--> ${this.contextKeyInfo()} [${this.nodeKey(stack[stack.length - 1].nodes)}] ${trunc(stack[stack.length - 1].value)}`);
        }
        popContext() {
            const stack = this.state.vars.__context;
            const [top] = stack.slice(-1);
            this.log(`<<< ${this.contextKeyInfo()} [${this.nodeKey(top?.nodes)}] ${stack.length - 1}`);
            stack.pop();
        }
        pushContext(context, inherit) {
            const stack = this.state.vars.__context;
            if (inherit === undefined) {
                const [parent] = stack.slice(-1);
                stack.push({
                    nodes: parent?.nodes,
                    value: parent?.value,
                    ...context
                });
            } else if (inherit === null) stack.push({
                ...context,
                nodes: undefined
            });
            else if (inherit > 0 && inherit <= stack.length) {
                const [parent] = stack.slice(-1 * inherit);
                stack.push({
                    ...context,
                    nodes: parent?.nodes,
                    value: parent?.value
                });
            } else {
                stack.push(context);
                this.appendError("eval-error", `Undefined context #${inherit}`, 1);
            }
            this.log(`>>> ${this.contextKeyInfo()} [${this.nodeKey(stack[stack.length - 1].nodes)}] ${trunc(stack[stack.length - 1].value)} ${stack.length}`);
        }
        query({ query: query , type: type , repeated: repeated = false , all: all = false , format: format , pattern: pattern , limit: limit , hits: hits  }) {
            if (query instanceof Array && query.every((stage)=>stage instanceof Array) && query[0].length > 0 && !!query[0][0]) {
                if (limit === undefined && type === "string" && !repeated && !all) limit = 1;
                if (hits === null || hits === undefined) hits = query.length;
                let hit = 0;
                let result = undefined;
                for (const stage of query){
                    const subresult = this.resolveQuery({
                        query: stage,
                        type: type,
                        repeated: repeated,
                        all: all,
                        limit: limit,
                        format: format,
                        pattern: pattern,
                        result: result
                    });
                    if (subresult) {
                        result = this.mergeQueryResult(result, subresult);
                        if (subresult.nodes.length > 0) {
                            if (!all) {
                                this.log(`[${query.indexOf(stage) + 1}/${query.length}] STOP (first hit)`);
                                break;
                            }
                            if (++hit === hits) {
                                this.log(`[${query.indexOf(stage) + 1}/${query.length}] STOP (${hits} hits)`);
                                break;
                            }
                        }
                    }
                }
                if (result) {
                    if (repeated && !(result.value instanceof Array)) result.value = [
                        result.value
                    ];
                    else if (!repeated && result.value instanceof Array && result.value.every((value)=>typeof value === "string")) result.value = result.value.length > 0 ? result.value.join(format === "singleline" ? " " : "\n") : null;
                    else if (!repeated && result.value instanceof Array) result.value = result.value[0];
                    return result;
                }
            }
        }
        queryCheck(query, on, pattern) {
            const type = pattern ? "string" : "boolean";
            const all = on === "all";
            const result = this.query({
                query: query,
                type: type,
                pattern: pattern,
                all: all,
                repeated: all
            });
            let pass = false;
            if (result) {
                if (type === "boolean") {
                    if (on === "any") pass = result.value === true;
                    else if (on === "all") pass = result.value.every((value)=>value === true);
                    else if (on === "none") pass = result.value === false;
                } else if (type === "string") {
                    if (on === "any") pass = !isEmpty(trim1(result.value)) && result.valid !== false;
                    else if (on === "all") pass = result.value.every((value)=>!isEmpty(trim1(value))) && result.valid !== false;
                    else if (on === "none") pass = !(!isEmpty(trim1(result.value)) && result.valid !== false);
                }
            }
            return [
                pass,
                result
            ];
        }
        async repeat({ actions: actions , limit: limit = 100 , errors: errors = 1  }) {
            let errorCount = 0;
            let baselineErrorCount = this.state.errors.length;
            let i = 0;
            let code = undefined;
            while(i < limit){
                this.log(`REPEAT #${++i} (limit=${limit})`);
                this.state.vars._page = i;
                for (const action of actions){
                    const step = actions.indexOf(action) + 1;
                    code = await this.dispatch(action, step);
                    if (code) {
                        this.log(`REPEAT #${i} -> break at step ${step}/${actions.length}, code=${code}`);
                        break;
                    }
                }
                if (!code) {
                    this.log(`REPEAT #${i} -> ${actions.length} steps completed`);
                    errorCount = this.state.errors.length - baselineErrorCount;
                    if (errorCount >= errors) {
                        this.appendError("error-limit", `${errorCount} errors in repeat (error ${errors} limit exceeded)`, 1);
                        break;
                    }
                } else break;
            }
            this.log(`REPEAT ${i} iterations completed (limit=${limit}, errors=${errorCount}/${errors})`);
        }
        resolveOperands(operands, result) {
            for(let i = 0; i < operands.length; ++i)if (isFormula(operands[i]) || isRegexp(operands[i])) this.eachNode(result, (node, value)=>{
                const resolvedValue = String(this.evaluate(operands[i], {
                    value: value
                }));
                if (resolvedValue !== operands[i]) operands[i] = resolvedValue;
            });
        }
        resolveQuery({ query: query , type: type , repeated: repeated , all: all , limit: limit , format: format , pattern: pattern , result: result  }) {
            const $ = this.jquery;
            let selector = query[0];
            const ops = query.slice(1);
            const context = this.context();
            let nodes;
            let value;
            if (selector === "." && context) {
                nodes = $(context.nodes);
                value = context.value;
                this.log(`QUERY $(".", [${this.nodeKey(context.nodes)}]) -> ${trunc(value)} (${nodes.length} nodes)`);
            } else if (selector === ".." && context?.parent) {
                nodes = $(context.parent.nodes);
                value = context.parent.value;
                this.log(`QUERY $("..", [${this.nodeKey(context.nodes)}]) -> ${trunc(value)} (${nodes.length} nodes)`);
            } else if (selector.startsWith("^")) {
                let n = parseInt(selector.slice(1));
                let subcontext = n > 0 ? context : undefined;
                while(subcontext && n-- >= 0)subcontext = context.parent;
                if (subcontext) {
                    nodes = $(subcontext.nodes);
                    value = subcontext.value;
                    this.log(`QUERY $(${selector}, [${this.nodeKey(context.nodes)}]) -> ${trunc(value)} (${nodes.length} nodes)`);
                } else {
                    this.appendError("eval-error", `Invalid context for selector "${selector}"`, 0);
                    return undefined;
                }
            } else if (selector === "{window}") {
                nodes = this.online ? $(window) : $();
                value = null;
            } else if (selector === "{document}") {
                nodes = this.online ? $(document) : $();
                value = null;
            } else try {
                const _selector = String(this.evaluate(selector));
                nodes = this.resolveQueryNodes($(_selector, context?.nodes), result?.nodes);
                value = this.text(nodes, format);
                if (selector !== _selector) this.log(`EVALUATE "${selector}" >>> "${_selector}"`);
                this.log(`QUERY $("${_selector}", [${this.nodeKey(context.nodes)}]) -> ${trunc(value)} (${nodes.length} nodes)`);
            } catch (err) {
                this.appendError("eval-error", `Failed to resolve selector for "${$statement(query)}": ${err instanceof Error ? err.message : JSON.stringify(err)}`, 0);
                return undefined;
            }
            if (ops.length > 0 && nodes.length > 0) try {
                return this.resolveQueryOps({
                    ops: ops,
                    nodes: nodes,
                    type: type,
                    repeated: repeated,
                    all: all,
                    limit: limit,
                    format: format,
                    pattern: pattern,
                    value: value
                });
            } catch (err1) {
                this.appendError("eval-error", `Failed to resolve operation for "${$statement(query)}": ${err1 instanceof Error ? err1.message : JSON.stringify(err1)}`, 0);
                return undefined;
            }
            else if (type === "boolean") return {
                nodes: nodes,
                key: this.contextKey(),
                value: !repeated ? nodes.length > 0 : [
                    nodes.length > 0
                ]
            };
            else if (nodes.length > 0) return this.formatResult({
                nodes: nodes,
                key: this.contextKey(),
                value: value
            }, type, all, limit, format, pattern);
            else return undefined;
        }
        resolveQueryNodes(target, result) {
            const $ = this.jquery;
            if (result) {
                const source = result.toArray();
                const nodes = target.toArray().filter((node)=>!source.includes(node));
                return $(nodes);
            } else return target;
        }
        resolveQueryOps({ ops: ops , nodes: nodes , type: type , repeated: repeated , all: all , limit: limit , format: format , pattern: pattern , value: value1  }) {
            const $ = this.jquery;
            const result = {
                nodes: nodes,
                key: this.contextKey(),
                value: value1
            };
            if (!this.validateOperators(ops)) return result;
            const a = ops.slice(0);
            while(a.length > 0){
                const [operator, ...operands] = a.shift();
                if (operator === "blank") {
                    result.nodes = $(result.nodes.toArray().filter((element)=>$(element).text().trim().length === 0));
                    result.value = this.text(result.nodes, format);
                } else if (operator === "cut") {
                    if (!this.validateOperands(operator, operands, [
                        "string",
                        "number"
                    ], [
                        "number"
                    ])) break;
                    const splitter = operands[0];
                    const n = operands[1];
                    const limit = operands[2];
                    if (typeof result.value === "string") result.value = cut(result.value, splitter, n, limit);
                    else if (result.value instanceof Array && result.value.every((value)=>typeof value === "string")) result.value = result.value.map((value)=>cut(value, splitter, n, limit));
                    else result.value = null;
                } else if (operator === "extract") {
                    if (!this.validateOperands(operator, operands, [
                        "string"
                    ], [
                        "boolean",
                        "boolean"
                    ])) break;
                    const regexp = createRegExp(operands[0]);
                    const keepUnmatchedItems = operands[1];
                    const trim = operands[2] ?? true;
                    if (!regexp) this.appendError("invalid-operand", `Invalid regular expression for "extract"`, 0);
                    else if (result.value instanceof Array && result.value.every((value)=>typeof value === "string")) {
                        const values = result.value.map((value)=>regexpExtract(value.trim(), regexp, trim));
                        if (!keepUnmatchedItems) {
                            const elements = result.nodes.toArray();
                            for(let i = result.value.length - 1; i >= 0; --i)if (values[i] === null) {
                                elements.splice(i, 1);
                                values.splice(i, 1);
                            }
                            result.nodes = $(elements);
                        }
                        result.value = values;
                    } else if (typeof result.value === "string") result.value = regexpExtract(result.value.trim(), regexp, trim);
                    else result.value = null;
                } else if (operator === "filter" && (isFormula(operands[0]) || isRegexp(operands[0]))) {
                    if (!this.validateOperands(operator, operands, [
                        "string"
                    ])) break;
                    if (result.value instanceof Array) {
                        const input = {
                            elements: result.nodes.toArray(),
                            values: result.value
                        };
                        const output = {
                            elements: [],
                            values: []
                        };
                        const n = input.elements.length;
                        for(let i = 0; i < n; ++i){
                            const hit = this.evaluateBoolean(operands[0], {
                                value: input.values[i],
                                index: i,
                                count: n
                            });
                            if (hit) {
                                output.elements.push(input.elements[i]);
                                output.values.push(input.values[i]);
                            }
                        }
                        result.nodes = $(output.elements);
                        result.value = output.values;
                    } else {
                        const hit = this.evaluateBoolean(operands[0], {
                            value: result.value
                        });
                        if (!hit) {
                            result.nodes = $([]);
                            result.value = null;
                        }
                    }
                } else if (operator === "html" && (operands[0] === "outer" || operands[0] === undefined)) {
                    if (this.online) result.value = result.nodes.toArray().map((element)=>element.outerHTML.trim());
                    else result.value = result.nodes.toArray().map((element)=>$.html(element).toString().trim());
                    if (typeof operands[1] === "boolean" ? operands[1] : true) {
                        result.value = formatHTML(result.value);
                        result.formatted = true;
                    }
                } else if (operator === "html" && operands[0] === "inner") {
                    result.value = result.nodes.toArray().map((element)=>$(element).html());
                    if (typeof operands[1] === "boolean" ? operands[1] : true) {
                        result.value = formatHTML(result.value);
                        result.formatted = true;
                    }
                } else if (operator === "map") {
                    if (!this.validateOperands(operator, operands, [
                        "string"
                    ])) break;
                    const input = {
                        elements: result.nodes.toArray(),
                        values: result.value instanceof Array ? result.value : new Array(result.nodes.length).fill(result.value)
                    };
                    const output = {
                        elements: [],
                        values: []
                    };
                    const n = input.elements.length;
                    for(let i = 0; i < n; ++i){
                        const value = this.evaluate(operands[0], {
                            value: input.values[i],
                            index: i,
                            count: n
                        });
                        if (value !== null && value !== undefined) {
                            output.elements.push(input.elements[i]);
                            output.values.push(value);
                        }
                    }
                    result.nodes = $(output.elements);
                    result.value = output.values;
                } else if (operator === "nonblank") {
                    result.nodes = $(result.nodes.toArray().filter((element)=>$(element).text().trim().length > 0));
                    result.value = this.text(result.nodes, format);
                } else if (operator === "replace") {
                    if (!this.validateOperands(operator, operands, [
                        "string",
                        "string"
                    ])) break;
                    const regexp = createRegExp(operands[0]);
                    if (!regexp) this.appendError("invalid-operand", `Invalid regular expression for "replace"`, 0);
                    else if (result.value instanceof Array && result.value.every((value)=>typeof value === "string")) result.value = result.value.map((value)=>regexpReplace(value, regexp, operands[1]));
                    else if (typeof result.value === "string") result.value = regexpReplace(result.value, regexp, operands[1]);
                } else if (operator === "replaceHTML") {
                    if (!this.validateOperands(operator, operands, [
                        "string"
                    ])) break;
                    this.eachNode(result, (node, value)=>{
                        const content = String(this.evaluate(operands[0], {
                            value: value
                        }));
                        node.html(content);
                    });
                    result.value = null;
                } else if (operator === "replaceTag") {
                    if (!this.validateOperands(operator, operands, [
                        "string"
                    ], [
                        "boolean"
                    ])) break;
                    const newTag = String(this.evaluate(operands[0], {
                        value: operands[0]
                    }));
                    const keepProps = operands[1] ?? true;
                    this.eachNode(result, (node)=>{
                        const newNode = $(newTag);
                        if (keepProps) $merge(newNode, node);
                        node.wrapAll(newNode);
                        node.contents().unwrap();
                    });
                    result.value = null;
                } else if (operator === "replaceText") {
                    if (!this.validateOperands(operator, operands, [
                        "string"
                    ])) break;
                    this.eachNode(result, (node, value)=>{
                        const content = String(this.evaluate(operands[0], {
                            value: value
                        }));
                        node.text(content);
                    });
                    result.value = null;
                } else if (operator === "replaceWith") {
                    if (!this.validateOperands(operator, operands, [
                        "string"
                    ])) break;
                    this.eachNode(result, (node, value)=>{
                        const content = String(this.evaluate(operands[0], {
                            value: value
                        }));
                        node.replaceWith(content);
                    });
                    result.value = null;
                } else if (operator === "reverse") {
                    if (!this.validateOperands(operator, operands, [], [])) break;
                    result.nodes = $(result.nodes.toArray().reverse());
                    result.value = this.text(result.nodes, format);
                } else if (operator === "scrollBottom") {
                    if (this.online) {
                        const y = result.nodes.scrollTop() + result.nodes.height();
                        this.log(`scrollBottom ${result.nodes.scrollTop()} ${result.nodes.height()} ${y}`);
                        window.scrollTo(0, y);
                    }
                } else if (operator === "size") result.value = result.nodes.length;
                else if (operator === "split") {
                    const bypass = operands[0] === undefined && result.value instanceof Array;
                    if (!bypass) {
                        const text = result.value instanceof Array ? result.value.join("\n") : result.value;
                        const separator = operands[0];
                        const limit = typeof operands[1] === "number" ? operands[1] : undefined;
                        const trim = typeof operands[2] === "boolean" ? operands[2] : true;
                        result.value = text.split(separator, limit);
                        if (trim && result.value instanceof Array) result.value = result.value.map((value)=>value.trim()).filter((value)=>value.length > 0);
                    }
                } else if (operator === "text" && operands[0] === "inline") {
                    result.value = result.nodes.toArray().map((element)=>Array.from(element.childNodes).filter((node)=>node.nodeType === 3).map((node)=>node.textContent ?? node.data).join(" ").trim().replace(/[ ]{2,}/, " "));
                    result.formatted = false;
                } else if ([
                    "appendTo",
                    "each",
                    "prependTo",
                    "insertBefore",
                    "insertAfter",
                    "replaceAll"
                ].includes(operator)) this.appendError("invalid-operator", `Operator "${operator}" not supported`, 0);
                else if (isInvocableFrom(result.nodes, operator)) {
                    this.resolveOperands(operands, result);
                    const delegate1 = result.nodes;
                    const obj2 = delegate1[operator](...operands);
                    if (isJQueryObject(obj2)) {
                        result.nodes = obj2;
                        result.value = this.text(result.nodes, format);
                        result.formatted = false;
                    } else if (repeated) {
                        result.value = result.nodes.toArray().map((element)=>{
                            const delegate = $(element);
                            const obj = delegate[operator](...operands);
                            return obj;
                        });
                        result.formatted = false;
                    } else {
                        result.value = obj2;
                        result.formatted = false;
                    }
                } else {
                    this.appendError("invalid-operator", `Operator '${operator}' not found`, 0);
                    break;
                }
            }
            return this.formatResult(result, type, all, limit, format, pattern);
        }
        async run(actions) {
            const resumeStep = this.state.yield?.step || 0;
            if (this.state.yield) {
                this.log(`YIELD SKIPPING TO STEP #${this.state.yield.step}`);
                this.state.yield = undefined;
            }
            for (const action of actions){
                const step = actions.indexOf(action) + 1;
                if (step >= resumeStep) {
                    this.log(`STEP #${step}/${actions.length}`);
                    this.state.vars._step = step;
                    const result = await this.dispatch(action, step);
                    if (result) {
                        this.log(`BREAK AT STEP #${step}/${actions.length}, code=${result}`);
                        return result;
                    }
                }
            }
            this.log(`${actions.length} steps completed`);
        }
        select(selects, pivot = false) {
            const data = {};
            for (const select of selects)if (select.active ?? true) {
                this.validateSelect(select);
                let item = null;
                if (this.when(select.when)) {
                    if (select.pivot) item = this.selectResolvePivot(select, item);
                    else {
                        if (!pivot) this.pushContext({
                            name: select.name
                        }, select.context);
                        if (select.union) item = this.selectResolveUnion(select, item, data);
                        else if (select.query) item = this.selectResolveSelector(select, item);
                        else if (select.value) item = this.selectResolveValue(select, data);
                        if (!pivot) {
                            if (isEmpty(item?.value) && select.required) this.appendError("select-required", `Required select '${this.contextKey()}' not found`, 0);
                            this.popContext();
                        }
                    }
                }
                if (select.name?.startsWith("_") && item) this.state.vars[select.name] = item.value;
                else if (select.name) data[select.name] = item;
                else return item;
            }
            return data;
        }
        selectResolvePivot(select, item) {
            const $ = this.jquery;
            const { pivot: pivot , ...superselect } = select;
            if (pivot) {
                const result = this.query(select);
                if (result && result.nodes && result.nodes.length > 0) {
                    this.pushContext({
                        name: select.name,
                        nodes: result.nodes,
                        value: result.value,
                        action: "pivot"
                    }, select.context);
                    const elements = result.nodes.toArray();
                    for (const element of elements){
                        const nodes = $(element);
                        this.pushContext({
                            nodes: $(element),
                            value: this.text(nodes, select.format),
                            pivot: elements.indexOf(element)
                        }, select.context);
                        item = this.selectResolveSelector({
                            ...superselect,
                            ...pivot
                        }, item, true);
                        this.log(`PIVOT ${this.contextKey()} -> ${typeName(item?.value)}`);
                        this.popContext();
                    }
                    if (isEmpty(item?.value) && select.required) this.appendError("select-required", `Required select '${this.contextKey()}' not found`, 0);
                    this.popContext();
                } else this.log(`PIVOT ${this.contextKey()} EMPTY`);
            }
            return item;
        }
        selectResolveSelector(select, item, pivot = false) {
            const $ = this.jquery;
            let subitem = null;
            if (select.type === undefined && select.select) select.type = "object";
            const result = this.query(select);
            if (result) {
                if (select.type !== "object") subitem = {
                    nodes: this.nodeKeys(result.nodes),
                    key: result.key,
                    value: result.value
                };
                else if (select.select) {
                    this.pushContext({
                        action: "subselect"
                    }, select.context);
                    const n = result.value instanceof Array ? result.value.length : 0;
                    if (select.repeated && result.nodes.length === n && !select.collate) subitem = {
                        nodes: this.nodeKeys(result.nodes),
                        key: result.key,
                        value: result.nodes.toArray().map((node, index)=>{
                            this.pokeContext({
                                nodes: $(node),
                                value: result.value instanceof Array ? result.value[index] : result.value,
                                index: index
                            });
                            return this.select(select.select, pivot);
                        })
                    };
                    else if (select.repeated && result.value instanceof Array && !select.collate) subitem = {
                        nodes: this.nodeKeys(result.nodes),
                        key: result.key,
                        value: result.value.map((value, index)=>{
                            this.pokeContext({
                                nodes: result.nodes,
                                value: value,
                                index: index
                            });
                            return this.select(select.select, pivot);
                        })
                    };
                    else {
                        this.pokeContext({
                            nodes: result.nodes,
                            value: result.value
                        });
                        const subselect = select.collate ? select.select.map((obj)=>({
                                ...obj,
                                all: true
                            })) : select.select;
                        const value = this.select(subselect, pivot);
                        subitem = {
                            nodes: this.nodeKeys(result.nodes),
                            key: result.key,
                            value: select.repeated ? [
                                value
                            ] : value
                        };
                    }
                    this.popContext();
                }
            }
            this.log(`SELECT ${this.contextKey()} -> ${$statements(select.query)} -> ${subitem ? trunc(subitem.value) : "(none)"}${item ? ` merge(${typeName(item?.value)}, ${typeName(subitem?.value)})` : ""}`);
            return merge(item, subitem);
        }
        selectResolveUnion(select, item, data) {
            const { union: union , ...superselect } = select;
            if (union) {
                for (const subselect of union)if (subselect.active ?? true) {
                    if (this.when(subselect.when)) {
                        this.pokeContext({
                            action: "union",
                            union: union.indexOf(subselect)
                        });
                        this.log(`UNION ${this.contextKey()} ${union.indexOf(subselect) + 1}/${union.length}`);
                        if (subselect.pivot) item = this.selectResolvePivot({
                            ...superselect,
                            ...subselect
                        }, item);
                        else if (subselect.query) item = this.selectResolveSelector({
                            ...superselect,
                            ...subselect
                        }, item);
                        else if (subselect.value) item = this.selectResolveValue(subselect);
                    } else this.log(`UNION SKIPPED ${this.contextKey()} ${union.indexOf(subselect) + 1}/${union.length}`);
                } else this.log(`UNION BYPASSED ${this.contextKey()} ${union.indexOf(subselect) + 1}/${union.length}`);
            }
            return item;
        }
        selectResolveValue(select, data) {
            const result = this.evaluate(select.value, {
                data: data
            });
            const value = coerceValue(result, select.type || "string");
            return {
                nodes: [],
                key: this.contextKey(),
                value: select.repeated ? [
                    value
                ] : value
            };
        }
        async snooze(interval) {
            this.log(`SNOOZE ${interval[0]}s`);
            await sleep(interval[0] * 1000);
        }
        text(nodes, format) {
            const $ = this.jquery;
            format = format?.toLowerCase();
            if (this.online && format === "innertext") return nodes.toArray().map((element)=>element.innerText);
            else if (this.online && format === "textcontent") return nodes.toArray().map((element)=>element.textContent);
            else if (format === "none") return nodes.toArray().map((element)=>$(element).text());
            else {
                nodes.find("*").each((index, element)=>{
                    const node = $(element);
                    const tag = node.prop("tagName").toLowerCase();
                    const whitespace = tag === "br" || tag === "p" ? "\n" : " ";
                    node.append(whitespace);
                    if (index === 0) node.prepend(" ");
                });
                return nodes.toArray().map((element)=>$(element).text().trim().replace(/[ ]{2,}/g, " "));
            }
        }
        async transform(transforms) {
            for (const transform of transforms)if (transform.active ?? true) {
                if (this.when(transform.when, "TRANSFORM")) {
                    const query = transform.query;
                    const selector = query[0];
                    const [operands] = query.slice(1);
                    if (selector === "{window}" && operands[0] === "scrollBottom") {
                        const delay = typeof operands[1] === "number" ? operands[1] : undefined;
                        const max = typeof operands[2] === "number" ? operands[2] : undefined;
                        const pagedowns = await $scrollToBottom(delay, max);
                        this.log(`TRANSFORM ${$statement(query)} (${pagedowns}x)`);
                    } else try {
                        const result = this.resolveQuery({
                            query: query,
                            repeated: true,
                            all: true,
                            limit: null
                        });
                        this.log(`TRANSFORM ${$statement(query)} -> (${result?.nodes?.length || 0} nodes)`);
                    } catch (err) {
                        this.log(`TRANSFORM ERROR ${$statement(query)}: ${err instanceof Error ? err.message : JSON.stringify(err)}`);
                    }
                } else this.log(`TRANSFORM SKIPPED ${$statement(transform.query)}`);
            } else this.log(`TRANSFORM BYPASSED ${$statement(transform.query)}`);
        }
        validateOperands(operator, operands, required, optional = []) {
            for(let i = 0; i < required.length; ++i)if (typeof operands[i] !== required[i]) {
                this.appendError("invalid-operand", `Operand #${i + 1} of "${operator}" is invalid: "${operands[i]}" is not a ${required[i]}`, 0);
                return false;
            }
            for(let i1 = 0; i1 < optional.length; ++i1){
                const j = i1 + required.length;
                if (operands[j] !== undefined && operands[j] !== null && typeof operands[j] !== optional[i1]) {
                    this.appendError("invalid-operand", `Operand #${j + 1} of "${operator}" is invalid: "${operands[j]}" is not a ${optional[i1]}`, 0);
                    return false;
                }
            }
            return true;
        }
        validateOperators(ops) {
            const valid = ops instanceof Array && ops.every((op)=>op instanceof Array && op.length > 0 && typeof op[0] === "string");
            if (!valid) this.appendError("invalid-operator", `Invalid operator in: ${JSON.stringify(ops)}`, 0);
            return valid;
        }
        validateSelect(select) {
            const n = (select.query !== undefined ? 1 : 0) + (select.union !== undefined ? 1 : 0) + (select.value !== undefined ? 1 : 0);
            if (n !== 1) {
                this.appendError("invalid-select", "Select requires one of 'query', 'union', or 'value'", 0);
                return false;
            } else return true;
        }
        async waitfor({ query: query , select: select , timeout: timeout , on: on = "any" , required: required , pattern: pattern , when: when , active: active  }, context) {
            if (this.online && (active ?? true)) {
                if (this.when(when, "WAITFOR")) {
                    if (timeout === undefined) timeout = 30;
                    else if (timeout === null || timeout <= 0) timeout = Infinity;
                    let code = null;
                    if (query) {
                        this.log(`${context ? `${context} ` : ""}WAITFOR QUERY ${trunc(query)} on=${on}, timeout=${timeout}, pattern=${pattern}`);
                        code = await this.waitforQuery(query, on, timeout, required, pattern, context);
                    } else if (select) {
                        this.log(`${context ? `${context} ` : ""}WAITFOR SELECT ${trunc(select)} on=${on}, timeout=${timeout}, pattern=${pattern}`);
                        code = await this.waitforSelect(select, on, timeout, required, pattern, context);
                    }
                    return code;
                } else {
                    this.log(`${context ? `${context} ` : ""}WAITFOR BYPASSSED ${$statements(query)}`);
                    return null;
                }
            } else {
                this.log(`${context ? `${context} ` : ""}WAITFOR SKIPPED ${$statements(query)}`);
                return null;
            }
        }
        async waitforQuery(query, on, timeout, required, pattern, context) {
            const t0 = new Date().valueOf();
            let elapsed = 0;
            let pass = false;
            let result = undefined;
            while(!pass && elapsed < timeout){
                [pass, result] = this.queryCheck(query, on, pattern);
                if (!pass) await sleep(100);
                elapsed = (new Date().valueOf() - t0) / 1000;
            }
            const message = `${context ? `${context} ` : ""}WAITFOR QUERY ${$statements(query)} -> ${trunc(result?.value)}${pattern ? ` (valid=${result?.valid})` : ""} -> on=${on} -> ${pass} (${elapsed.toFixed(1)}s${elapsed > timeout ? " TIMEOUT" : ""})`;
            this.log(message);
            if (pass) return null;
            else if (required) {
                this.appendError("waitfor-timeout", message, 1);
                return "timeout";
            } else return null;
        }
        async waitforSelect(selects, on, timeout, required, pattern, context) {
            for (const select of selects)if (!select.name || !select.name.startsWith("_") || !(!select.type || select.type === "boolean") || select.repeated) {
                this.appendError("invalid-select", "waitfor select must all be internal, boolean, and not repeated", 0);
                return "invalid";
            }
            const t0 = new Date().valueOf();
            let elapsed = 0;
            let state = {};
            let pass = false;
            while(!pass && elapsed < timeout){
                state = {};
                let n = 0;
                for (const select of selects){
                    const type = pattern ? "string" : "boolean";
                    const all = on === "all";
                    const result = this.query({
                        ...select,
                        type: type,
                        pattern: pattern,
                        all: all
                    });
                    if (result && result.valid !== false) {
                        state[select.name] = result.value;
                        this.state.vars[select.name] = result.value;
                        if (result.value) n += 1;
                    }
                }
                if (on === "any") pass = n > 0;
                else if (on === "all") pass = n === selects.length;
                else if (on === "none") pass = n === 0;
                else pass = n > 0;
                if (!pass) await sleep(100);
                elapsed = (new Date().valueOf() - t0) / 1000;
            }
            const message = `${context ? `${context} ` : ""}WAITFOR SELECT ${JSON.stringify(state)}${pattern ? "valid=???" : ""} -> on=${on} -> ${pass} (${elapsed.toFixed(1)}s${elapsed > timeout ? " TIMEOUT" : ""})`;
            this.log(message);
            if (pass) return null;
            else if (required) {
                this.appendError("waitfor-timeout", message, 1);
                return "timeout";
            } else return null;
        }
        when(when, context) {
            if (when) try {
                const result = !!this.evaluate(when);
                this.log(`${context ? `${context} ` : ""}WHEN ${JSON.stringify(when)} -> ${result}`);
                return result;
            } catch (err) {
                this.log(`${context ? `${context} ` : ""}WHEN ${JSON.stringify(when)} -> ERROR ${err instanceof Error ? err.message : JSON.stringify(err)}`);
                return false;
            }
            return true;
        }
        yield({ active: active , when: when , timeout: timeout  }) {
            if (this.online && (active ?? true)) {
                if (this.when(when, "YIELD")) {
                    this.log(`YIELD ${when || "(default)"} -> timeout=${timeout || "(default)"}`);
                    return {
                        timeout: timeout
                    };
                } else this.log(`YIELD SKIPPED ${when}`);
            } else this.log(`YIELD BYPASSED ${when}`);
            return undefined;
        }
    }
    if (typeof state1?.vars?.__instance === "number") state1.vars.__instance += 1;
    const obj1 = new ExtractContext(state1);
    obj1.log(`INSTANCE #${obj1.state.vars.__instance}${obj1.online ? ` ${window.location.href}` : ""}`);
    try {
        await obj1.run(obj1.state.actions);
    } catch (err) {
        if (err === "STOP") obj1.log("STOPPED");
        else obj1.appendError("fatal-error", err instanceof Error ? err.message : JSON.stringify(err), 0, err instanceof Error ? err.stack : undefined);
    }
    return obj1.state;
} //# sourceMappingURL=index.js.map


function $826e63c4066e4eb6$export$633ae63c2897642e(query) {
    const valid = query instanceof Array && query.length > 0 && typeof query[0] === "string" && query.slice(1).every((op)=>op instanceof Array);
    if (valid) {
        const selector = query[0];
        const ops = query.slice(1);
        return [
            `$("${selector}")`,
            ...ops.map((op)=>`${op[0]}(${op.slice(1).map((param)=>JSON.stringify(param)).join(", ")})`)
        ].join(".");
    }
} //# sourceMappingURL=format.js.map


/*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT */ function $cfcf25c51c3b1777$var$isNothing(subject) {
    return typeof subject === "undefined" || subject === null;
}
function $cfcf25c51c3b1777$var$isObject(subject) {
    return typeof subject === "object" && subject !== null;
}
function $cfcf25c51c3b1777$var$toArray(sequence) {
    if (Array.isArray(sequence)) return sequence;
    else if ($cfcf25c51c3b1777$var$isNothing(sequence)) return [];
    return [
        sequence
    ];
}
function $cfcf25c51c3b1777$var$extend(target, source) {
    var index, length, key, sourceKeys;
    if (source) {
        sourceKeys = Object.keys(source);
        for(index = 0, length = sourceKeys.length; index < length; index += 1){
            key = sourceKeys[index];
            target[key] = source[key];
        }
    }
    return target;
}
function $cfcf25c51c3b1777$var$repeat(string, count) {
    var result = "", cycle;
    for(cycle = 0; cycle < count; cycle += 1)result += string;
    return result;
}
function $cfcf25c51c3b1777$var$isNegativeZero(number) {
    return number === 0 && Number.NEGATIVE_INFINITY === 1 / number;
}
var $cfcf25c51c3b1777$var$isNothing_1 = $cfcf25c51c3b1777$var$isNothing;
var $cfcf25c51c3b1777$var$isObject_1 = $cfcf25c51c3b1777$var$isObject;
var $cfcf25c51c3b1777$var$toArray_1 = $cfcf25c51c3b1777$var$toArray;
var $cfcf25c51c3b1777$var$repeat_1 = $cfcf25c51c3b1777$var$repeat;
var $cfcf25c51c3b1777$var$isNegativeZero_1 = $cfcf25c51c3b1777$var$isNegativeZero;
var $cfcf25c51c3b1777$var$extend_1 = $cfcf25c51c3b1777$var$extend;
var $cfcf25c51c3b1777$var$common = {
    isNothing: $cfcf25c51c3b1777$var$isNothing_1,
    isObject: $cfcf25c51c3b1777$var$isObject_1,
    toArray: $cfcf25c51c3b1777$var$toArray_1,
    repeat: $cfcf25c51c3b1777$var$repeat_1,
    isNegativeZero: $cfcf25c51c3b1777$var$isNegativeZero_1,
    extend: $cfcf25c51c3b1777$var$extend_1
};
// YAML error class. http://stackoverflow.com/questions/8458984
function $cfcf25c51c3b1777$var$formatError(exception1, compact) {
    var where = "", message = exception1.reason || "(unknown reason)";
    if (!exception1.mark) return message;
    if (exception1.mark.name) where += 'in "' + exception1.mark.name + '" ';
    where += "(" + (exception1.mark.line + 1) + ":" + (exception1.mark.column + 1) + ")";
    if (!compact && exception1.mark.snippet) where += "\n\n" + exception1.mark.snippet;
    return message + " " + where;
}
function $cfcf25c51c3b1777$var$YAMLException$1(reason, mark) {
    // Super constructor
    Error.call(this);
    this.name = "YAMLException";
    this.reason = reason;
    this.mark = mark;
    this.message = $cfcf25c51c3b1777$var$formatError(this, false);
    // Include stack trace in error object
    if (Error.captureStackTrace) // Chrome and NodeJS
    Error.captureStackTrace(this, this.constructor);
    else // FF, IE 10+ and Safari 6+. Fallback for others
    this.stack = new Error().stack || "";
}
// Inherit from Error
$cfcf25c51c3b1777$var$YAMLException$1.prototype = Object.create(Error.prototype);
$cfcf25c51c3b1777$var$YAMLException$1.prototype.constructor = $cfcf25c51c3b1777$var$YAMLException$1;
$cfcf25c51c3b1777$var$YAMLException$1.prototype.toString = function toString(compact) {
    return this.name + ": " + $cfcf25c51c3b1777$var$formatError(this, compact);
};
var $cfcf25c51c3b1777$var$exception = $cfcf25c51c3b1777$var$YAMLException$1;
// get snippet for a single line, respecting maxLength
function $cfcf25c51c3b1777$var$getLine(buffer, lineStart, lineEnd, position, maxLineLength) {
    var head = "";
    var tail = "";
    var maxHalfLength = Math.floor(maxLineLength / 2) - 1;
    if (position - lineStart > maxHalfLength) {
        head = " ... ";
        lineStart = position - maxHalfLength + head.length;
    }
    if (lineEnd - position > maxHalfLength) {
        tail = " ...";
        lineEnd = position + maxHalfLength - tail.length;
    }
    return {
        str: head + buffer.slice(lineStart, lineEnd).replace(/\t/g, "\u2192") + tail,
        pos: position - lineStart + head.length // relative position
    };
}
function $cfcf25c51c3b1777$var$padStart(string, max) {
    return $cfcf25c51c3b1777$var$common.repeat(" ", max - string.length) + string;
}
function $cfcf25c51c3b1777$var$makeSnippet(mark, options) {
    options = Object.create(options || null);
    if (!mark.buffer) return null;
    if (!options.maxLength) options.maxLength = 79;
    if (typeof options.indent !== "number") options.indent = 1;
    if (typeof options.linesBefore !== "number") options.linesBefore = 3;
    if (typeof options.linesAfter !== "number") options.linesAfter = 2;
    var re = /\r?\n|\r|\0/g;
    var lineStarts = [
        0
    ];
    var lineEnds = [];
    var match;
    var foundLineNo = -1;
    while(match = re.exec(mark.buffer)){
        lineEnds.push(match.index);
        lineStarts.push(match.index + match[0].length);
        if (mark.position <= match.index && foundLineNo < 0) foundLineNo = lineStarts.length - 2;
    }
    if (foundLineNo < 0) foundLineNo = lineStarts.length - 1;
    var result = "", i1, line;
    var lineNoLength = Math.min(mark.line + options.linesAfter, lineEnds.length).toString().length;
    var maxLineLength = options.maxLength - (options.indent + lineNoLength + 3);
    for(i1 = 1; i1 <= options.linesBefore; i1++){
        if (foundLineNo - i1 < 0) break;
        line = $cfcf25c51c3b1777$var$getLine(mark.buffer, lineStarts[foundLineNo - i1], lineEnds[foundLineNo - i1], mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo - i1]), maxLineLength);
        result = $cfcf25c51c3b1777$var$common.repeat(" ", options.indent) + $cfcf25c51c3b1777$var$padStart((mark.line - i1 + 1).toString(), lineNoLength) + " | " + line.str + "\n" + result;
    }
    line = $cfcf25c51c3b1777$var$getLine(mark.buffer, lineStarts[foundLineNo], lineEnds[foundLineNo], mark.position, maxLineLength);
    result += $cfcf25c51c3b1777$var$common.repeat(" ", options.indent) + $cfcf25c51c3b1777$var$padStart((mark.line + 1).toString(), lineNoLength) + " | " + line.str + "\n";
    result += $cfcf25c51c3b1777$var$common.repeat("-", options.indent + lineNoLength + 3 + line.pos) + "^" + "\n";
    for(i1 = 1; i1 <= options.linesAfter; i1++){
        if (foundLineNo + i1 >= lineEnds.length) break;
        line = $cfcf25c51c3b1777$var$getLine(mark.buffer, lineStarts[foundLineNo + i1], lineEnds[foundLineNo + i1], mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo + i1]), maxLineLength);
        result += $cfcf25c51c3b1777$var$common.repeat(" ", options.indent) + $cfcf25c51c3b1777$var$padStart((mark.line + i1 + 1).toString(), lineNoLength) + " | " + line.str + "\n";
    }
    return result.replace(/\n$/, "");
}
var $cfcf25c51c3b1777$var$snippet = $cfcf25c51c3b1777$var$makeSnippet;
var $cfcf25c51c3b1777$var$TYPE_CONSTRUCTOR_OPTIONS = [
    "kind",
    "multi",
    "resolve",
    "construct",
    "instanceOf",
    "predicate",
    "represent",
    "representName",
    "defaultStyle",
    "styleAliases"
];
var $cfcf25c51c3b1777$var$YAML_NODE_KINDS = [
    "scalar",
    "sequence",
    "mapping"
];
function $cfcf25c51c3b1777$var$compileStyleAliases(map1) {
    var result = {};
    if (map1 !== null) Object.keys(map1).forEach(function(style) {
        map1[style].forEach(function(alias) {
            result[String(alias)] = style;
        });
    });
    return result;
}
function $cfcf25c51c3b1777$var$Type$1(tag, options) {
    options = options || {};
    Object.keys(options).forEach(function(name) {
        if ($cfcf25c51c3b1777$var$TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) throw new $cfcf25c51c3b1777$var$exception('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
    });
    // TODO: Add tag format check.
    this.options = options; // keep original options in case user wants to extend this type later
    this.tag = tag;
    this.kind = options["kind"] || null;
    this.resolve = options["resolve"] || function() {
        return true;
    };
    this.construct = options["construct"] || function(data) {
        return data;
    };
    this.instanceOf = options["instanceOf"] || null;
    this.predicate = options["predicate"] || null;
    this.represent = options["represent"] || null;
    this.representName = options["representName"] || null;
    this.defaultStyle = options["defaultStyle"] || null;
    this.multi = options["multi"] || false;
    this.styleAliases = $cfcf25c51c3b1777$var$compileStyleAliases(options["styleAliases"] || null);
    if ($cfcf25c51c3b1777$var$YAML_NODE_KINDS.indexOf(this.kind) === -1) throw new $cfcf25c51c3b1777$var$exception('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
}
var $cfcf25c51c3b1777$var$type = $cfcf25c51c3b1777$var$Type$1;
/*eslint-disable max-len*/ function $cfcf25c51c3b1777$var$compileList(schema1, name) {
    var result = [];
    schema1[name].forEach(function(currentType) {
        var newIndex = result.length;
        result.forEach(function(previousType, previousIndex) {
            if (previousType.tag === currentType.tag && previousType.kind === currentType.kind && previousType.multi === currentType.multi) newIndex = previousIndex;
        });
        result[newIndex] = currentType;
    });
    return result;
}
function $cfcf25c51c3b1777$var$compileMap() {
    var result = {
        scalar: {},
        sequence: {},
        mapping: {},
        fallback: {},
        multi: {
            scalar: [],
            sequence: [],
            mapping: [],
            fallback: []
        }
    }, index, length;
    function collectType(type1) {
        if (type1.multi) {
            result.multi[type1.kind].push(type1);
            result.multi["fallback"].push(type1);
        } else result[type1.kind][type1.tag] = result["fallback"][type1.tag] = type1;
    }
    for(index = 0, length = arguments.length; index < length; index += 1)arguments[index].forEach(collectType);
    return result;
}
function $cfcf25c51c3b1777$var$Schema$1(definition) {
    return this.extend(definition);
}
$cfcf25c51c3b1777$var$Schema$1.prototype.extend = function extend(definition) {
    var implicit = [];
    var explicit = [];
    if (definition instanceof $cfcf25c51c3b1777$var$type) // Schema.extend(type)
    explicit.push(definition);
    else if (Array.isArray(definition)) // Schema.extend([ type1, type2, ... ])
    explicit = explicit.concat(definition);
    else if (definition && (Array.isArray(definition.implicit) || Array.isArray(definition.explicit))) {
        // Schema.extend({ explicit: [ type1, type2, ... ], implicit: [ type1, type2, ... ] })
        if (definition.implicit) implicit = implicit.concat(definition.implicit);
        if (definition.explicit) explicit = explicit.concat(definition.explicit);
    } else throw new $cfcf25c51c3b1777$var$exception("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
    implicit.forEach(function(type$1) {
        if (!(type$1 instanceof $cfcf25c51c3b1777$var$type)) throw new $cfcf25c51c3b1777$var$exception("Specified list of YAML types (or a single Type object) contains a non-Type object.");
        if (type$1.loadKind && type$1.loadKind !== "scalar") throw new $cfcf25c51c3b1777$var$exception("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
        if (type$1.multi) throw new $cfcf25c51c3b1777$var$exception("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
    });
    explicit.forEach(function(type$1) {
        if (!(type$1 instanceof $cfcf25c51c3b1777$var$type)) throw new $cfcf25c51c3b1777$var$exception("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    });
    var result = Object.create($cfcf25c51c3b1777$var$Schema$1.prototype);
    result.implicit = (this.implicit || []).concat(implicit);
    result.explicit = (this.explicit || []).concat(explicit);
    result.compiledImplicit = $cfcf25c51c3b1777$var$compileList(result, "implicit");
    result.compiledExplicit = $cfcf25c51c3b1777$var$compileList(result, "explicit");
    result.compiledTypeMap = $cfcf25c51c3b1777$var$compileMap(result.compiledImplicit, result.compiledExplicit);
    return result;
};
var $cfcf25c51c3b1777$var$schema = $cfcf25c51c3b1777$var$Schema$1;
var $cfcf25c51c3b1777$var$str = new $cfcf25c51c3b1777$var$type("tag:yaml.org,2002:str", {
    kind: "scalar",
    construct: function(data) {
        return data !== null ? data : "";
    }
});
var $cfcf25c51c3b1777$var$seq = new $cfcf25c51c3b1777$var$type("tag:yaml.org,2002:seq", {
    kind: "sequence",
    construct: function(data) {
        return data !== null ? data : [];
    }
});
var $cfcf25c51c3b1777$var$map = new $cfcf25c51c3b1777$var$type("tag:yaml.org,2002:map", {
    kind: "mapping",
    construct: function(data) {
        return data !== null ? data : {};
    }
});
var $cfcf25c51c3b1777$var$failsafe = new $cfcf25c51c3b1777$var$schema({
    explicit: [
        $cfcf25c51c3b1777$var$str,
        $cfcf25c51c3b1777$var$seq,
        $cfcf25c51c3b1777$var$map
    ]
});
function $cfcf25c51c3b1777$var$resolveYamlNull(data) {
    if (data === null) return true;
    var max = data.length;
    return max === 1 && data === "~" || max === 4 && (data === "null" || data === "Null" || data === "NULL");
}
function $cfcf25c51c3b1777$var$constructYamlNull() {
    return null;
}
function $cfcf25c51c3b1777$var$isNull(object) {
    return object === null;
}
var $cfcf25c51c3b1777$var$_null = new $cfcf25c51c3b1777$var$type("tag:yaml.org,2002:null", {
    kind: "scalar",
    resolve: $cfcf25c51c3b1777$var$resolveYamlNull,
    construct: $cfcf25c51c3b1777$var$constructYamlNull,
    predicate: $cfcf25c51c3b1777$var$isNull,
    represent: {
        canonical: function() {
            return "~";
        },
        lowercase: function() {
            return "null";
        },
        uppercase: function() {
            return "NULL";
        },
        camelcase: function() {
            return "Null";
        },
        empty: function() {
            return "";
        }
    },
    defaultStyle: "lowercase"
});
function $cfcf25c51c3b1777$var$resolveYamlBoolean(data) {
    if (data === null) return false;
    var max = data.length;
    return max === 4 && (data === "true" || data === "True" || data === "TRUE") || max === 5 && (data === "false" || data === "False" || data === "FALSE");
}
function $cfcf25c51c3b1777$var$constructYamlBoolean(data) {
    return data === "true" || data === "True" || data === "TRUE";
}
function $cfcf25c51c3b1777$var$isBoolean(object) {
    return Object.prototype.toString.call(object) === "[object Boolean]";
}
var $cfcf25c51c3b1777$var$bool = new $cfcf25c51c3b1777$var$type("tag:yaml.org,2002:bool", {
    kind: "scalar",
    resolve: $cfcf25c51c3b1777$var$resolveYamlBoolean,
    construct: $cfcf25c51c3b1777$var$constructYamlBoolean,
    predicate: $cfcf25c51c3b1777$var$isBoolean,
    represent: {
        lowercase: function(object) {
            return object ? "true" : "false";
        },
        uppercase: function(object) {
            return object ? "TRUE" : "FALSE";
        },
        camelcase: function(object) {
            return object ? "True" : "False";
        }
    },
    defaultStyle: "lowercase"
});
function $cfcf25c51c3b1777$var$isHexCode(c) {
    return 0x30 /* 0 */  <= c && c <= 0x39 /* 9 */  || 0x41 /* A */  <= c && c <= 0x46 /* F */  || 0x61 /* a */  <= c && c <= 0x66 /* f */ ;
}
function $cfcf25c51c3b1777$var$isOctCode(c) {
    return 0x30 /* 0 */  <= c && c <= 0x37 /* 7 */ ;
}
function $cfcf25c51c3b1777$var$isDecCode(c) {
    return 0x30 /* 0 */  <= c && c <= 0x39 /* 9 */ ;
}
function $cfcf25c51c3b1777$var$resolveYamlInteger(data) {
    if (data === null) return false;
    var max = data.length, index = 0, hasDigits = false, ch;
    if (!max) return false;
    ch = data[index];
    // sign
    if (ch === "-" || ch === "+") ch = data[++index];
    if (ch === "0") {
        // 0
        if (index + 1 === max) return true;
        ch = data[++index];
        // base 2, base 8, base 16
        if (ch === "b") {
            // base 2
            index++;
            for(; index < max; index++){
                ch = data[index];
                if (ch === "_") continue;
                if (ch !== "0" && ch !== "1") return false;
                hasDigits = true;
            }
            return hasDigits && ch !== "_";
        }
        if (ch === "x") {
            // base 16
            index++;
            for(; index < max; index++){
                ch = data[index];
                if (ch === "_") continue;
                if (!$cfcf25c51c3b1777$var$isHexCode(data.charCodeAt(index))) return false;
                hasDigits = true;
            }
            return hasDigits && ch !== "_";
        }
        if (ch === "o") {
            // base 8
            index++;
            for(; index < max; index++){
                ch = data[index];
                if (ch === "_") continue;
                if (!$cfcf25c51c3b1777$var$isOctCode(data.charCodeAt(index))) return false;
                hasDigits = true;
            }
            return hasDigits && ch !== "_";
        }
    }
    // base 10 (except 0)
    // value should not start with `_`;
    if (ch === "_") return false;
    for(; index < max; index++){
        ch = data[index];
        if (ch === "_") continue;
        if (!$cfcf25c51c3b1777$var$isDecCode(data.charCodeAt(index))) return false;
        hasDigits = true;
    }
    // Should have digits and should not end with `_`
    if (!hasDigits || ch === "_") return false;
    return true;
}
function $cfcf25c51c3b1777$var$constructYamlInteger(data) {
    var value = data, sign = 1, ch;
    if (value.indexOf("_") !== -1) value = value.replace(/_/g, "");
    ch = value[0];
    if (ch === "-" || ch === "+") {
        if (ch === "-") sign = -1;
        value = value.slice(1);
        ch = value[0];
    }
    if (value === "0") return 0;
    if (ch === "0") {
        if (value[1] === "b") return sign * parseInt(value.slice(2), 2);
        if (value[1] === "x") return sign * parseInt(value.slice(2), 16);
        if (value[1] === "o") return sign * parseInt(value.slice(2), 8);
    }
    return sign * parseInt(value, 10);
}
function $cfcf25c51c3b1777$var$isInteger(object) {
    return Object.prototype.toString.call(object) === "[object Number]" && object % 1 === 0 && !$cfcf25c51c3b1777$var$common.isNegativeZero(object);
}
var $cfcf25c51c3b1777$var$int = new $cfcf25c51c3b1777$var$type("tag:yaml.org,2002:int", {
    kind: "scalar",
    resolve: $cfcf25c51c3b1777$var$resolveYamlInteger,
    construct: $cfcf25c51c3b1777$var$constructYamlInteger,
    predicate: $cfcf25c51c3b1777$var$isInteger,
    represent: {
        binary: function(obj) {
            return obj >= 0 ? "0b" + obj.toString(2) : "-0b" + obj.toString(2).slice(1);
        },
        octal: function(obj) {
            return obj >= 0 ? "0o" + obj.toString(8) : "-0o" + obj.toString(8).slice(1);
        },
        decimal: function(obj) {
            return obj.toString(10);
        },
        /* eslint-disable max-len */ hexadecimal: function(obj) {
            return obj >= 0 ? "0x" + obj.toString(16).toUpperCase() : "-0x" + obj.toString(16).toUpperCase().slice(1);
        }
    },
    defaultStyle: "decimal",
    styleAliases: {
        binary: [
            2,
            "bin"
        ],
        octal: [
            8,
            "oct"
        ],
        decimal: [
            10,
            "dec"
        ],
        hexadecimal: [
            16,
            "hex"
        ]
    }
});
var $cfcf25c51c3b1777$var$YAML_FLOAT_PATTERN = new RegExp(// 2.5e4, 2.5 and integers
"^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
function $cfcf25c51c3b1777$var$resolveYamlFloat(data) {
    if (data === null) return false;
    if (!$cfcf25c51c3b1777$var$YAML_FLOAT_PATTERN.test(data) || // Quick hack to not allow integers end with `_`
    // Probably should update regexp & check speed
    data[data.length - 1] === "_") return false;
    return true;
}
function $cfcf25c51c3b1777$var$constructYamlFloat(data) {
    var value, sign;
    value = data.replace(/_/g, "").toLowerCase();
    sign = value[0] === "-" ? -1 : 1;
    if ("+-".indexOf(value[0]) >= 0) value = value.slice(1);
    if (value === ".inf") return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
    else if (value === ".nan") return NaN;
    return sign * parseFloat(value, 10);
}
var $cfcf25c51c3b1777$var$SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
function $cfcf25c51c3b1777$var$representYamlFloat(object, style) {
    var res;
    if (isNaN(object)) switch(style){
        case "lowercase":
            return ".nan";
        case "uppercase":
            return ".NAN";
        case "camelcase":
            return ".NaN";
    }
    else if (Number.POSITIVE_INFINITY === object) switch(style){
        case "lowercase":
            return ".inf";
        case "uppercase":
            return ".INF";
        case "camelcase":
            return ".Inf";
    }
    else if (Number.NEGATIVE_INFINITY === object) switch(style){
        case "lowercase":
            return "-.inf";
        case "uppercase":
            return "-.INF";
        case "camelcase":
            return "-.Inf";
    }
    else if ($cfcf25c51c3b1777$var$common.isNegativeZero(object)) return "-0.0";
    res = object.toString(10);
    // JS stringifier can build scientific format without dots: 5e-100,
    // while YAML requres dot: 5.e-100. Fix it with simple hack
    return $cfcf25c51c3b1777$var$SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
}
function $cfcf25c51c3b1777$var$isFloat(object) {
    return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 !== 0 || $cfcf25c51c3b1777$var$common.isNegativeZero(object));
}
var $cfcf25c51c3b1777$var$float = new $cfcf25c51c3b1777$var$type("tag:yaml.org,2002:float", {
    kind: "scalar",
    resolve: $cfcf25c51c3b1777$var$resolveYamlFloat,
    construct: $cfcf25c51c3b1777$var$constructYamlFloat,
    predicate: $cfcf25c51c3b1777$var$isFloat,
    represent: $cfcf25c51c3b1777$var$representYamlFloat,
    defaultStyle: "lowercase"
});
var $cfcf25c51c3b1777$var$json = $cfcf25c51c3b1777$var$failsafe.extend({
    implicit: [
        $cfcf25c51c3b1777$var$_null,
        $cfcf25c51c3b1777$var$bool,
        $cfcf25c51c3b1777$var$int,
        $cfcf25c51c3b1777$var$float
    ]
});
var $cfcf25c51c3b1777$var$core = $cfcf25c51c3b1777$var$json;
var $cfcf25c51c3b1777$var$YAML_DATE_REGEXP = new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"); // [3] day
var $cfcf25c51c3b1777$var$YAML_TIMESTAMP_REGEXP = new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"); // [11] tz_minute
function $cfcf25c51c3b1777$var$resolveYamlTimestamp(data) {
    if (data === null) return false;
    if ($cfcf25c51c3b1777$var$YAML_DATE_REGEXP.exec(data) !== null) return true;
    if ($cfcf25c51c3b1777$var$YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
    return false;
}
function $cfcf25c51c3b1777$var$constructYamlTimestamp(data) {
    var match, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;
    match = $cfcf25c51c3b1777$var$YAML_DATE_REGEXP.exec(data);
    if (match === null) match = $cfcf25c51c3b1777$var$YAML_TIMESTAMP_REGEXP.exec(data);
    if (match === null) throw new Error("Date resolve error");
    // match: [1] year [2] month [3] day
    year = +match[1];
    month = +match[2] - 1; // JS month starts with 0
    day = +match[3];
    if (!match[4]) return new Date(Date.UTC(year, month, day));
    // match: [4] hour [5] minute [6] second [7] fraction
    hour = +match[4];
    minute = +match[5];
    second = +match[6];
    if (match[7]) {
        fraction = match[7].slice(0, 3);
        while(fraction.length < 3)fraction += "0";
        fraction = +fraction;
    }
    // match: [8] tz [9] tz_sign [10] tz_hour [11] tz_minute
    if (match[9]) {
        tz_hour = +match[10];
        tz_minute = +(match[11] || 0);
        delta = (tz_hour * 60 + tz_minute) * 60000; // delta in mili-seconds
        if (match[9] === "-") delta = -delta;
    }
    date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
    if (delta) date.setTime(date.getTime() - delta);
    return date;
}
function $cfcf25c51c3b1777$var$representYamlTimestamp(object /*, style*/ ) {
    return object.toISOString();
}
var $cfcf25c51c3b1777$var$timestamp = new $cfcf25c51c3b1777$var$type("tag:yaml.org,2002:timestamp", {
    kind: "scalar",
    resolve: $cfcf25c51c3b1777$var$resolveYamlTimestamp,
    construct: $cfcf25c51c3b1777$var$constructYamlTimestamp,
    instanceOf: Date,
    represent: $cfcf25c51c3b1777$var$representYamlTimestamp
});
function $cfcf25c51c3b1777$var$resolveYamlMerge(data) {
    return data === "<<" || data === null;
}
var $cfcf25c51c3b1777$var$merge = new $cfcf25c51c3b1777$var$type("tag:yaml.org,2002:merge", {
    kind: "scalar",
    resolve: $cfcf25c51c3b1777$var$resolveYamlMerge
});
/*eslint-disable no-bitwise*/ // [ 64, 65, 66 ] -> [ padding, CR, LF ]
var $cfcf25c51c3b1777$var$BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
function $cfcf25c51c3b1777$var$resolveYamlBinary(data) {
    if (data === null) return false;
    var code, idx, bitlen = 0, max = data.length, map2 = $cfcf25c51c3b1777$var$BASE64_MAP;
    // Convert one by one.
    for(idx = 0; idx < max; idx++){
        code = map2.indexOf(data.charAt(idx));
        // Skip CR/LF
        if (code > 64) continue;
        // Fail on illegal characters
        if (code < 0) return false;
        bitlen += 6;
    }
    // If there are any bits left, source was corrupted
    return bitlen % 8 === 0;
}
function $cfcf25c51c3b1777$var$constructYamlBinary(data) {
    var idx, tailbits, input = data.replace(/[\r\n=]/g, ""), max = input.length, map3 = $cfcf25c51c3b1777$var$BASE64_MAP, bits = 0, result = [];
    // Collect by 6*4 bits (3 bytes)
    for(idx = 0; idx < max; idx++){
        if (idx % 4 === 0 && idx) {
            result.push(bits >> 16 & 0xFF);
            result.push(bits >> 8 & 0xFF);
            result.push(bits & 0xFF);
        }
        bits = bits << 6 | map3.indexOf(input.charAt(idx));
    }
    // Dump tail
    tailbits = max % 4 * 6;
    if (tailbits === 0) {
        result.push(bits >> 16 & 0xFF);
        result.push(bits >> 8 & 0xFF);
        result.push(bits & 0xFF);
    } else if (tailbits === 18) {
        result.push(bits >> 10 & 0xFF);
        result.push(bits >> 2 & 0xFF);
    } else if (tailbits === 12) result.push(bits >> 4 & 0xFF);
    return new Uint8Array(result);
}
function $cfcf25c51c3b1777$var$representYamlBinary(object /*, style*/ ) {
    var result = "", bits = 0, idx, tail, max = object.length, map4 = $cfcf25c51c3b1777$var$BASE64_MAP;
    // Convert every three bytes to 4 ASCII characters.
    for(idx = 0; idx < max; idx++){
        if (idx % 3 === 0 && idx) {
            result += map4[bits >> 18 & 0x3F];
            result += map4[bits >> 12 & 0x3F];
            result += map4[bits >> 6 & 0x3F];
            result += map4[bits & 0x3F];
        }
        bits = (bits << 8) + object[idx];
    }
    // Dump tail
    tail = max % 3;
    if (tail === 0) {
        result += map4[bits >> 18 & 0x3F];
        result += map4[bits >> 12 & 0x3F];
        result += map4[bits >> 6 & 0x3F];
        result += map4[bits & 0x3F];
    } else if (tail === 2) {
        result += map4[bits >> 10 & 0x3F];
        result += map4[bits >> 4 & 0x3F];
        result += map4[bits << 2 & 0x3F];
        result += map4[64];
    } else if (tail === 1) {
        result += map4[bits >> 2 & 0x3F];
        result += map4[bits << 4 & 0x3F];
        result += map4[64];
        result += map4[64];
    }
    return result;
}
function $cfcf25c51c3b1777$var$isBinary(obj) {
    return Object.prototype.toString.call(obj) === "[object Uint8Array]";
}
var $cfcf25c51c3b1777$var$binary = new $cfcf25c51c3b1777$var$type("tag:yaml.org,2002:binary", {
    kind: "scalar",
    resolve: $cfcf25c51c3b1777$var$resolveYamlBinary,
    construct: $cfcf25c51c3b1777$var$constructYamlBinary,
    predicate: $cfcf25c51c3b1777$var$isBinary,
    represent: $cfcf25c51c3b1777$var$representYamlBinary
});
var $cfcf25c51c3b1777$var$_hasOwnProperty$3 = Object.prototype.hasOwnProperty;
var $cfcf25c51c3b1777$var$_toString$2 = Object.prototype.toString;
function $cfcf25c51c3b1777$var$resolveYamlOmap(data) {
    if (data === null) return true;
    var objectKeys = [], index, length, pair, pairKey, pairHasKey, object = data;
    for(index = 0, length = object.length; index < length; index += 1){
        pair = object[index];
        pairHasKey = false;
        if ($cfcf25c51c3b1777$var$_toString$2.call(pair) !== "[object Object]") return false;
        for(pairKey in pair)if ($cfcf25c51c3b1777$var$_hasOwnProperty$3.call(pair, pairKey)) {
            if (!pairHasKey) pairHasKey = true;
            else return false;
        }
        if (!pairHasKey) return false;
        if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
        else return false;
    }
    return true;
}
function $cfcf25c51c3b1777$var$constructYamlOmap(data) {
    return data !== null ? data : [];
}
var $cfcf25c51c3b1777$var$omap = new $cfcf25c51c3b1777$var$type("tag:yaml.org,2002:omap", {
    kind: "sequence",
    resolve: $cfcf25c51c3b1777$var$resolveYamlOmap,
    construct: $cfcf25c51c3b1777$var$constructYamlOmap
});
var $cfcf25c51c3b1777$var$_toString$1 = Object.prototype.toString;
function $cfcf25c51c3b1777$var$resolveYamlPairs(data) {
    if (data === null) return true;
    var index, length, pair, keys, result, object = data;
    result = new Array(object.length);
    for(index = 0, length = object.length; index < length; index += 1){
        pair = object[index];
        if ($cfcf25c51c3b1777$var$_toString$1.call(pair) !== "[object Object]") return false;
        keys = Object.keys(pair);
        if (keys.length !== 1) return false;
        result[index] = [
            keys[0],
            pair[keys[0]]
        ];
    }
    return true;
}
function $cfcf25c51c3b1777$var$constructYamlPairs(data) {
    if (data === null) return [];
    var index, length, pair, keys, result, object = data;
    result = new Array(object.length);
    for(index = 0, length = object.length; index < length; index += 1){
        pair = object[index];
        keys = Object.keys(pair);
        result[index] = [
            keys[0],
            pair[keys[0]]
        ];
    }
    return result;
}
var $cfcf25c51c3b1777$var$pairs = new $cfcf25c51c3b1777$var$type("tag:yaml.org,2002:pairs", {
    kind: "sequence",
    resolve: $cfcf25c51c3b1777$var$resolveYamlPairs,
    construct: $cfcf25c51c3b1777$var$constructYamlPairs
});
var $cfcf25c51c3b1777$var$_hasOwnProperty$2 = Object.prototype.hasOwnProperty;
function $cfcf25c51c3b1777$var$resolveYamlSet(data) {
    if (data === null) return true;
    var key, object = data;
    for(key in object)if ($cfcf25c51c3b1777$var$_hasOwnProperty$2.call(object, key)) {
        if (object[key] !== null) return false;
    }
    return true;
}
function $cfcf25c51c3b1777$var$constructYamlSet(data) {
    return data !== null ? data : {};
}
var $cfcf25c51c3b1777$var$set = new $cfcf25c51c3b1777$var$type("tag:yaml.org,2002:set", {
    kind: "mapping",
    resolve: $cfcf25c51c3b1777$var$resolveYamlSet,
    construct: $cfcf25c51c3b1777$var$constructYamlSet
});
var $cfcf25c51c3b1777$var$_default = $cfcf25c51c3b1777$var$core.extend({
    implicit: [
        $cfcf25c51c3b1777$var$timestamp,
        $cfcf25c51c3b1777$var$merge
    ],
    explicit: [
        $cfcf25c51c3b1777$var$binary,
        $cfcf25c51c3b1777$var$omap,
        $cfcf25c51c3b1777$var$pairs,
        $cfcf25c51c3b1777$var$set
    ]
});
/*eslint-disable max-len,no-use-before-define*/ var $cfcf25c51c3b1777$var$_hasOwnProperty$1 = Object.prototype.hasOwnProperty;
var $cfcf25c51c3b1777$var$CONTEXT_FLOW_IN = 1;
var $cfcf25c51c3b1777$var$CONTEXT_FLOW_OUT = 2;
var $cfcf25c51c3b1777$var$CONTEXT_BLOCK_IN = 3;
var $cfcf25c51c3b1777$var$CONTEXT_BLOCK_OUT = 4;
var $cfcf25c51c3b1777$var$CHOMPING_CLIP = 1;
var $cfcf25c51c3b1777$var$CHOMPING_STRIP = 2;
var $cfcf25c51c3b1777$var$CHOMPING_KEEP = 3;
var $cfcf25c51c3b1777$var$PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
var $cfcf25c51c3b1777$var$PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
var $cfcf25c51c3b1777$var$PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
var $cfcf25c51c3b1777$var$PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
var $cfcf25c51c3b1777$var$PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function $cfcf25c51c3b1777$var$_class(obj) {
    return Object.prototype.toString.call(obj);
}
function $cfcf25c51c3b1777$var$is_EOL(c) {
    return c === 0x0A /* LF */  || c === 0x0D /* CR */ ;
}
function $cfcf25c51c3b1777$var$is_WHITE_SPACE(c) {
    return c === 0x09 /* Tab */  || c === 0x20 /* Space */ ;
}
function $cfcf25c51c3b1777$var$is_WS_OR_EOL(c) {
    return c === 0x09 /* Tab */  || c === 0x20 /* Space */  || c === 0x0A /* LF */  || c === 0x0D /* CR */ ;
}
function $cfcf25c51c3b1777$var$is_FLOW_INDICATOR(c) {
    return c === 0x2C /* , */  || c === 0x5B /* [ */  || c === 0x5D /* ] */  || c === 0x7B /* { */  || c === 0x7D /* } */ ;
}
function $cfcf25c51c3b1777$var$fromHexCode(c) {
    var lc;
    if (0x30 /* 0 */  <= c && c <= 0x39 /* 9 */ ) return c - 0x30;
    /*eslint-disable no-bitwise*/ lc = c | 0x20;
    if (0x61 /* a */  <= lc && lc <= 0x66 /* f */ ) return lc - 0x61 + 10;
    return -1;
}
function $cfcf25c51c3b1777$var$escapedHexLen(c) {
    if (c === 0x78 /* x */ ) return 2;
    if (c === 0x75 /* u */ ) return 4;
    if (c === 0x55 /* U */ ) return 8;
    return 0;
}
function $cfcf25c51c3b1777$var$fromDecimalCode(c) {
    if (0x30 /* 0 */  <= c && c <= 0x39 /* 9 */ ) return c - 0x30;
    return -1;
}
function $cfcf25c51c3b1777$var$simpleEscapeSequence(c) {
    /* eslint-disable indent */ return c === 0x30 /* 0 */  ? "\0" : c === 0x61 /* a */  ? "\x07" : c === 0x62 /* b */  ? "\b" : c === 0x74 /* t */  ? "	" : c === 0x09 /* Tab */  ? "	" : c === 0x6E /* n */  ? "\n" : c === 0x76 /* v */  ? "\v" : c === 0x66 /* f */  ? "\f" : c === 0x72 /* r */  ? "\r" : c === 0x65 /* e */  ? "\x1b" : c === 0x20 /* Space */  ? " " : c === 0x22 /* " */  ? '"' : c === 0x2F /* / */  ? "/" : c === 0x5C /* \ */  ? "\\" : c === 0x4E /* N */  ? "\x85" : c === 0x5F /* _ */  ? "\xa0" : c === 0x4C /* L */  ? "\u2028" : c === 0x50 /* P */  ? "\u2029" : "";
}
function $cfcf25c51c3b1777$var$charFromCodepoint(c) {
    if (c <= 0xFFFF) return String.fromCharCode(c);
    // Encode UTF-16 surrogate pair
    // https://en.wikipedia.org/wiki/UTF-16#Code_points_U.2B010000_to_U.2B10FFFF
    return String.fromCharCode((c - 0x010000 >> 10) + 0xD800, (c - 0x010000 & 0x03FF) + 0xDC00);
}
var $cfcf25c51c3b1777$var$simpleEscapeCheck = new Array(256); // integer, for fast access
var $cfcf25c51c3b1777$var$simpleEscapeMap = new Array(256);
for(var $cfcf25c51c3b1777$var$i = 0; $cfcf25c51c3b1777$var$i < 256; $cfcf25c51c3b1777$var$i++){
    $cfcf25c51c3b1777$var$simpleEscapeCheck[$cfcf25c51c3b1777$var$i] = $cfcf25c51c3b1777$var$simpleEscapeSequence($cfcf25c51c3b1777$var$i) ? 1 : 0;
    $cfcf25c51c3b1777$var$simpleEscapeMap[$cfcf25c51c3b1777$var$i] = $cfcf25c51c3b1777$var$simpleEscapeSequence($cfcf25c51c3b1777$var$i);
}
function $cfcf25c51c3b1777$var$State$1(input, options) {
    this.input = input;
    this.filename = options["filename"] || null;
    this.schema = options["schema"] || $cfcf25c51c3b1777$var$_default;
    this.onWarning = options["onWarning"] || null;
    // (Hidden) Remove? makes the loader to expect YAML 1.1 documents
    // if such documents have no explicit %YAML directive
    this.legacy = options["legacy"] || false;
    this.json = options["json"] || false;
    this.listener = options["listener"] || null;
    this.implicitTypes = this.schema.compiledImplicit;
    this.typeMap = this.schema.compiledTypeMap;
    this.length = input.length;
    this.position = 0;
    this.line = 0;
    this.lineStart = 0;
    this.lineIndent = 0;
    // position of first leading tab in the current line,
    // used to make sure there are no tabs in the indentation
    this.firstTabInLine = -1;
    this.documents = [];
/*
  this.version;
  this.checkLineBreaks;
  this.tagMap;
  this.anchorMap;
  this.tag;
  this.anchor;
  this.kind;
  this.result;*/ }
function $cfcf25c51c3b1777$var$generateError(state, message) {
    var mark = {
        name: state.filename,
        buffer: state.input.slice(0, -1),
        position: state.position,
        line: state.line,
        column: state.position - state.lineStart
    };
    mark.snippet = $cfcf25c51c3b1777$var$snippet(mark);
    return new $cfcf25c51c3b1777$var$exception(message, mark);
}
function $cfcf25c51c3b1777$var$throwError(state, message) {
    throw $cfcf25c51c3b1777$var$generateError(state, message);
}
function $cfcf25c51c3b1777$var$throwWarning(state, message) {
    if (state.onWarning) state.onWarning.call(null, $cfcf25c51c3b1777$var$generateError(state, message));
}
var $cfcf25c51c3b1777$var$directiveHandlers = {
    YAML: function handleYamlDirective(state, name, args) {
        var match, major, minor;
        if (state.version !== null) $cfcf25c51c3b1777$var$throwError(state, "duplication of %YAML directive");
        if (args.length !== 1) $cfcf25c51c3b1777$var$throwError(state, "YAML directive accepts exactly one argument");
        match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
        if (match === null) $cfcf25c51c3b1777$var$throwError(state, "ill-formed argument of the YAML directive");
        major = parseInt(match[1], 10);
        minor = parseInt(match[2], 10);
        if (major !== 1) $cfcf25c51c3b1777$var$throwError(state, "unacceptable YAML version of the document");
        state.version = args[0];
        state.checkLineBreaks = minor < 2;
        if (minor !== 1 && minor !== 2) $cfcf25c51c3b1777$var$throwWarning(state, "unsupported YAML version of the document");
    },
    TAG: function handleTagDirective(state, name, args) {
        var handle, prefix;
        if (args.length !== 2) $cfcf25c51c3b1777$var$throwError(state, "TAG directive accepts exactly two arguments");
        handle = args[0];
        prefix = args[1];
        if (!$cfcf25c51c3b1777$var$PATTERN_TAG_HANDLE.test(handle)) $cfcf25c51c3b1777$var$throwError(state, "ill-formed tag handle (first argument) of the TAG directive");
        if ($cfcf25c51c3b1777$var$_hasOwnProperty$1.call(state.tagMap, handle)) $cfcf25c51c3b1777$var$throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
        if (!$cfcf25c51c3b1777$var$PATTERN_TAG_URI.test(prefix)) $cfcf25c51c3b1777$var$throwError(state, "ill-formed tag prefix (second argument) of the TAG directive");
        try {
            prefix = decodeURIComponent(prefix);
        } catch (err) {
            $cfcf25c51c3b1777$var$throwError(state, "tag prefix is malformed: " + prefix);
        }
        state.tagMap[handle] = prefix;
    }
};
function $cfcf25c51c3b1777$var$captureSegment(state, start, end, checkJson) {
    var _position, _length, _character, _result;
    if (start < end) {
        _result = state.input.slice(start, end);
        if (checkJson) for(_position = 0, _length = _result.length; _position < _length; _position += 1){
            _character = _result.charCodeAt(_position);
            if (!(_character === 0x09 || 0x20 <= _character && _character <= 0x10FFFF)) $cfcf25c51c3b1777$var$throwError(state, "expected valid JSON character");
        }
        else if ($cfcf25c51c3b1777$var$PATTERN_NON_PRINTABLE.test(_result)) $cfcf25c51c3b1777$var$throwError(state, "the stream contains non-printable characters");
        state.result += _result;
    }
}
function $cfcf25c51c3b1777$var$mergeMappings(state, destination, source, overridableKeys) {
    var sourceKeys, key, index, quantity;
    if (!$cfcf25c51c3b1777$var$common.isObject(source)) $cfcf25c51c3b1777$var$throwError(state, "cannot merge mappings; the provided source object is unacceptable");
    sourceKeys = Object.keys(source);
    for(index = 0, quantity = sourceKeys.length; index < quantity; index += 1){
        key = sourceKeys[index];
        if (!$cfcf25c51c3b1777$var$_hasOwnProperty$1.call(destination, key)) {
            destination[key] = source[key];
            overridableKeys[key] = true;
        }
    }
}
function $cfcf25c51c3b1777$var$storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startLineStart, startPos) {
    var index, quantity;
    // The output is a plain object here, so keys can only be strings.
    // We need to convert keyNode to a string, but doing so can hang the process
    // (deeply nested arrays that explode exponentially using aliases).
    if (Array.isArray(keyNode)) {
        keyNode = Array.prototype.slice.call(keyNode);
        for(index = 0, quantity = keyNode.length; index < quantity; index += 1){
            if (Array.isArray(keyNode[index])) $cfcf25c51c3b1777$var$throwError(state, "nested arrays are not supported inside keys");
            if (typeof keyNode === "object" && $cfcf25c51c3b1777$var$_class(keyNode[index]) === "[object Object]") keyNode[index] = "[object Object]";
        }
    }
    // Avoid code execution in load() via toString property
    // (still use its own toString for arrays, timestamps,
    // and whatever user schema extensions happen to have @@toStringTag)
    if (typeof keyNode === "object" && $cfcf25c51c3b1777$var$_class(keyNode) === "[object Object]") keyNode = "[object Object]";
    keyNode = String(keyNode);
    if (_result === null) _result = {};
    if (keyTag === "tag:yaml.org,2002:merge") {
        if (Array.isArray(valueNode)) for(index = 0, quantity = valueNode.length; index < quantity; index += 1)$cfcf25c51c3b1777$var$mergeMappings(state, _result, valueNode[index], overridableKeys);
        else $cfcf25c51c3b1777$var$mergeMappings(state, _result, valueNode, overridableKeys);
    } else {
        if (!state.json && !$cfcf25c51c3b1777$var$_hasOwnProperty$1.call(overridableKeys, keyNode) && $cfcf25c51c3b1777$var$_hasOwnProperty$1.call(_result, keyNode)) {
            state.line = startLine || state.line;
            state.lineStart = startLineStart || state.lineStart;
            state.position = startPos || state.position;
            $cfcf25c51c3b1777$var$throwError(state, "duplicated mapping key");
        }
        // used for this specific key only because Object.defineProperty is slow
        if (keyNode === "__proto__") Object.defineProperty(_result, keyNode, {
            configurable: true,
            enumerable: true,
            writable: true,
            value: valueNode
        });
        else _result[keyNode] = valueNode;
        delete overridableKeys[keyNode];
    }
    return _result;
}
function $cfcf25c51c3b1777$var$readLineBreak(state) {
    var ch;
    ch = state.input.charCodeAt(state.position);
    if (ch === 0x0A /* LF */ ) state.position++;
    else if (ch === 0x0D /* CR */ ) {
        state.position++;
        if (state.input.charCodeAt(state.position) === 0x0A /* LF */ ) state.position++;
    } else $cfcf25c51c3b1777$var$throwError(state, "a line break is expected");
    state.line += 1;
    state.lineStart = state.position;
    state.firstTabInLine = -1;
}
function $cfcf25c51c3b1777$var$skipSeparationSpace(state, allowComments, checkIndent) {
    var lineBreaks = 0, ch = state.input.charCodeAt(state.position);
    while(ch !== 0){
        while($cfcf25c51c3b1777$var$is_WHITE_SPACE(ch)){
            if (ch === 0x09 /* Tab */  && state.firstTabInLine === -1) state.firstTabInLine = state.position;
            ch = state.input.charCodeAt(++state.position);
        }
        if (allowComments && ch === 0x23 /* # */ ) do ch = state.input.charCodeAt(++state.position);
        while (ch !== 0x0A /* LF */  && ch !== 0x0D /* CR */  && ch !== 0);
        if ($cfcf25c51c3b1777$var$is_EOL(ch)) {
            $cfcf25c51c3b1777$var$readLineBreak(state);
            ch = state.input.charCodeAt(state.position);
            lineBreaks++;
            state.lineIndent = 0;
            while(ch === 0x20 /* Space */ ){
                state.lineIndent++;
                ch = state.input.charCodeAt(++state.position);
            }
        } else break;
    }
    if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) $cfcf25c51c3b1777$var$throwWarning(state, "deficient indentation");
    return lineBreaks;
}
function $cfcf25c51c3b1777$var$testDocumentSeparator(state) {
    var _position = state.position, ch;
    ch = state.input.charCodeAt(_position);
    // Condition state.position === state.lineStart is tested
    // in parent on each call, for efficiency. No needs to test here again.
    if ((ch === 0x2D /* - */  || ch === 0x2E /* . */ ) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
        _position += 3;
        ch = state.input.charCodeAt(_position);
        if (ch === 0 || $cfcf25c51c3b1777$var$is_WS_OR_EOL(ch)) return true;
    }
    return false;
}
function $cfcf25c51c3b1777$var$writeFoldedLines(state, count) {
    if (count === 1) state.result += " ";
    else if (count > 1) state.result += $cfcf25c51c3b1777$var$common.repeat("\n", count - 1);
}
function $cfcf25c51c3b1777$var$readPlainScalar(state, nodeIndent, withinFlowCollection) {
    var preceding, following, captureStart, captureEnd, hasPendingContent, _line, _lineStart, _lineIndent, _kind = state.kind, _result = state.result, ch;
    ch = state.input.charCodeAt(state.position);
    if ($cfcf25c51c3b1777$var$is_WS_OR_EOL(ch) || $cfcf25c51c3b1777$var$is_FLOW_INDICATOR(ch) || ch === 0x23 /* # */  || ch === 0x26 /* & */  || ch === 0x2A /* * */  || ch === 0x21 /* ! */  || ch === 0x7C /* | */  || ch === 0x3E /* > */  || ch === 0x27 /* ' */  || ch === 0x22 /* " */  || ch === 0x25 /* % */  || ch === 0x40 /* @ */  || ch === 0x60 /* ` */ ) return false;
    if (ch === 0x3F /* ? */  || ch === 0x2D /* - */ ) {
        following = state.input.charCodeAt(state.position + 1);
        if ($cfcf25c51c3b1777$var$is_WS_OR_EOL(following) || withinFlowCollection && $cfcf25c51c3b1777$var$is_FLOW_INDICATOR(following)) return false;
    }
    state.kind = "scalar";
    state.result = "";
    captureStart = captureEnd = state.position;
    hasPendingContent = false;
    while(ch !== 0){
        if (ch === 0x3A /* : */ ) {
            following = state.input.charCodeAt(state.position + 1);
            if ($cfcf25c51c3b1777$var$is_WS_OR_EOL(following) || withinFlowCollection && $cfcf25c51c3b1777$var$is_FLOW_INDICATOR(following)) break;
        } else if (ch === 0x23 /* # */ ) {
            preceding = state.input.charCodeAt(state.position - 1);
            if ($cfcf25c51c3b1777$var$is_WS_OR_EOL(preceding)) break;
        } else if (state.position === state.lineStart && $cfcf25c51c3b1777$var$testDocumentSeparator(state) || withinFlowCollection && $cfcf25c51c3b1777$var$is_FLOW_INDICATOR(ch)) break;
        else if ($cfcf25c51c3b1777$var$is_EOL(ch)) {
            _line = state.line;
            _lineStart = state.lineStart;
            _lineIndent = state.lineIndent;
            $cfcf25c51c3b1777$var$skipSeparationSpace(state, false, -1);
            if (state.lineIndent >= nodeIndent) {
                hasPendingContent = true;
                ch = state.input.charCodeAt(state.position);
                continue;
            } else {
                state.position = captureEnd;
                state.line = _line;
                state.lineStart = _lineStart;
                state.lineIndent = _lineIndent;
                break;
            }
        }
        if (hasPendingContent) {
            $cfcf25c51c3b1777$var$captureSegment(state, captureStart, captureEnd, false);
            $cfcf25c51c3b1777$var$writeFoldedLines(state, state.line - _line);
            captureStart = captureEnd = state.position;
            hasPendingContent = false;
        }
        if (!$cfcf25c51c3b1777$var$is_WHITE_SPACE(ch)) captureEnd = state.position + 1;
        ch = state.input.charCodeAt(++state.position);
    }
    $cfcf25c51c3b1777$var$captureSegment(state, captureStart, captureEnd, false);
    if (state.result) return true;
    state.kind = _kind;
    state.result = _result;
    return false;
}
function $cfcf25c51c3b1777$var$readSingleQuotedScalar(state, nodeIndent) {
    var ch, captureStart, captureEnd;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 0x27 /* ' */ ) return false;
    state.kind = "scalar";
    state.result = "";
    state.position++;
    captureStart = captureEnd = state.position;
    while((ch = state.input.charCodeAt(state.position)) !== 0){
        if (ch === 0x27 /* ' */ ) {
            $cfcf25c51c3b1777$var$captureSegment(state, captureStart, state.position, true);
            ch = state.input.charCodeAt(++state.position);
            if (ch === 0x27 /* ' */ ) {
                captureStart = state.position;
                state.position++;
                captureEnd = state.position;
            } else return true;
        } else if ($cfcf25c51c3b1777$var$is_EOL(ch)) {
            $cfcf25c51c3b1777$var$captureSegment(state, captureStart, captureEnd, true);
            $cfcf25c51c3b1777$var$writeFoldedLines(state, $cfcf25c51c3b1777$var$skipSeparationSpace(state, false, nodeIndent));
            captureStart = captureEnd = state.position;
        } else if (state.position === state.lineStart && $cfcf25c51c3b1777$var$testDocumentSeparator(state)) $cfcf25c51c3b1777$var$throwError(state, "unexpected end of the document within a single quoted scalar");
        else {
            state.position++;
            captureEnd = state.position;
        }
    }
    $cfcf25c51c3b1777$var$throwError(state, "unexpected end of the stream within a single quoted scalar");
}
function $cfcf25c51c3b1777$var$readDoubleQuotedScalar(state, nodeIndent) {
    var captureStart, captureEnd, hexLength, hexResult, tmp, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 0x22 /* " */ ) return false;
    state.kind = "scalar";
    state.result = "";
    state.position++;
    captureStart = captureEnd = state.position;
    while((ch = state.input.charCodeAt(state.position)) !== 0){
        if (ch === 0x22 /* " */ ) {
            $cfcf25c51c3b1777$var$captureSegment(state, captureStart, state.position, true);
            state.position++;
            return true;
        } else if (ch === 0x5C /* \ */ ) {
            $cfcf25c51c3b1777$var$captureSegment(state, captureStart, state.position, true);
            ch = state.input.charCodeAt(++state.position);
            if ($cfcf25c51c3b1777$var$is_EOL(ch)) $cfcf25c51c3b1777$var$skipSeparationSpace(state, false, nodeIndent);
            else if (ch < 256 && $cfcf25c51c3b1777$var$simpleEscapeCheck[ch]) {
                state.result += $cfcf25c51c3b1777$var$simpleEscapeMap[ch];
                state.position++;
            } else if ((tmp = $cfcf25c51c3b1777$var$escapedHexLen(ch)) > 0) {
                hexLength = tmp;
                hexResult = 0;
                for(; hexLength > 0; hexLength--){
                    ch = state.input.charCodeAt(++state.position);
                    if ((tmp = $cfcf25c51c3b1777$var$fromHexCode(ch)) >= 0) hexResult = (hexResult << 4) + tmp;
                    else $cfcf25c51c3b1777$var$throwError(state, "expected hexadecimal character");
                }
                state.result += $cfcf25c51c3b1777$var$charFromCodepoint(hexResult);
                state.position++;
            } else $cfcf25c51c3b1777$var$throwError(state, "unknown escape sequence");
            captureStart = captureEnd = state.position;
        } else if ($cfcf25c51c3b1777$var$is_EOL(ch)) {
            $cfcf25c51c3b1777$var$captureSegment(state, captureStart, captureEnd, true);
            $cfcf25c51c3b1777$var$writeFoldedLines(state, $cfcf25c51c3b1777$var$skipSeparationSpace(state, false, nodeIndent));
            captureStart = captureEnd = state.position;
        } else if (state.position === state.lineStart && $cfcf25c51c3b1777$var$testDocumentSeparator(state)) $cfcf25c51c3b1777$var$throwError(state, "unexpected end of the document within a double quoted scalar");
        else {
            state.position++;
            captureEnd = state.position;
        }
    }
    $cfcf25c51c3b1777$var$throwError(state, "unexpected end of the stream within a double quoted scalar");
}
function $cfcf25c51c3b1777$var$readFlowCollection(state, nodeIndent) {
    var readNext = true, _line, _lineStart, _pos, _tag = state.tag, _result, _anchor = state.anchor, following, terminator, isPair, isExplicitPair, isMapping, overridableKeys = Object.create(null), keyNode, keyTag, valueNode, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch === 0x5B /* [ */ ) {
        terminator = 0x5D; /* ] */ 
        isMapping = false;
        _result = [];
    } else if (ch === 0x7B /* { */ ) {
        terminator = 0x7D; /* } */ 
        isMapping = true;
        _result = {};
    } else return false;
    if (state.anchor !== null) state.anchorMap[state.anchor] = _result;
    ch = state.input.charCodeAt(++state.position);
    while(ch !== 0){
        $cfcf25c51c3b1777$var$skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if (ch === terminator) {
            state.position++;
            state.tag = _tag;
            state.anchor = _anchor;
            state.kind = isMapping ? "mapping" : "sequence";
            state.result = _result;
            return true;
        } else if (!readNext) $cfcf25c51c3b1777$var$throwError(state, "missed comma between flow collection entries");
        else if (ch === 0x2C /* , */ ) // "flow collection entries can never be completely empty", as per YAML 1.2, section 7.4
        $cfcf25c51c3b1777$var$throwError(state, "expected the node content, but found ','");
        keyTag = keyNode = valueNode = null;
        isPair = isExplicitPair = false;
        if (ch === 0x3F /* ? */ ) {
            following = state.input.charCodeAt(state.position + 1);
            if ($cfcf25c51c3b1777$var$is_WS_OR_EOL(following)) {
                isPair = isExplicitPair = true;
                state.position++;
                $cfcf25c51c3b1777$var$skipSeparationSpace(state, true, nodeIndent);
            }
        }
        _line = state.line; // Save the current line.
        _lineStart = state.lineStart;
        _pos = state.position;
        $cfcf25c51c3b1777$var$composeNode(state, nodeIndent, $cfcf25c51c3b1777$var$CONTEXT_FLOW_IN, false, true);
        keyTag = state.tag;
        keyNode = state.result;
        $cfcf25c51c3b1777$var$skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if ((isExplicitPair || state.line === _line) && ch === 0x3A /* : */ ) {
            isPair = true;
            ch = state.input.charCodeAt(++state.position);
            $cfcf25c51c3b1777$var$skipSeparationSpace(state, true, nodeIndent);
            $cfcf25c51c3b1777$var$composeNode(state, nodeIndent, $cfcf25c51c3b1777$var$CONTEXT_FLOW_IN, false, true);
            valueNode = state.result;
        }
        if (isMapping) $cfcf25c51c3b1777$var$storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos);
        else if (isPair) _result.push($cfcf25c51c3b1777$var$storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos));
        else _result.push(keyNode);
        $cfcf25c51c3b1777$var$skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if (ch === 0x2C /* , */ ) {
            readNext = true;
            ch = state.input.charCodeAt(++state.position);
        } else readNext = false;
    }
    $cfcf25c51c3b1777$var$throwError(state, "unexpected end of the stream within a flow collection");
}
function $cfcf25c51c3b1777$var$readBlockScalar(state, nodeIndent) {
    var captureStart, folding, chomping = $cfcf25c51c3b1777$var$CHOMPING_CLIP, didReadContent = false, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false, tmp, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch === 0x7C /* | */ ) folding = false;
    else if (ch === 0x3E /* > */ ) folding = true;
    else return false;
    state.kind = "scalar";
    state.result = "";
    while(ch !== 0){
        ch = state.input.charCodeAt(++state.position);
        if (ch === 0x2B /* + */  || ch === 0x2D /* - */ ) {
            if ($cfcf25c51c3b1777$var$CHOMPING_CLIP === chomping) chomping = ch === 0x2B /* + */  ? $cfcf25c51c3b1777$var$CHOMPING_KEEP : $cfcf25c51c3b1777$var$CHOMPING_STRIP;
            else $cfcf25c51c3b1777$var$throwError(state, "repeat of a chomping mode identifier");
        } else if ((tmp = $cfcf25c51c3b1777$var$fromDecimalCode(ch)) >= 0) {
            if (tmp === 0) $cfcf25c51c3b1777$var$throwError(state, "bad explicit indentation width of a block scalar; it cannot be less than one");
            else if (!detectedIndent) {
                textIndent = nodeIndent + tmp - 1;
                detectedIndent = true;
            } else $cfcf25c51c3b1777$var$throwError(state, "repeat of an indentation width identifier");
        } else break;
    }
    if ($cfcf25c51c3b1777$var$is_WHITE_SPACE(ch)) {
        do ch = state.input.charCodeAt(++state.position);
        while ($cfcf25c51c3b1777$var$is_WHITE_SPACE(ch));
        if (ch === 0x23 /* # */ ) do ch = state.input.charCodeAt(++state.position);
        while (!$cfcf25c51c3b1777$var$is_EOL(ch) && ch !== 0);
    }
    while(ch !== 0){
        $cfcf25c51c3b1777$var$readLineBreak(state);
        state.lineIndent = 0;
        ch = state.input.charCodeAt(state.position);
        while((!detectedIndent || state.lineIndent < textIndent) && ch === 0x20 /* Space */ ){
            state.lineIndent++;
            ch = state.input.charCodeAt(++state.position);
        }
        if (!detectedIndent && state.lineIndent > textIndent) textIndent = state.lineIndent;
        if ($cfcf25c51c3b1777$var$is_EOL(ch)) {
            emptyLines++;
            continue;
        }
        // End of the scalar.
        if (state.lineIndent < textIndent) {
            // Perform the chomping.
            if (chomping === $cfcf25c51c3b1777$var$CHOMPING_KEEP) state.result += $cfcf25c51c3b1777$var$common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
            else if (chomping === $cfcf25c51c3b1777$var$CHOMPING_CLIP) {
                if (didReadContent) state.result += "\n";
            }
            break;
        }
        // Folded style: use fancy rules to handle line breaks.
        if (folding) {
            // Lines starting with white space characters (more-indented lines) are not folded.
            if ($cfcf25c51c3b1777$var$is_WHITE_SPACE(ch)) {
                atMoreIndented = true;
                // except for the first content line (cf. Example 8.1)
                state.result += $cfcf25c51c3b1777$var$common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
            // End of more-indented block.
            } else if (atMoreIndented) {
                atMoreIndented = false;
                state.result += $cfcf25c51c3b1777$var$common.repeat("\n", emptyLines + 1);
            // Just one line break - perceive as the same line.
            } else if (emptyLines === 0) {
                if (didReadContent) state.result += " ";
            } else state.result += $cfcf25c51c3b1777$var$common.repeat("\n", emptyLines);
        // Literal style: just add exact number of line breaks between content lines.
        } else // Keep all line breaks except the header line break.
        state.result += $cfcf25c51c3b1777$var$common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
        didReadContent = true;
        detectedIndent = true;
        emptyLines = 0;
        captureStart = state.position;
        while(!$cfcf25c51c3b1777$var$is_EOL(ch) && ch !== 0)ch = state.input.charCodeAt(++state.position);
        $cfcf25c51c3b1777$var$captureSegment(state, captureStart, state.position, false);
    }
    return true;
}
function $cfcf25c51c3b1777$var$readBlockSequence(state, nodeIndent) {
    var _line, _tag = state.tag, _anchor = state.anchor, _result = [], following, detected = false, ch;
    // there is a leading tab before this token, so it can't be a block sequence/mapping;
    // it can still be flow sequence/mapping or a scalar
    if (state.firstTabInLine !== -1) return false;
    if (state.anchor !== null) state.anchorMap[state.anchor] = _result;
    ch = state.input.charCodeAt(state.position);
    while(ch !== 0){
        if (state.firstTabInLine !== -1) {
            state.position = state.firstTabInLine;
            $cfcf25c51c3b1777$var$throwError(state, "tab characters must not be used in indentation");
        }
        if (ch !== 0x2D /* - */ ) break;
        following = state.input.charCodeAt(state.position + 1);
        if (!$cfcf25c51c3b1777$var$is_WS_OR_EOL(following)) break;
        detected = true;
        state.position++;
        if ($cfcf25c51c3b1777$var$skipSeparationSpace(state, true, -1)) {
            if (state.lineIndent <= nodeIndent) {
                _result.push(null);
                ch = state.input.charCodeAt(state.position);
                continue;
            }
        }
        _line = state.line;
        $cfcf25c51c3b1777$var$composeNode(state, nodeIndent, $cfcf25c51c3b1777$var$CONTEXT_BLOCK_IN, false, true);
        _result.push(state.result);
        $cfcf25c51c3b1777$var$skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
        if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) $cfcf25c51c3b1777$var$throwError(state, "bad indentation of a sequence entry");
        else if (state.lineIndent < nodeIndent) break;
    }
    if (detected) {
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = "sequence";
        state.result = _result;
        return true;
    }
    return false;
}
function $cfcf25c51c3b1777$var$readBlockMapping(state, nodeIndent, flowIndent) {
    var following, allowCompact, _line, _keyLine, _keyLineStart, _keyPos, _tag = state.tag, _anchor = state.anchor, _result = {}, overridableKeys = Object.create(null), keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
    // there is a leading tab before this token, so it can't be a block sequence/mapping;
    // it can still be flow sequence/mapping or a scalar
    if (state.firstTabInLine !== -1) return false;
    if (state.anchor !== null) state.anchorMap[state.anchor] = _result;
    ch = state.input.charCodeAt(state.position);
    while(ch !== 0){
        if (!atExplicitKey && state.firstTabInLine !== -1) {
            state.position = state.firstTabInLine;
            $cfcf25c51c3b1777$var$throwError(state, "tab characters must not be used in indentation");
        }
        following = state.input.charCodeAt(state.position + 1);
        _line = state.line; // Save the current line.
        //
        // Explicit notation case. There are two separate blocks:
        // first for the key (denoted by "?") and second for the value (denoted by ":")
        //
        if ((ch === 0x3F /* ? */  || ch === 0x3A /* : */ ) && $cfcf25c51c3b1777$var$is_WS_OR_EOL(following)) {
            if (ch === 0x3F /* ? */ ) {
                if (atExplicitKey) {
                    $cfcf25c51c3b1777$var$storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
                    keyTag = keyNode = valueNode = null;
                }
                detected = true;
                atExplicitKey = true;
                allowCompact = true;
            } else if (atExplicitKey) {
                // i.e. 0x3A/* : */ === character after the explicit key.
                atExplicitKey = false;
                allowCompact = true;
            } else $cfcf25c51c3b1777$var$throwError(state, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line");
            state.position += 1;
            ch = following;
        //
        // Implicit notation case. Flow-style node as the key first, then ":", and the value.
        //
        } else {
            _keyLine = state.line;
            _keyLineStart = state.lineStart;
            _keyPos = state.position;
            if (!$cfcf25c51c3b1777$var$composeNode(state, flowIndent, $cfcf25c51c3b1777$var$CONTEXT_FLOW_OUT, false, true)) break;
            if (state.line === _line) {
                ch = state.input.charCodeAt(state.position);
                while($cfcf25c51c3b1777$var$is_WHITE_SPACE(ch))ch = state.input.charCodeAt(++state.position);
                if (ch === 0x3A /* : */ ) {
                    ch = state.input.charCodeAt(++state.position);
                    if (!$cfcf25c51c3b1777$var$is_WS_OR_EOL(ch)) $cfcf25c51c3b1777$var$throwError(state, "a whitespace character is expected after the key-value separator within a block mapping");
                    if (atExplicitKey) {
                        $cfcf25c51c3b1777$var$storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
                        keyTag = keyNode = valueNode = null;
                    }
                    detected = true;
                    atExplicitKey = false;
                    allowCompact = false;
                    keyTag = state.tag;
                    keyNode = state.result;
                } else if (detected) $cfcf25c51c3b1777$var$throwError(state, "can not read an implicit mapping pair; a colon is missed");
                else {
                    state.tag = _tag;
                    state.anchor = _anchor;
                    return true; // Keep the result of `composeNode`.
                }
            } else if (detected) $cfcf25c51c3b1777$var$throwError(state, "can not read a block mapping entry; a multiline key may not be an implicit key");
            else {
                state.tag = _tag;
                state.anchor = _anchor;
                return true; // Keep the result of `composeNode`.
            }
        }
        //
        // Common reading code for both explicit and implicit notations.
        //
        if (state.line === _line || state.lineIndent > nodeIndent) {
            if (atExplicitKey) {
                _keyLine = state.line;
                _keyLineStart = state.lineStart;
                _keyPos = state.position;
            }
            if ($cfcf25c51c3b1777$var$composeNode(state, nodeIndent, $cfcf25c51c3b1777$var$CONTEXT_BLOCK_OUT, true, allowCompact)) {
                if (atExplicitKey) keyNode = state.result;
                else valueNode = state.result;
            }
            if (!atExplicitKey) {
                $cfcf25c51c3b1777$var$storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _keyLine, _keyLineStart, _keyPos);
                keyTag = keyNode = valueNode = null;
            }
            $cfcf25c51c3b1777$var$skipSeparationSpace(state, true, -1);
            ch = state.input.charCodeAt(state.position);
        }
        if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) $cfcf25c51c3b1777$var$throwError(state, "bad indentation of a mapping entry");
        else if (state.lineIndent < nodeIndent) break;
    }
    //
    // Epilogue.
    //
    // Special case: last mapping's node contains only the key in explicit notation.
    if (atExplicitKey) $cfcf25c51c3b1777$var$storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
    // Expose the resulting mapping.
    if (detected) {
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = "mapping";
        state.result = _result;
    }
    return detected;
}
function $cfcf25c51c3b1777$var$readTagProperty(state) {
    var _position, isVerbatim = false, isNamed = false, tagHandle, tagName, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 0x21 /* ! */ ) return false;
    if (state.tag !== null) $cfcf25c51c3b1777$var$throwError(state, "duplication of a tag property");
    ch = state.input.charCodeAt(++state.position);
    if (ch === 0x3C /* < */ ) {
        isVerbatim = true;
        ch = state.input.charCodeAt(++state.position);
    } else if (ch === 0x21 /* ! */ ) {
        isNamed = true;
        tagHandle = "!!";
        ch = state.input.charCodeAt(++state.position);
    } else tagHandle = "!";
    _position = state.position;
    if (isVerbatim) {
        do ch = state.input.charCodeAt(++state.position);
        while (ch !== 0 && ch !== 0x3E /* > */ );
        if (state.position < state.length) {
            tagName = state.input.slice(_position, state.position);
            ch = state.input.charCodeAt(++state.position);
        } else $cfcf25c51c3b1777$var$throwError(state, "unexpected end of the stream within a verbatim tag");
    } else {
        while(ch !== 0 && !$cfcf25c51c3b1777$var$is_WS_OR_EOL(ch)){
            if (ch === 0x21 /* ! */ ) {
                if (!isNamed) {
                    tagHandle = state.input.slice(_position - 1, state.position + 1);
                    if (!$cfcf25c51c3b1777$var$PATTERN_TAG_HANDLE.test(tagHandle)) $cfcf25c51c3b1777$var$throwError(state, "named tag handle cannot contain such characters");
                    isNamed = true;
                    _position = state.position + 1;
                } else $cfcf25c51c3b1777$var$throwError(state, "tag suffix cannot contain exclamation marks");
            }
            ch = state.input.charCodeAt(++state.position);
        }
        tagName = state.input.slice(_position, state.position);
        if ($cfcf25c51c3b1777$var$PATTERN_FLOW_INDICATORS.test(tagName)) $cfcf25c51c3b1777$var$throwError(state, "tag suffix cannot contain flow indicator characters");
    }
    if (tagName && !$cfcf25c51c3b1777$var$PATTERN_TAG_URI.test(tagName)) $cfcf25c51c3b1777$var$throwError(state, "tag name cannot contain such characters: " + tagName);
    try {
        tagName = decodeURIComponent(tagName);
    } catch (err) {
        $cfcf25c51c3b1777$var$throwError(state, "tag name is malformed: " + tagName);
    }
    if (isVerbatim) state.tag = tagName;
    else if ($cfcf25c51c3b1777$var$_hasOwnProperty$1.call(state.tagMap, tagHandle)) state.tag = state.tagMap[tagHandle] + tagName;
    else if (tagHandle === "!") state.tag = "!" + tagName;
    else if (tagHandle === "!!") state.tag = "tag:yaml.org,2002:" + tagName;
    else $cfcf25c51c3b1777$var$throwError(state, 'undeclared tag handle "' + tagHandle + '"');
    return true;
}
function $cfcf25c51c3b1777$var$readAnchorProperty(state) {
    var _position, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 0x26 /* & */ ) return false;
    if (state.anchor !== null) $cfcf25c51c3b1777$var$throwError(state, "duplication of an anchor property");
    ch = state.input.charCodeAt(++state.position);
    _position = state.position;
    while(ch !== 0 && !$cfcf25c51c3b1777$var$is_WS_OR_EOL(ch) && !$cfcf25c51c3b1777$var$is_FLOW_INDICATOR(ch))ch = state.input.charCodeAt(++state.position);
    if (state.position === _position) $cfcf25c51c3b1777$var$throwError(state, "name of an anchor node must contain at least one character");
    state.anchor = state.input.slice(_position, state.position);
    return true;
}
function $cfcf25c51c3b1777$var$readAlias(state) {
    var _position, alias, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 0x2A /* * */ ) return false;
    ch = state.input.charCodeAt(++state.position);
    _position = state.position;
    while(ch !== 0 && !$cfcf25c51c3b1777$var$is_WS_OR_EOL(ch) && !$cfcf25c51c3b1777$var$is_FLOW_INDICATOR(ch))ch = state.input.charCodeAt(++state.position);
    if (state.position === _position) $cfcf25c51c3b1777$var$throwError(state, "name of an alias node must contain at least one character");
    alias = state.input.slice(_position, state.position);
    if (!$cfcf25c51c3b1777$var$_hasOwnProperty$1.call(state.anchorMap, alias)) $cfcf25c51c3b1777$var$throwError(state, 'unidentified alias "' + alias + '"');
    state.result = state.anchorMap[alias];
    $cfcf25c51c3b1777$var$skipSeparationSpace(state, true, -1);
    return true;
}
function $cfcf25c51c3b1777$var$composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
    var allowBlockStyles, allowBlockScalars, allowBlockCollections, indentStatus = 1, atNewLine = false, hasContent = false, typeIndex, typeQuantity, typeList, type2, flowIndent, blockIndent;
    if (state.listener !== null) state.listener("open", state);
    state.tag = null;
    state.anchor = null;
    state.kind = null;
    state.result = null;
    allowBlockStyles = allowBlockScalars = allowBlockCollections = $cfcf25c51c3b1777$var$CONTEXT_BLOCK_OUT === nodeContext || $cfcf25c51c3b1777$var$CONTEXT_BLOCK_IN === nodeContext;
    if (allowToSeek) {
        if ($cfcf25c51c3b1777$var$skipSeparationSpace(state, true, -1)) {
            atNewLine = true;
            if (state.lineIndent > parentIndent) indentStatus = 1;
            else if (state.lineIndent === parentIndent) indentStatus = 0;
            else if (state.lineIndent < parentIndent) indentStatus = -1;
        }
    }
    if (indentStatus === 1) {
        while($cfcf25c51c3b1777$var$readTagProperty(state) || $cfcf25c51c3b1777$var$readAnchorProperty(state))if ($cfcf25c51c3b1777$var$skipSeparationSpace(state, true, -1)) {
            atNewLine = true;
            allowBlockCollections = allowBlockStyles;
            if (state.lineIndent > parentIndent) indentStatus = 1;
            else if (state.lineIndent === parentIndent) indentStatus = 0;
            else if (state.lineIndent < parentIndent) indentStatus = -1;
        } else allowBlockCollections = false;
    }
    if (allowBlockCollections) allowBlockCollections = atNewLine || allowCompact;
    if (indentStatus === 1 || $cfcf25c51c3b1777$var$CONTEXT_BLOCK_OUT === nodeContext) {
        if ($cfcf25c51c3b1777$var$CONTEXT_FLOW_IN === nodeContext || $cfcf25c51c3b1777$var$CONTEXT_FLOW_OUT === nodeContext) flowIndent = parentIndent;
        else flowIndent = parentIndent + 1;
        blockIndent = state.position - state.lineStart;
        if (indentStatus === 1) {
            if (allowBlockCollections && ($cfcf25c51c3b1777$var$readBlockSequence(state, blockIndent) || $cfcf25c51c3b1777$var$readBlockMapping(state, blockIndent, flowIndent)) || $cfcf25c51c3b1777$var$readFlowCollection(state, flowIndent)) hasContent = true;
            else {
                if (allowBlockScalars && $cfcf25c51c3b1777$var$readBlockScalar(state, flowIndent) || $cfcf25c51c3b1777$var$readSingleQuotedScalar(state, flowIndent) || $cfcf25c51c3b1777$var$readDoubleQuotedScalar(state, flowIndent)) hasContent = true;
                else if ($cfcf25c51c3b1777$var$readAlias(state)) {
                    hasContent = true;
                    if (state.tag !== null || state.anchor !== null) $cfcf25c51c3b1777$var$throwError(state, "alias node should not have any properties");
                } else if ($cfcf25c51c3b1777$var$readPlainScalar(state, flowIndent, $cfcf25c51c3b1777$var$CONTEXT_FLOW_IN === nodeContext)) {
                    hasContent = true;
                    if (state.tag === null) state.tag = "?";
                }
                if (state.anchor !== null) state.anchorMap[state.anchor] = state.result;
            }
        } else if (indentStatus === 0) // Special case: block sequences are allowed to have same indentation level as the parent.
        // http://www.yaml.org/spec/1.2/spec.html#id2799784
        hasContent = allowBlockCollections && $cfcf25c51c3b1777$var$readBlockSequence(state, blockIndent);
    }
    if (state.tag === null) {
        if (state.anchor !== null) state.anchorMap[state.anchor] = state.result;
    } else if (state.tag === "?") {
        // Implicit resolving is not allowed for non-scalar types, and '?'
        // non-specific tag is only automatically assigned to plain scalars.
        //
        // We only need to check kind conformity in case user explicitly assigns '?'
        // tag, for example like this: "!<?> [0]"
        //
        if (state.result !== null && state.kind !== "scalar") $cfcf25c51c3b1777$var$throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
        for(typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1){
            type2 = state.implicitTypes[typeIndex];
            if (type2.resolve(state.result)) {
                state.result = type2.construct(state.result);
                state.tag = type2.tag;
                if (state.anchor !== null) state.anchorMap[state.anchor] = state.result;
                break;
            }
        }
    } else if (state.tag !== "!") {
        if ($cfcf25c51c3b1777$var$_hasOwnProperty$1.call(state.typeMap[state.kind || "fallback"], state.tag)) type2 = state.typeMap[state.kind || "fallback"][state.tag];
        else {
            // looking for multi type
            type2 = null;
            typeList = state.typeMap.multi[state.kind || "fallback"];
            for(typeIndex = 0, typeQuantity = typeList.length; typeIndex < typeQuantity; typeIndex += 1)if (state.tag.slice(0, typeList[typeIndex].tag.length) === typeList[typeIndex].tag) {
                type2 = typeList[typeIndex];
                break;
            }
        }
        if (!type2) $cfcf25c51c3b1777$var$throwError(state, "unknown tag !<" + state.tag + ">");
        if (state.result !== null && type2.kind !== state.kind) $cfcf25c51c3b1777$var$throwError(state, "unacceptable node kind for !<" + state.tag + '> tag; it should be "' + type2.kind + '", not "' + state.kind + '"');
        if (!type2.resolve(state.result, state.tag)) $cfcf25c51c3b1777$var$throwError(state, "cannot resolve a node with !<" + state.tag + "> explicit tag");
        else {
            state.result = type2.construct(state.result, state.tag);
            if (state.anchor !== null) state.anchorMap[state.anchor] = state.result;
        }
    }
    if (state.listener !== null) state.listener("close", state);
    return state.tag !== null || state.anchor !== null || hasContent;
}
function $cfcf25c51c3b1777$var$readDocument(state) {
    var documentStart = state.position, _position, directiveName, directiveArgs, hasDirectives = false, ch;
    state.version = null;
    state.checkLineBreaks = state.legacy;
    state.tagMap = Object.create(null);
    state.anchorMap = Object.create(null);
    while((ch = state.input.charCodeAt(state.position)) !== 0){
        $cfcf25c51c3b1777$var$skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
        if (state.lineIndent > 0 || ch !== 0x25 /* % */ ) break;
        hasDirectives = true;
        ch = state.input.charCodeAt(++state.position);
        _position = state.position;
        while(ch !== 0 && !$cfcf25c51c3b1777$var$is_WS_OR_EOL(ch))ch = state.input.charCodeAt(++state.position);
        directiveName = state.input.slice(_position, state.position);
        directiveArgs = [];
        if (directiveName.length < 1) $cfcf25c51c3b1777$var$throwError(state, "directive name must not be less than one character in length");
        while(ch !== 0){
            while($cfcf25c51c3b1777$var$is_WHITE_SPACE(ch))ch = state.input.charCodeAt(++state.position);
            if (ch === 0x23 /* # */ ) {
                do ch = state.input.charCodeAt(++state.position);
                while (ch !== 0 && !$cfcf25c51c3b1777$var$is_EOL(ch));
                break;
            }
            if ($cfcf25c51c3b1777$var$is_EOL(ch)) break;
            _position = state.position;
            while(ch !== 0 && !$cfcf25c51c3b1777$var$is_WS_OR_EOL(ch))ch = state.input.charCodeAt(++state.position);
            directiveArgs.push(state.input.slice(_position, state.position));
        }
        if (ch !== 0) $cfcf25c51c3b1777$var$readLineBreak(state);
        if ($cfcf25c51c3b1777$var$_hasOwnProperty$1.call($cfcf25c51c3b1777$var$directiveHandlers, directiveName)) $cfcf25c51c3b1777$var$directiveHandlers[directiveName](state, directiveName, directiveArgs);
        else $cfcf25c51c3b1777$var$throwWarning(state, 'unknown document directive "' + directiveName + '"');
    }
    $cfcf25c51c3b1777$var$skipSeparationSpace(state, true, -1);
    if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 0x2D /* - */  && state.input.charCodeAt(state.position + 1) === 0x2D /* - */  && state.input.charCodeAt(state.position + 2) === 0x2D /* - */ ) {
        state.position += 3;
        $cfcf25c51c3b1777$var$skipSeparationSpace(state, true, -1);
    } else if (hasDirectives) $cfcf25c51c3b1777$var$throwError(state, "directives end mark is expected");
    $cfcf25c51c3b1777$var$composeNode(state, state.lineIndent - 1, $cfcf25c51c3b1777$var$CONTEXT_BLOCK_OUT, false, true);
    $cfcf25c51c3b1777$var$skipSeparationSpace(state, true, -1);
    if (state.checkLineBreaks && $cfcf25c51c3b1777$var$PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) $cfcf25c51c3b1777$var$throwWarning(state, "non-ASCII line breaks are interpreted as content");
    state.documents.push(state.result);
    if (state.position === state.lineStart && $cfcf25c51c3b1777$var$testDocumentSeparator(state)) {
        if (state.input.charCodeAt(state.position) === 0x2E /* . */ ) {
            state.position += 3;
            $cfcf25c51c3b1777$var$skipSeparationSpace(state, true, -1);
        }
        return;
    }
    if (state.position < state.length - 1) $cfcf25c51c3b1777$var$throwError(state, "end of the stream or a document separator is expected");
    else return;
}
function $cfcf25c51c3b1777$var$loadDocuments(input, options) {
    input = String(input);
    options = options || {};
    if (input.length !== 0) {
        // Add tailing `\n` if not exists
        if (input.charCodeAt(input.length - 1) !== 0x0A /* LF */  && input.charCodeAt(input.length - 1) !== 0x0D /* CR */ ) input += "\n";
        // Strip BOM
        if (input.charCodeAt(0) === 0xFEFF) input = input.slice(1);
    }
    var state = new $cfcf25c51c3b1777$var$State$1(input, options);
    var nullpos = input.indexOf("\0");
    if (nullpos !== -1) {
        state.position = nullpos;
        $cfcf25c51c3b1777$var$throwError(state, "null byte is not allowed in input");
    }
    // Use 0 as string terminator. That significantly simplifies bounds check.
    state.input += "\0";
    while(state.input.charCodeAt(state.position) === 0x20 /* Space */ ){
        state.lineIndent += 1;
        state.position += 1;
    }
    while(state.position < state.length - 1)$cfcf25c51c3b1777$var$readDocument(state);
    return state.documents;
}
function $cfcf25c51c3b1777$var$loadAll$1(input, iterator, options) {
    if (iterator !== null && typeof iterator === "object" && typeof options === "undefined") {
        options = iterator;
        iterator = null;
    }
    var documents = $cfcf25c51c3b1777$var$loadDocuments(input, options);
    if (typeof iterator !== "function") return documents;
    for(var index = 0, length = documents.length; index < length; index += 1)iterator(documents[index]);
}
function $cfcf25c51c3b1777$var$load$1(input, options) {
    var documents = $cfcf25c51c3b1777$var$loadDocuments(input, options);
    if (documents.length === 0) /*eslint-disable no-undefined*/ return undefined;
    else if (documents.length === 1) return documents[0];
    throw new $cfcf25c51c3b1777$var$exception("expected a single document in the stream, but found more");
}
var $cfcf25c51c3b1777$var$loadAll_1 = $cfcf25c51c3b1777$var$loadAll$1;
var $cfcf25c51c3b1777$var$load_1 = $cfcf25c51c3b1777$var$load$1;
var $cfcf25c51c3b1777$var$loader = {
    loadAll: $cfcf25c51c3b1777$var$loadAll_1,
    load: $cfcf25c51c3b1777$var$load_1
};
/*eslint-disable no-use-before-define*/ var $cfcf25c51c3b1777$var$_toString = Object.prototype.toString;
var $cfcf25c51c3b1777$var$_hasOwnProperty = Object.prototype.hasOwnProperty;
var $cfcf25c51c3b1777$var$CHAR_BOM = 0xFEFF;
var $cfcf25c51c3b1777$var$CHAR_TAB = 0x09; /* Tab */ 
var $cfcf25c51c3b1777$var$CHAR_LINE_FEED = 0x0A; /* LF */ 
var $cfcf25c51c3b1777$var$CHAR_CARRIAGE_RETURN = 0x0D; /* CR */ 
var $cfcf25c51c3b1777$var$CHAR_SPACE = 0x20; /* Space */ 
var $cfcf25c51c3b1777$var$CHAR_EXCLAMATION = 0x21; /* ! */ 
var $cfcf25c51c3b1777$var$CHAR_DOUBLE_QUOTE = 0x22; /* " */ 
var $cfcf25c51c3b1777$var$CHAR_SHARP = 0x23; /* # */ 
var $cfcf25c51c3b1777$var$CHAR_PERCENT = 0x25; /* % */ 
var $cfcf25c51c3b1777$var$CHAR_AMPERSAND = 0x26; /* & */ 
var $cfcf25c51c3b1777$var$CHAR_SINGLE_QUOTE = 0x27; /* ' */ 
var $cfcf25c51c3b1777$var$CHAR_ASTERISK = 0x2A; /* * */ 
var $cfcf25c51c3b1777$var$CHAR_COMMA = 0x2C; /* , */ 
var $cfcf25c51c3b1777$var$CHAR_MINUS = 0x2D; /* - */ 
var $cfcf25c51c3b1777$var$CHAR_COLON = 0x3A; /* : */ 
var $cfcf25c51c3b1777$var$CHAR_EQUALS = 0x3D; /* = */ 
var $cfcf25c51c3b1777$var$CHAR_GREATER_THAN = 0x3E; /* > */ 
var $cfcf25c51c3b1777$var$CHAR_QUESTION = 0x3F; /* ? */ 
var $cfcf25c51c3b1777$var$CHAR_COMMERCIAL_AT = 0x40; /* @ */ 
var $cfcf25c51c3b1777$var$CHAR_LEFT_SQUARE_BRACKET = 0x5B; /* [ */ 
var $cfcf25c51c3b1777$var$CHAR_RIGHT_SQUARE_BRACKET = 0x5D; /* ] */ 
var $cfcf25c51c3b1777$var$CHAR_GRAVE_ACCENT = 0x60; /* ` */ 
var $cfcf25c51c3b1777$var$CHAR_LEFT_CURLY_BRACKET = 0x7B; /* { */ 
var $cfcf25c51c3b1777$var$CHAR_VERTICAL_LINE = 0x7C; /* | */ 
var $cfcf25c51c3b1777$var$CHAR_RIGHT_CURLY_BRACKET = 0x7D; /* } */ 
var $cfcf25c51c3b1777$var$ESCAPE_SEQUENCES = {};
$cfcf25c51c3b1777$var$ESCAPE_SEQUENCES[0x00] = "\\0";
$cfcf25c51c3b1777$var$ESCAPE_SEQUENCES[0x07] = "\\a";
$cfcf25c51c3b1777$var$ESCAPE_SEQUENCES[0x08] = "\\b";
$cfcf25c51c3b1777$var$ESCAPE_SEQUENCES[0x09] = "\\t";
$cfcf25c51c3b1777$var$ESCAPE_SEQUENCES[0x0A] = "\\n";
$cfcf25c51c3b1777$var$ESCAPE_SEQUENCES[0x0B] = "\\v";
$cfcf25c51c3b1777$var$ESCAPE_SEQUENCES[0x0C] = "\\f";
$cfcf25c51c3b1777$var$ESCAPE_SEQUENCES[0x0D] = "\\r";
$cfcf25c51c3b1777$var$ESCAPE_SEQUENCES[0x1B] = "\\e";
$cfcf25c51c3b1777$var$ESCAPE_SEQUENCES[0x22] = '\\"';
$cfcf25c51c3b1777$var$ESCAPE_SEQUENCES[0x5C] = "\\\\";
$cfcf25c51c3b1777$var$ESCAPE_SEQUENCES[0x85] = "\\N";
$cfcf25c51c3b1777$var$ESCAPE_SEQUENCES[0xA0] = "\\_";
$cfcf25c51c3b1777$var$ESCAPE_SEQUENCES[0x2028] = "\\L";
$cfcf25c51c3b1777$var$ESCAPE_SEQUENCES[0x2029] = "\\P";
var $cfcf25c51c3b1777$var$DEPRECATED_BOOLEANS_SYNTAX = [
    "y",
    "Y",
    "yes",
    "Yes",
    "YES",
    "on",
    "On",
    "ON",
    "n",
    "N",
    "no",
    "No",
    "NO",
    "off",
    "Off",
    "OFF"
];
var $cfcf25c51c3b1777$var$DEPRECATED_BASE60_SYNTAX = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function $cfcf25c51c3b1777$var$compileStyleMap(schema2, map5) {
    var result, keys, index, length, tag, style, type3;
    if (map5 === null) return {};
    result = {};
    keys = Object.keys(map5);
    for(index = 0, length = keys.length; index < length; index += 1){
        tag = keys[index];
        style = String(map5[tag]);
        if (tag.slice(0, 2) === "!!") tag = "tag:yaml.org,2002:" + tag.slice(2);
        type3 = schema2.compiledTypeMap["fallback"][tag];
        if (type3 && $cfcf25c51c3b1777$var$_hasOwnProperty.call(type3.styleAliases, style)) style = type3.styleAliases[style];
        result[tag] = style;
    }
    return result;
}
function $cfcf25c51c3b1777$var$encodeHex(character) {
    var string, handle, length;
    string = character.toString(16).toUpperCase();
    if (character <= 0xFF) {
        handle = "x";
        length = 2;
    } else if (character <= 0xFFFF) {
        handle = "u";
        length = 4;
    } else if (character <= 0xFFFFFFFF) {
        handle = "U";
        length = 8;
    } else throw new $cfcf25c51c3b1777$var$exception("code point within a string may not be greater than 0xFFFFFFFF");
    return "\\" + handle + $cfcf25c51c3b1777$var$common.repeat("0", length - string.length) + string;
}
var $cfcf25c51c3b1777$var$QUOTING_TYPE_SINGLE = 1, $cfcf25c51c3b1777$var$QUOTING_TYPE_DOUBLE = 2;
function $cfcf25c51c3b1777$var$State(options) {
    this.schema = options["schema"] || $cfcf25c51c3b1777$var$_default;
    this.indent = Math.max(1, options["indent"] || 2);
    this.noArrayIndent = options["noArrayIndent"] || false;
    this.skipInvalid = options["skipInvalid"] || false;
    this.flowLevel = $cfcf25c51c3b1777$var$common.isNothing(options["flowLevel"]) ? -1 : options["flowLevel"];
    this.styleMap = $cfcf25c51c3b1777$var$compileStyleMap(this.schema, options["styles"] || null);
    this.sortKeys = options["sortKeys"] || false;
    this.lineWidth = options["lineWidth"] || 80;
    this.noRefs = options["noRefs"] || false;
    this.noCompatMode = options["noCompatMode"] || false;
    this.condenseFlow = options["condenseFlow"] || false;
    this.quotingType = options["quotingType"] === '"' ? $cfcf25c51c3b1777$var$QUOTING_TYPE_DOUBLE : $cfcf25c51c3b1777$var$QUOTING_TYPE_SINGLE;
    this.forceQuotes = options["forceQuotes"] || false;
    this.replacer = typeof options["replacer"] === "function" ? options["replacer"] : null;
    this.implicitTypes = this.schema.compiledImplicit;
    this.explicitTypes = this.schema.compiledExplicit;
    this.tag = null;
    this.result = "";
    this.duplicates = [];
    this.usedDuplicates = null;
}
// Indents every line in a string. Empty lines (\n only) are not indented.
function $cfcf25c51c3b1777$var$indentString(string, spaces) {
    var ind = $cfcf25c51c3b1777$var$common.repeat(" ", spaces), position = 0, next = -1, result = "", line, length = string.length;
    while(position < length){
        next = string.indexOf("\n", position);
        if (next === -1) {
            line = string.slice(position);
            position = length;
        } else {
            line = string.slice(position, next + 1);
            position = next + 1;
        }
        if (line.length && line !== "\n") result += ind;
        result += line;
    }
    return result;
}
function $cfcf25c51c3b1777$var$generateNextLine(state, level) {
    return "\n" + $cfcf25c51c3b1777$var$common.repeat(" ", state.indent * level);
}
function $cfcf25c51c3b1777$var$testImplicitResolving(state, str1) {
    var index, length, type4;
    for(index = 0, length = state.implicitTypes.length; index < length; index += 1){
        type4 = state.implicitTypes[index];
        if (type4.resolve(str1)) return true;
    }
    return false;
}
// [33] s-white ::= s-space | s-tab
function $cfcf25c51c3b1777$var$isWhitespace(c) {
    return c === $cfcf25c51c3b1777$var$CHAR_SPACE || c === $cfcf25c51c3b1777$var$CHAR_TAB;
}
// Returns true if the character can be printed without escaping.
// From YAML 1.2: "any allowed characters known to be non-printable
// should also be escaped. [However,] This isn’t mandatory"
// Derived from nb-char - \t - #x85 - #xA0 - #x2028 - #x2029.
function $cfcf25c51c3b1777$var$isPrintable(c) {
    return 0x00020 <= c && c <= 0x00007E || 0x000A1 <= c && c <= 0x00D7FF && c !== 0x2028 && c !== 0x2029 || 0x0E000 <= c && c <= 0x00FFFD && c !== $cfcf25c51c3b1777$var$CHAR_BOM || 0x10000 <= c && c <= 0x10FFFF;
}
// [34] ns-char ::= nb-char - s-white
// [27] nb-char ::= c-printable - b-char - c-byte-order-mark
// [26] b-char  ::= b-line-feed | b-carriage-return
// Including s-white (for some reason, examples doesn't match specs in this aspect)
// ns-char ::= c-printable - b-line-feed - b-carriage-return - c-byte-order-mark
function $cfcf25c51c3b1777$var$isNsCharOrWhitespace(c) {
    return $cfcf25c51c3b1777$var$isPrintable(c) && c !== $cfcf25c51c3b1777$var$CHAR_BOM && c !== $cfcf25c51c3b1777$var$CHAR_CARRIAGE_RETURN && c !== $cfcf25c51c3b1777$var$CHAR_LINE_FEED;
}
// [127]  ns-plain-safe(c) ::= c = flow-out  ⇒ ns-plain-safe-out
//                             c = flow-in   ⇒ ns-plain-safe-in
//                             c = block-key ⇒ ns-plain-safe-out
//                             c = flow-key  ⇒ ns-plain-safe-in
// [128] ns-plain-safe-out ::= ns-char
// [129]  ns-plain-safe-in ::= ns-char - c-flow-indicator
// [130]  ns-plain-char(c) ::=  ( ns-plain-safe(c) - “:” - “#” )
//                            | ( /* An ns-char preceding */ “#” )
//                            | ( “:” /* Followed by an ns-plain-safe(c) */ )
function $cfcf25c51c3b1777$var$isPlainSafe(c, prev, inblock) {
    var cIsNsCharOrWhitespace = $cfcf25c51c3b1777$var$isNsCharOrWhitespace(c);
    var cIsNsChar = cIsNsCharOrWhitespace && !$cfcf25c51c3b1777$var$isWhitespace(c);
    return // ns-plain-safe
    (inblock ? cIsNsCharOrWhitespace : cIsNsCharOrWhitespace && c !== $cfcf25c51c3b1777$var$CHAR_COMMA && c !== $cfcf25c51c3b1777$var$CHAR_LEFT_SQUARE_BRACKET && c !== $cfcf25c51c3b1777$var$CHAR_RIGHT_SQUARE_BRACKET && c !== $cfcf25c51c3b1777$var$CHAR_LEFT_CURLY_BRACKET && c !== $cfcf25c51c3b1777$var$CHAR_RIGHT_CURLY_BRACKET) && c !== $cfcf25c51c3b1777$var$CHAR_SHARP // false on '#'
     && !(prev === $cfcf25c51c3b1777$var$CHAR_COLON && !cIsNsChar // false on ': '
    ) || $cfcf25c51c3b1777$var$isNsCharOrWhitespace(prev) && !$cfcf25c51c3b1777$var$isWhitespace(prev) && c === $cfcf25c51c3b1777$var$CHAR_SHARP // change to true on '[^ ]#'
     || prev === $cfcf25c51c3b1777$var$CHAR_COLON && cIsNsChar; // change to true on ':[^ ]'
}
// Simplified test for values allowed as the first character in plain style.
function $cfcf25c51c3b1777$var$isPlainSafeFirst(c) {
    // Uses a subset of ns-char - c-indicator
    // where ns-char = nb-char - s-white.
    // No support of ( ( “?” | “:” | “-” ) /* Followed by an ns-plain-safe(c)) */ ) part
    return $cfcf25c51c3b1777$var$isPrintable(c) && c !== $cfcf25c51c3b1777$var$CHAR_BOM && !$cfcf25c51c3b1777$var$isWhitespace(c) // - s-white
     && c !== $cfcf25c51c3b1777$var$CHAR_MINUS && c !== $cfcf25c51c3b1777$var$CHAR_QUESTION && c !== $cfcf25c51c3b1777$var$CHAR_COLON && c !== $cfcf25c51c3b1777$var$CHAR_COMMA && c !== $cfcf25c51c3b1777$var$CHAR_LEFT_SQUARE_BRACKET && c !== $cfcf25c51c3b1777$var$CHAR_RIGHT_SQUARE_BRACKET && c !== $cfcf25c51c3b1777$var$CHAR_LEFT_CURLY_BRACKET && c !== $cfcf25c51c3b1777$var$CHAR_RIGHT_CURLY_BRACKET && c !== $cfcf25c51c3b1777$var$CHAR_SHARP && c !== $cfcf25c51c3b1777$var$CHAR_AMPERSAND && c !== $cfcf25c51c3b1777$var$CHAR_ASTERISK && c !== $cfcf25c51c3b1777$var$CHAR_EXCLAMATION && c !== $cfcf25c51c3b1777$var$CHAR_VERTICAL_LINE && c !== $cfcf25c51c3b1777$var$CHAR_EQUALS && c !== $cfcf25c51c3b1777$var$CHAR_GREATER_THAN && c !== $cfcf25c51c3b1777$var$CHAR_SINGLE_QUOTE && c !== $cfcf25c51c3b1777$var$CHAR_DOUBLE_QUOTE && c !== $cfcf25c51c3b1777$var$CHAR_PERCENT && c !== $cfcf25c51c3b1777$var$CHAR_COMMERCIAL_AT && c !== $cfcf25c51c3b1777$var$CHAR_GRAVE_ACCENT;
}
// Simplified test for values allowed as the last character in plain style.
function $cfcf25c51c3b1777$var$isPlainSafeLast(c) {
    // just not whitespace or colon, it will be checked to be plain character later
    return !$cfcf25c51c3b1777$var$isWhitespace(c) && c !== $cfcf25c51c3b1777$var$CHAR_COLON;
}
// Same as 'string'.codePointAt(pos), but works in older browsers.
function $cfcf25c51c3b1777$var$codePointAt(string, pos) {
    var first = string.charCodeAt(pos), second;
    if (first >= 0xD800 && first <= 0xDBFF && pos + 1 < string.length) {
        second = string.charCodeAt(pos + 1);
        if (second >= 0xDC00 && second <= 0xDFFF) // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
    }
    return first;
}
// Determines whether block indentation indicator is required.
function $cfcf25c51c3b1777$var$needIndentIndicator(string) {
    var leadingSpaceRe = /^\n* /;
    return leadingSpaceRe.test(string);
}
var $cfcf25c51c3b1777$var$STYLE_PLAIN = 1, $cfcf25c51c3b1777$var$STYLE_SINGLE = 2, $cfcf25c51c3b1777$var$STYLE_LITERAL = 3, $cfcf25c51c3b1777$var$STYLE_FOLDED = 4, $cfcf25c51c3b1777$var$STYLE_DOUBLE = 5;
// Determines which scalar styles are possible and returns the preferred style.
// lineWidth = -1 => no limit.
// Pre-conditions: str.length > 0.
// Post-conditions:
//    STYLE_PLAIN or STYLE_SINGLE => no \n are in the string.
//    STYLE_LITERAL => no lines are suitable for folding (or lineWidth is -1).
//    STYLE_FOLDED => a line > lineWidth and can be folded (and lineWidth != -1).
function $cfcf25c51c3b1777$var$chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType, quotingType, forceQuotes, inblock) {
    var i2;
    var char = 0;
    var prevChar = null;
    var hasLineBreak = false;
    var hasFoldableLine = false; // only checked if shouldTrackWidth
    var shouldTrackWidth = lineWidth !== -1;
    var previousLineBreak = -1; // count the first line correctly
    var plain = $cfcf25c51c3b1777$var$isPlainSafeFirst($cfcf25c51c3b1777$var$codePointAt(string, 0)) && $cfcf25c51c3b1777$var$isPlainSafeLast($cfcf25c51c3b1777$var$codePointAt(string, string.length - 1));
    if (singleLineOnly || forceQuotes) // Case: no block styles.
    // Check for disallowed characters to rule out plain and single.
    for(i2 = 0; i2 < string.length; char >= 0x10000 ? i2 += 2 : i2++){
        char = $cfcf25c51c3b1777$var$codePointAt(string, i2);
        if (!$cfcf25c51c3b1777$var$isPrintable(char)) return $cfcf25c51c3b1777$var$STYLE_DOUBLE;
        plain = plain && $cfcf25c51c3b1777$var$isPlainSafe(char, prevChar, inblock);
        prevChar = char;
    }
    else {
        // Case: block styles permitted.
        for(i2 = 0; i2 < string.length; char >= 0x10000 ? i2 += 2 : i2++){
            char = $cfcf25c51c3b1777$var$codePointAt(string, i2);
            if (char === $cfcf25c51c3b1777$var$CHAR_LINE_FEED) {
                hasLineBreak = true;
                // Check if any line can be folded.
                if (shouldTrackWidth) {
                    hasFoldableLine = hasFoldableLine || i2 - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
                    previousLineBreak = i2;
                }
            } else if (!$cfcf25c51c3b1777$var$isPrintable(char)) return $cfcf25c51c3b1777$var$STYLE_DOUBLE;
            plain = plain && $cfcf25c51c3b1777$var$isPlainSafe(char, prevChar, inblock);
            prevChar = char;
        }
        // in case the end is missing a \n
        hasFoldableLine = hasFoldableLine || shouldTrackWidth && i2 - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
    }
    // Although every style can represent \n without escaping, prefer block styles
    // for multiline, since they're more readable and they don't add empty lines.
    // Also prefer folding a super-long line.
    if (!hasLineBreak && !hasFoldableLine) {
        // Strings interpretable as another type have to be quoted;
        // e.g. the string 'true' vs. the boolean true.
        if (plain && !forceQuotes && !testAmbiguousType(string)) return $cfcf25c51c3b1777$var$STYLE_PLAIN;
        return quotingType === $cfcf25c51c3b1777$var$QUOTING_TYPE_DOUBLE ? $cfcf25c51c3b1777$var$STYLE_DOUBLE : $cfcf25c51c3b1777$var$STYLE_SINGLE;
    }
    // Edge case: block indentation indicator can only have one digit.
    if (indentPerLevel > 9 && $cfcf25c51c3b1777$var$needIndentIndicator(string)) return $cfcf25c51c3b1777$var$STYLE_DOUBLE;
    // At this point we know block styles are valid.
    // Prefer literal style unless we want to fold.
    if (!forceQuotes) return hasFoldableLine ? $cfcf25c51c3b1777$var$STYLE_FOLDED : $cfcf25c51c3b1777$var$STYLE_LITERAL;
    return quotingType === $cfcf25c51c3b1777$var$QUOTING_TYPE_DOUBLE ? $cfcf25c51c3b1777$var$STYLE_DOUBLE : $cfcf25c51c3b1777$var$STYLE_SINGLE;
}
// Note: line breaking/folding is implemented for only the folded style.
// NB. We drop the last trailing newline (if any) of a returned block scalar
//  since the dumper adds its own newline. This always works:
//    • No ending newline => unaffected; already using strip "-" chomping.
//    • Ending newline    => removed then restored.
//  Importantly, this keeps the "+" chomp indicator from gaining an extra line.
function $cfcf25c51c3b1777$var$writeScalar(state, string1, level, iskey, inblock) {
    state.dump = function() {
        if (string1.length === 0) return state.quotingType === $cfcf25c51c3b1777$var$QUOTING_TYPE_DOUBLE ? '""' : "''";
        if (!state.noCompatMode) {
            if ($cfcf25c51c3b1777$var$DEPRECATED_BOOLEANS_SYNTAX.indexOf(string1) !== -1 || $cfcf25c51c3b1777$var$DEPRECATED_BASE60_SYNTAX.test(string1)) return state.quotingType === $cfcf25c51c3b1777$var$QUOTING_TYPE_DOUBLE ? '"' + string1 + '"' : "'" + string1 + "'";
        }
        var indent = state.indent * Math.max(1, level); // no 0-indent scalars
        // As indentation gets deeper, let the width decrease monotonically
        // to the lower bound min(state.lineWidth, 40).
        // Note that this implies
        //  state.lineWidth ≤ 40 + state.indent: width is fixed at the lower bound.
        //  state.lineWidth > 40 + state.indent: width decreases until the lower bound.
        // This behaves better than a constant minimum width which disallows narrower options,
        // or an indent threshold which causes the width to suddenly increase.
        var lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
        // Without knowing if keys are implicit/explicit, assume implicit for safety.
        var singleLineOnly = iskey || state.flowLevel > -1 && level >= state.flowLevel;
        function testAmbiguity(string) {
            return $cfcf25c51c3b1777$var$testImplicitResolving(state, string);
        }
        switch($cfcf25c51c3b1777$var$chooseScalarStyle(string1, singleLineOnly, state.indent, lineWidth, testAmbiguity, state.quotingType, state.forceQuotes && !iskey, inblock)){
            case $cfcf25c51c3b1777$var$STYLE_PLAIN:
                return string1;
            case $cfcf25c51c3b1777$var$STYLE_SINGLE:
                return "'" + string1.replace(/'/g, "''") + "'";
            case $cfcf25c51c3b1777$var$STYLE_LITERAL:
                return "|" + $cfcf25c51c3b1777$var$blockHeader(string1, state.indent) + $cfcf25c51c3b1777$var$dropEndingNewline($cfcf25c51c3b1777$var$indentString(string1, indent));
            case $cfcf25c51c3b1777$var$STYLE_FOLDED:
                return ">" + $cfcf25c51c3b1777$var$blockHeader(string1, state.indent) + $cfcf25c51c3b1777$var$dropEndingNewline($cfcf25c51c3b1777$var$indentString($cfcf25c51c3b1777$var$foldString(string1, lineWidth), indent));
            case $cfcf25c51c3b1777$var$STYLE_DOUBLE:
                return '"' + $cfcf25c51c3b1777$var$escapeString(string1) + '"';
            default:
                throw new $cfcf25c51c3b1777$var$exception("impossible error: invalid scalar style");
        }
    }();
}
// Pre-conditions: string is valid for a block scalar, 1 <= indentPerLevel <= 9.
function $cfcf25c51c3b1777$var$blockHeader(string, indentPerLevel) {
    var indentIndicator = $cfcf25c51c3b1777$var$needIndentIndicator(string) ? String(indentPerLevel) : "";
    // note the special case: the string '\n' counts as a "trailing" empty line.
    var clip = string[string.length - 1] === "\n";
    var keep = clip && (string[string.length - 2] === "\n" || string === "\n");
    var chomp = keep ? "+" : clip ? "" : "-";
    return indentIndicator + chomp + "\n";
}
// (See the note for writeScalar.)
function $cfcf25c51c3b1777$var$dropEndingNewline(string) {
    return string[string.length - 1] === "\n" ? string.slice(0, -1) : string;
}
// Note: a long line without a suitable break point will exceed the width limit.
// Pre-conditions: every char in str isPrintable, str.length > 0, width > 0.
function $cfcf25c51c3b1777$var$foldString(string, width) {
    // In folded style, $k$ consecutive newlines output as $k+1$ newlines—
    // unless they're before or after a more-indented line, or at the very
    // beginning or end, in which case $k$ maps to $k$.
    // Therefore, parse each chunk as newline(s) followed by a content line.
    var lineRe = /(\n+)([^\n]*)/g;
    // first line (possibly an empty line)
    var result = function() {
        var nextLF = string.indexOf("\n");
        nextLF = nextLF !== -1 ? nextLF : string.length;
        lineRe.lastIndex = nextLF;
        return $cfcf25c51c3b1777$var$foldLine(string.slice(0, nextLF), width);
    }();
    // If we haven't reached the first content line yet, don't add an extra \n.
    var prevMoreIndented = string[0] === "\n" || string[0] === " ";
    var moreIndented;
    // rest of the lines
    var match;
    while(match = lineRe.exec(string)){
        var prefix = match[1], line = match[2];
        moreIndented = line[0] === " ";
        result += prefix + (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") + $cfcf25c51c3b1777$var$foldLine(line, width);
        prevMoreIndented = moreIndented;
    }
    return result;
}
// Greedy line breaking.
// Picks the longest line under the limit each time,
// otherwise settles for the shortest line over the limit.
// NB. More-indented lines *cannot* be folded, as that would add an extra \n.
function $cfcf25c51c3b1777$var$foldLine(line, width) {
    if (line === "" || line[0] === " ") return line;
    // Since a more-indented line adds a \n, breaks can't be followed by a space.
    var breakRe = / [^ ]/g; // note: the match index will always be <= length-2.
    var match;
    // start is an inclusive index. end, curr, and next are exclusive.
    var start = 0, end, curr = 0, next = 0;
    var result = "";
    // Invariants: 0 <= start <= length-1.
    //   0 <= curr <= next <= max(0, length-2). curr - start <= width.
    // Inside the loop:
    //   A match implies length >= 2, so curr and next are <= length-2.
    while(match = breakRe.exec(line)){
        next = match.index;
        // maintain invariant: curr - start <= width
        if (next - start > width) {
            end = curr > start ? curr : next; // derive end <= length-2
            result += "\n" + line.slice(start, end);
            // skip the space that was output as \n
            start = end + 1; // derive start <= length-1
        }
        curr = next;
    }
    // By the invariants, start <= length-1, so there is something left over.
    // It is either the whole string or a part starting from non-whitespace.
    result += "\n";
    // Insert a break if the remainder is too long and there is a break available.
    if (line.length - start > width && curr > start) result += line.slice(start, curr) + "\n" + line.slice(curr + 1);
    else result += line.slice(start);
    return result.slice(1); // drop extra \n joiner
}
// Escapes a double-quoted string.
function $cfcf25c51c3b1777$var$escapeString(string) {
    var result = "";
    var char = 0;
    var escapeSeq;
    for(var i3 = 0; i3 < string.length; char >= 0x10000 ? i3 += 2 : i3++){
        char = $cfcf25c51c3b1777$var$codePointAt(string, i3);
        escapeSeq = $cfcf25c51c3b1777$var$ESCAPE_SEQUENCES[char];
        if (!escapeSeq && $cfcf25c51c3b1777$var$isPrintable(char)) {
            result += string[i3];
            if (char >= 0x10000) result += string[i3 + 1];
        } else result += escapeSeq || $cfcf25c51c3b1777$var$encodeHex(char);
    }
    return result;
}
function $cfcf25c51c3b1777$var$writeFlowSequence(state, level, object) {
    var _result = "", _tag = state.tag, index, length, value;
    for(index = 0, length = object.length; index < length; index += 1){
        value = object[index];
        if (state.replacer) value = state.replacer.call(object, String(index), value);
        // Write only valid elements, put null instead of invalid elements.
        if ($cfcf25c51c3b1777$var$writeNode(state, level, value, false, false) || typeof value === "undefined" && $cfcf25c51c3b1777$var$writeNode(state, level, null, false, false)) {
            if (_result !== "") _result += "," + (!state.condenseFlow ? " " : "");
            _result += state.dump;
        }
    }
    state.tag = _tag;
    state.dump = "[" + _result + "]";
}
function $cfcf25c51c3b1777$var$writeBlockSequence(state, level, object, compact) {
    var _result = "", _tag = state.tag, index, length, value;
    for(index = 0, length = object.length; index < length; index += 1){
        value = object[index];
        if (state.replacer) value = state.replacer.call(object, String(index), value);
        // Write only valid elements, put null instead of invalid elements.
        if ($cfcf25c51c3b1777$var$writeNode(state, level + 1, value, true, true, false, true) || typeof value === "undefined" && $cfcf25c51c3b1777$var$writeNode(state, level + 1, null, true, true, false, true)) {
            if (!compact || _result !== "") _result += $cfcf25c51c3b1777$var$generateNextLine(state, level);
            if (state.dump && $cfcf25c51c3b1777$var$CHAR_LINE_FEED === state.dump.charCodeAt(0)) _result += "-";
            else _result += "- ";
            _result += state.dump;
        }
    }
    state.tag = _tag;
    state.dump = _result || "[]"; // Empty sequence if no valid values.
}
function $cfcf25c51c3b1777$var$writeFlowMapping(state, level, object) {
    var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, pairBuffer;
    for(index = 0, length = objectKeyList.length; index < length; index += 1){
        pairBuffer = "";
        if (_result !== "") pairBuffer += ", ";
        if (state.condenseFlow) pairBuffer += '"';
        objectKey = objectKeyList[index];
        objectValue = object[objectKey];
        if (state.replacer) objectValue = state.replacer.call(object, objectKey, objectValue);
        if (!$cfcf25c51c3b1777$var$writeNode(state, level, objectKey, false, false)) continue; // Skip this pair because of invalid key;
        if (state.dump.length > 1024) pairBuffer += "? ";
        pairBuffer += state.dump + (state.condenseFlow ? '"' : "") + ":" + (state.condenseFlow ? "" : " ");
        if (!$cfcf25c51c3b1777$var$writeNode(state, level, objectValue, false, false)) continue; // Skip this pair because of invalid value.
        pairBuffer += state.dump;
        // Both key and value are valid.
        _result += pairBuffer;
    }
    state.tag = _tag;
    state.dump = "{" + _result + "}";
}
function $cfcf25c51c3b1777$var$writeBlockMapping(state, level, object, compact) {
    var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, explicitPair, pairBuffer;
    // Allow sorting keys so that the output file is deterministic
    if (state.sortKeys === true) // Default sorting
    objectKeyList.sort();
    else if (typeof state.sortKeys === "function") // Custom sort function
    objectKeyList.sort(state.sortKeys);
    else if (state.sortKeys) // Something is wrong
    throw new $cfcf25c51c3b1777$var$exception("sortKeys must be a boolean or a function");
    for(index = 0, length = objectKeyList.length; index < length; index += 1){
        pairBuffer = "";
        if (!compact || _result !== "") pairBuffer += $cfcf25c51c3b1777$var$generateNextLine(state, level);
        objectKey = objectKeyList[index];
        objectValue = object[objectKey];
        if (state.replacer) objectValue = state.replacer.call(object, objectKey, objectValue);
        if (!$cfcf25c51c3b1777$var$writeNode(state, level + 1, objectKey, true, true, true)) continue; // Skip this pair because of invalid key.
        explicitPair = state.tag !== null && state.tag !== "?" || state.dump && state.dump.length > 1024;
        if (explicitPair) {
            if (state.dump && $cfcf25c51c3b1777$var$CHAR_LINE_FEED === state.dump.charCodeAt(0)) pairBuffer += "?";
            else pairBuffer += "? ";
        }
        pairBuffer += state.dump;
        if (explicitPair) pairBuffer += $cfcf25c51c3b1777$var$generateNextLine(state, level);
        if (!$cfcf25c51c3b1777$var$writeNode(state, level + 1, objectValue, true, explicitPair)) continue; // Skip this pair because of invalid value.
        if (state.dump && $cfcf25c51c3b1777$var$CHAR_LINE_FEED === state.dump.charCodeAt(0)) pairBuffer += ":";
        else pairBuffer += ": ";
        pairBuffer += state.dump;
        // Both key and value are valid.
        _result += pairBuffer;
    }
    state.tag = _tag;
    state.dump = _result || "{}"; // Empty mapping if no valid pairs.
}
function $cfcf25c51c3b1777$var$detectType(state, object, explicit) {
    var _result, typeList, index, length, type5, style;
    typeList = explicit ? state.explicitTypes : state.implicitTypes;
    for(index = 0, length = typeList.length; index < length; index += 1){
        type5 = typeList[index];
        if ((type5.instanceOf || type5.predicate) && (!type5.instanceOf || typeof object === "object" && object instanceof type5.instanceOf) && (!type5.predicate || type5.predicate(object))) {
            if (explicit) {
                if (type5.multi && type5.representName) state.tag = type5.representName(object);
                else state.tag = type5.tag;
            } else state.tag = "?";
            if (type5.represent) {
                style = state.styleMap[type5.tag] || type5.defaultStyle;
                if ($cfcf25c51c3b1777$var$_toString.call(type5.represent) === "[object Function]") _result = type5.represent(object, style);
                else if ($cfcf25c51c3b1777$var$_hasOwnProperty.call(type5.represent, style)) _result = type5.represent[style](object, style);
                else throw new $cfcf25c51c3b1777$var$exception("!<" + type5.tag + '> tag resolver accepts not "' + style + '" style');
                state.dump = _result;
            }
            return true;
        }
    }
    return false;
}
// Serializes `object` and writes it to global `result`.
// Returns true on success, or false on invalid object.
//
function $cfcf25c51c3b1777$var$writeNode(state, level, object, block, compact, iskey, isblockseq) {
    state.tag = null;
    state.dump = object;
    if (!$cfcf25c51c3b1777$var$detectType(state, object, false)) $cfcf25c51c3b1777$var$detectType(state, object, true);
    var type6 = $cfcf25c51c3b1777$var$_toString.call(state.dump);
    var inblock = block;
    var tagStr;
    if (block) block = state.flowLevel < 0 || state.flowLevel > level;
    var objectOrArray = type6 === "[object Object]" || type6 === "[object Array]", duplicateIndex, duplicate;
    if (objectOrArray) {
        duplicateIndex = state.duplicates.indexOf(object);
        duplicate = duplicateIndex !== -1;
    }
    if (state.tag !== null && state.tag !== "?" || duplicate || state.indent !== 2 && level > 0) compact = false;
    if (duplicate && state.usedDuplicates[duplicateIndex]) state.dump = "*ref_" + duplicateIndex;
    else {
        if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) state.usedDuplicates[duplicateIndex] = true;
        if (type6 === "[object Object]") {
            if (block && Object.keys(state.dump).length !== 0) {
                $cfcf25c51c3b1777$var$writeBlockMapping(state, level, state.dump, compact);
                if (duplicate) state.dump = "&ref_" + duplicateIndex + state.dump;
            } else {
                $cfcf25c51c3b1777$var$writeFlowMapping(state, level, state.dump);
                if (duplicate) state.dump = "&ref_" + duplicateIndex + " " + state.dump;
            }
        } else if (type6 === "[object Array]") {
            if (block && state.dump.length !== 0) {
                if (state.noArrayIndent && !isblockseq && level > 0) $cfcf25c51c3b1777$var$writeBlockSequence(state, level - 1, state.dump, compact);
                else $cfcf25c51c3b1777$var$writeBlockSequence(state, level, state.dump, compact);
                if (duplicate) state.dump = "&ref_" + duplicateIndex + state.dump;
            } else {
                $cfcf25c51c3b1777$var$writeFlowSequence(state, level, state.dump);
                if (duplicate) state.dump = "&ref_" + duplicateIndex + " " + state.dump;
            }
        } else if (type6 === "[object String]") {
            if (state.tag !== "?") $cfcf25c51c3b1777$var$writeScalar(state, state.dump, level, iskey, inblock);
        } else if (type6 === "[object Undefined]") return false;
        else {
            if (state.skipInvalid) return false;
            throw new $cfcf25c51c3b1777$var$exception("unacceptable kind of an object to dump " + type6);
        }
        if (state.tag !== null && state.tag !== "?") {
            // Need to encode all characters except those allowed by the spec:
            //
            // [35] ns-dec-digit    ::=  [#x30-#x39] /* 0-9 */
            // [36] ns-hex-digit    ::=  ns-dec-digit
            //                         | [#x41-#x46] /* A-F */ | [#x61-#x66] /* a-f */
            // [37] ns-ascii-letter ::=  [#x41-#x5A] /* A-Z */ | [#x61-#x7A] /* a-z */
            // [38] ns-word-char    ::=  ns-dec-digit | ns-ascii-letter | “-”
            // [39] ns-uri-char     ::=  “%” ns-hex-digit ns-hex-digit | ns-word-char | “#”
            //                         | “;” | “/” | “?” | “:” | “@” | “&” | “=” | “+” | “$” | “,”
            //                         | “_” | “.” | “!” | “~” | “*” | “'” | “(” | “)” | “[” | “]”
            //
            // Also need to encode '!' because it has special meaning (end of tag prefix).
            //
            tagStr = encodeURI(state.tag[0] === "!" ? state.tag.slice(1) : state.tag).replace(/!/g, "%21");
            if (state.tag[0] === "!") tagStr = "!" + tagStr;
            else if (tagStr.slice(0, 18) === "tag:yaml.org,2002:") tagStr = "!!" + tagStr.slice(18);
            else tagStr = "!<" + tagStr + ">";
            state.dump = tagStr + " " + state.dump;
        }
    }
    return true;
}
function $cfcf25c51c3b1777$var$getDuplicateReferences(object, state) {
    var objects = [], duplicatesIndexes = [], index, length;
    $cfcf25c51c3b1777$var$inspectNode(object, objects, duplicatesIndexes);
    for(index = 0, length = duplicatesIndexes.length; index < length; index += 1)state.duplicates.push(objects[duplicatesIndexes[index]]);
    state.usedDuplicates = new Array(length);
}
function $cfcf25c51c3b1777$var$inspectNode(object, objects, duplicatesIndexes) {
    var objectKeyList, index, length;
    if (object !== null && typeof object === "object") {
        index = objects.indexOf(object);
        if (index !== -1) {
            if (duplicatesIndexes.indexOf(index) === -1) duplicatesIndexes.push(index);
        } else {
            objects.push(object);
            if (Array.isArray(object)) for(index = 0, length = object.length; index < length; index += 1)$cfcf25c51c3b1777$var$inspectNode(object[index], objects, duplicatesIndexes);
            else {
                objectKeyList = Object.keys(object);
                for(index = 0, length = objectKeyList.length; index < length; index += 1)$cfcf25c51c3b1777$var$inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
            }
        }
    }
}
function $cfcf25c51c3b1777$var$dump$1(input, options) {
    options = options || {};
    var state = new $cfcf25c51c3b1777$var$State(options);
    if (!state.noRefs) $cfcf25c51c3b1777$var$getDuplicateReferences(input, state);
    var value = input;
    if (state.replacer) value = state.replacer.call({
        "": value
    }, "", value);
    if ($cfcf25c51c3b1777$var$writeNode(state, 0, value, true, true)) return state.dump + "\n";
    return "";
}
var $cfcf25c51c3b1777$var$dump_1 = $cfcf25c51c3b1777$var$dump$1;
var $cfcf25c51c3b1777$var$dumper = {
    dump: $cfcf25c51c3b1777$var$dump_1
};
function $cfcf25c51c3b1777$var$renamed(from, to) {
    return function() {
        throw new Error("Function yaml." + from + " is removed in js-yaml 4. " + "Use yaml." + to + " instead, which is now safe by default.");
    };
}
var $cfcf25c51c3b1777$export$92738401e1603719 = $cfcf25c51c3b1777$var$type;
var $cfcf25c51c3b1777$export$19342e026b58ebb7 = $cfcf25c51c3b1777$var$schema;
var $cfcf25c51c3b1777$export$aefe34bace55c48e = $cfcf25c51c3b1777$var$failsafe;
var $cfcf25c51c3b1777$export$3f5573a59aee743 = $cfcf25c51c3b1777$var$json;
var $cfcf25c51c3b1777$export$cb27b7e9f9bc8fa8 = $cfcf25c51c3b1777$var$core;
var $cfcf25c51c3b1777$export$54192bc17d2d9e2a = $cfcf25c51c3b1777$var$_default;
var $cfcf25c51c3b1777$export$11e63f7b0f3d9900 = $cfcf25c51c3b1777$var$loader.load;
var $cfcf25c51c3b1777$export$7aabae09a30b04c2 = $cfcf25c51c3b1777$var$loader.loadAll;
var $cfcf25c51c3b1777$export$2069a8a5a76faa2 = $cfcf25c51c3b1777$var$dumper.dump;
var $cfcf25c51c3b1777$export$28af3d4da69ed747 = $cfcf25c51c3b1777$var$exception;
// Re-export all types in case user wants to create custom schema
var $cfcf25c51c3b1777$export$b14ad400b1d09e0f = {
    binary: $cfcf25c51c3b1777$var$binary,
    float: $cfcf25c51c3b1777$var$float,
    map: $cfcf25c51c3b1777$var$map,
    null: $cfcf25c51c3b1777$var$_null,
    pairs: $cfcf25c51c3b1777$var$pairs,
    set: $cfcf25c51c3b1777$var$set,
    timestamp: $cfcf25c51c3b1777$var$timestamp,
    bool: $cfcf25c51c3b1777$var$bool,
    int: $cfcf25c51c3b1777$var$int,
    merge: $cfcf25c51c3b1777$var$merge,
    omap: $cfcf25c51c3b1777$var$omap,
    seq: $cfcf25c51c3b1777$var$seq,
    str: $cfcf25c51c3b1777$var$str
};
// Removed functions from JS-YAML 3.0.x
var $cfcf25c51c3b1777$export$ecc08907c0e2af9b = $cfcf25c51c3b1777$var$renamed("safeLoad", "load");
var $cfcf25c51c3b1777$export$c2cc0f4fb6d29644 = $cfcf25c51c3b1777$var$renamed("safeLoadAll", "loadAll");
var $cfcf25c51c3b1777$export$befffea07f2abcf0 = $cfcf25c51c3b1777$var$renamed("safeDump", "dump");
var $cfcf25c51c3b1777$var$jsYaml = {
    Type: $cfcf25c51c3b1777$export$92738401e1603719,
    Schema: $cfcf25c51c3b1777$export$19342e026b58ebb7,
    FAILSAFE_SCHEMA: $cfcf25c51c3b1777$export$aefe34bace55c48e,
    JSON_SCHEMA: $cfcf25c51c3b1777$export$3f5573a59aee743,
    CORE_SCHEMA: $cfcf25c51c3b1777$export$cb27b7e9f9bc8fa8,
    DEFAULT_SCHEMA: $cfcf25c51c3b1777$export$54192bc17d2d9e2a,
    load: $cfcf25c51c3b1777$export$11e63f7b0f3d9900,
    loadAll: $cfcf25c51c3b1777$export$7aabae09a30b04c2,
    dump: $cfcf25c51c3b1777$export$2069a8a5a76faa2,
    YAMLException: $cfcf25c51c3b1777$export$28af3d4da69ed747,
    types: $cfcf25c51c3b1777$export$b14ad400b1d09e0f,
    safeLoad: $cfcf25c51c3b1777$export$ecc08907c0e2af9b,
    safeLoadAll: $cfcf25c51c3b1777$export$c2cc0f4fb6d29644,
    safeDump: $cfcf25c51c3b1777$export$befffea07f2abcf0
};
var $cfcf25c51c3b1777$export$2e2bcd8739ae039 = $cfcf25c51c3b1777$var$jsYaml;


var $72f8eca84efc7805$exports = {};
(function(global, factory) {
    $72f8eca84efc7805$exports = factory();
})($72f8eca84efc7805$exports, function() {
    "use strict";
    function createCommonjsModule(fn, module) {
        return module = {
            exports: {}
        }, fn(module, module.exports), module.exports;
    }
    var _global = createCommonjsModule(function(module) {
        // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
        var global = module.exports = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
        if (typeof __g == "number") __g = global;
         // eslint-disable-line no-undef
    });
    var _core = createCommonjsModule(function(module) {
        var core = module.exports = {
            version: "2.6.5"
        };
        if (typeof __e == "number") __e = core;
         // eslint-disable-line no-undef
    });
    var _core_1 = _core.version;
    var _isObject = function(it) {
        return typeof it === "object" ? it !== null : typeof it === "function";
    };
    var _anObject = function(it) {
        if (!_isObject(it)) throw TypeError(it + " is not an object!");
        return it;
    };
    var _fails = function(exec) {
        try {
            return !!exec();
        } catch (e) {
            return true;
        }
    };
    // Thank's IE8 for his funny defineProperty
    var _descriptors = !_fails(function() {
        return Object.defineProperty({}, "a", {
            get: function() {
                return 7;
            }
        }).a != 7;
    });
    var document = _global.document;
    // typeof document.createElement is 'object' in old IE
    var is = _isObject(document) && _isObject(document.createElement);
    var _domCreate = function(it) {
        return is ? document.createElement(it) : {};
    };
    var _ie8DomDefine = !_descriptors && !_fails(function() {
        return Object.defineProperty(_domCreate("div"), "a", {
            get: function() {
                return 7;
            }
        }).a != 7;
    });
    // 7.1.1 ToPrimitive(input [, PreferredType])
    // instead of the ES6 spec version, we didn't implement @@toPrimitive case
    // and the second argument - flag - preferred type is a string
    var _toPrimitive = function(it, S) {
        if (!_isObject(it)) return it;
        var fn, val;
        if (S && typeof (fn = it.toString) == "function" && !_isObject(val = fn.call(it))) return val;
        if (typeof (fn = it.valueOf) == "function" && !_isObject(val = fn.call(it))) return val;
        if (!S && typeof (fn = it.toString) == "function" && !_isObject(val = fn.call(it))) return val;
        throw TypeError("Can't convert object to primitive value");
    };
    var dP = Object.defineProperty;
    var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
        _anObject(O);
        P = _toPrimitive(P, true);
        _anObject(Attributes);
        if (_ie8DomDefine) try {
            return dP(O, P, Attributes);
        } catch (e) {}
        if ("get" in Attributes || "set" in Attributes) throw TypeError("Accessors not supported!");
        if ("value" in Attributes) O[P] = Attributes.value;
        return O;
    };
    var _objectDp = {
        f: f
    };
    var _propertyDesc = function(bitmap, value) {
        return {
            enumerable: !(bitmap & 1),
            configurable: !(bitmap & 2),
            writable: !(bitmap & 4),
            value: value
        };
    };
    var _hide = _descriptors ? function(object, key, value) {
        return _objectDp.f(object, key, _propertyDesc(1, value));
    } : function(object, key, value) {
        object[key] = value;
        return object;
    };
    var hasOwnProperty = {}.hasOwnProperty;
    var _has = function(it, key) {
        return hasOwnProperty.call(it, key);
    };
    var id = 0;
    var px = Math.random();
    var _uid = function(key) {
        return "Symbol(".concat(key === undefined ? "" : key, ")_", (++id + px).toString(36));
    };
    var _library = false;
    var _shared = createCommonjsModule(function(module) {
        var SHARED = "__core-js_shared__";
        var store = _global[SHARED] || (_global[SHARED] = {});
        (module.exports = function(key, value) {
            return store[key] || (store[key] = value !== undefined ? value : {});
        })("versions", []).push({
            version: _core.version,
            mode: _library ? "pure" : "global",
            copyright: "\xa9 2019 Denis Pushkarev (zloirock.ru)"
        });
    });
    var _functionToString = _shared("native-function-to-string", Function.toString);
    var _redefine = createCommonjsModule(function(module) {
        var SRC = _uid("src");
        var TO_STRING = "toString";
        var TPL = ("" + _functionToString).split(TO_STRING);
        _core.inspectSource = function(it) {
            return _functionToString.call(it);
        };
        (module.exports = function(O, key, val, safe) {
            var isFunction = typeof val == "function";
            if (isFunction) _has(val, "name") || _hide(val, "name", key);
            if (O[key] === val) return;
            if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? "" + O[key] : TPL.join(String(key)));
            if (O === _global) O[key] = val;
            else if (!safe) {
                delete O[key];
                _hide(O, key, val);
            } else if (O[key]) O[key] = val;
            else _hide(O, key, val);
        // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
        })(Function.prototype, TO_STRING, function toString() {
            return typeof this == "function" && this[SRC] || _functionToString.call(this);
        });
    });
    var _aFunction = function(it) {
        if (typeof it != "function") throw TypeError(it + " is not a function!");
        return it;
    };
    // optional / simple context binding
    var _ctx = function(fn, that, length) {
        _aFunction(fn);
        if (that === undefined) return fn;
        switch(length){
            case 1:
                return function(a) {
                    return fn.call(that, a);
                };
            case 2:
                return function(a, b) {
                    return fn.call(that, a, b);
                };
            case 3:
                return function(a, b, c) {
                    return fn.call(that, a, b, c);
                };
        }
        return function() {
            return fn.apply(that, arguments);
        };
    };
    var PROTOTYPE = "prototype";
    var $export = function(type, name, source) {
        var IS_FORCED = type & $export.F;
        var IS_GLOBAL = type & $export.G;
        var IS_STATIC = type & $export.S;
        var IS_PROTO = type & $export.P;
        var IS_BIND = type & $export.B;
        var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
        var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
        var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
        var key, own, out, exp;
        if (IS_GLOBAL) source = name;
        for(key in source){
            // contains in native
            own = !IS_FORCED && target && target[key] !== undefined;
            // export native or passed
            out = (own ? target : source)[key];
            // bind timers to global for call from export context
            exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == "function" ? _ctx(Function.call, out) : out;
            // extend global
            if (target) _redefine(target, key, out, type & $export.U);
            // export
            if (exports[key] != out) _hide(exports, key, exp);
            if (IS_PROTO && expProto[key] != out) expProto[key] = out;
        }
    };
    _global.core = _core;
    // type bitmap
    $export.F = 1; // forced
    $export.G = 2; // global
    $export.S = 4; // static
    $export.P = 8; // proto
    $export.B = 16; // bind
    $export.W = 32; // wrap
    $export.U = 64; // safe
    $export.R = 128; // real proto method for `library`
    var _export = $export;
    // 7.1.4 ToInteger
    var ceil = Math.ceil;
    var floor = Math.floor;
    var _toInteger = function(it) {
        return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
    };
    // 7.2.1 RequireObjectCoercible(argument)
    var _defined = function(it) {
        if (it == undefined) throw TypeError("Can't call method on  " + it);
        return it;
    };
    // true  -> String#at
    // false -> String#codePointAt
    var _stringAt = function(TO_STRING) {
        return function(that, pos) {
            var s = String(_defined(that));
            var i = _toInteger(pos);
            var l = s.length;
            var a, b;
            if (i < 0 || i >= l) return TO_STRING ? "" : undefined;
            a = s.charCodeAt(i);
            return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
        };
    };
    var $at = _stringAt(false);
    _export(_export.P, "String", {
        // 21.1.3.3 String.prototype.codePointAt(pos)
        codePointAt: function codePointAt(pos) {
            return $at(this, pos);
        }
    });
    var codePointAt = _core.String.codePointAt;
    var max = Math.max;
    var min = Math.min;
    var _toAbsoluteIndex = function(index, length) {
        index = _toInteger(index);
        return index < 0 ? max(index + length, 0) : min(index, length);
    };
    var fromCharCode = String.fromCharCode;
    var $fromCodePoint = String.fromCodePoint;
    // length should be 1, old FF problem
    _export(_export.S + _export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), "String", {
        // 21.1.2.2 String.fromCodePoint(...codePoints)
        fromCodePoint: function fromCodePoint(x) {
            var arguments$1 = arguments;
            // eslint-disable-line no-unused-vars
            var res = [];
            var aLen = arguments.length;
            var i = 0;
            var code;
            while(aLen > i){
                code = +arguments$1[i++];
                if (_toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + " is not a valid code point");
                res.push(code < 0x10000 ? fromCharCode(code) : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00));
            }
            return res.join("");
        }
    });
    var fromCodePoint = _core.String.fromCodePoint;
    // This is a generated file. Do not edit.
    var Space_Separator = /[\u1680\u2000-\u200A\u202F\u205F\u3000]/;
    var ID_Start = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/;
    var ID_Continue = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/;
    var unicode = {
        Space_Separator: Space_Separator,
        ID_Start: ID_Start,
        ID_Continue: ID_Continue
    };
    var util = {
        isSpaceSeparator: function isSpaceSeparator(c) {
            return typeof c === "string" && unicode.Space_Separator.test(c);
        },
        isIdStartChar: function isIdStartChar(c) {
            return typeof c === "string" && (c >= "a" && c <= "z" || c >= "A" && c <= "Z" || c === "$" || c === "_" || unicode.ID_Start.test(c));
        },
        isIdContinueChar: function isIdContinueChar(c) {
            return typeof c === "string" && (c >= "a" && c <= "z" || c >= "A" && c <= "Z" || c >= "0" && c <= "9" || c === "$" || c === "_" || c === "\u200C" || c === "\u200D" || unicode.ID_Continue.test(c));
        },
        isDigit: function isDigit(c) {
            return typeof c === "string" && /[0-9]/.test(c);
        },
        isHexDigit: function isHexDigit(c) {
            return typeof c === "string" && /[0-9A-Fa-f]/.test(c);
        }
    };
    var source1;
    var parseState;
    var stack1;
    var pos1;
    var line;
    var column;
    var token1;
    var key1;
    var root;
    var parse = function parse(text, reviver) {
        source1 = String(text);
        parseState = "start";
        stack1 = [];
        pos1 = 0;
        line = 1;
        column = 0;
        token1 = undefined;
        key1 = undefined;
        root = undefined;
        do {
            token1 = lex();
            // This code is unreachable.
            // if (!parseStates[parseState]) {
            //     throw invalidParseState()
            // }
            parseStates[parseState]();
        }while (token1.type !== "eof");
        if (typeof reviver === "function") return internalize({
            "": root
        }, "", reviver);
        return root;
    };
    function internalize(holder, name, reviver) {
        var value = holder[name];
        if (value != null && typeof value === "object") for(var key in value){
            var replacement = internalize(value, key, reviver);
            if (replacement === undefined) delete value[key];
            else value[key] = replacement;
        }
        return reviver.call(holder, name, value);
    }
    var lexState;
    var buffer1;
    var doubleQuote;
    var sign;
    var c1;
    function lex() {
        lexState = "default";
        buffer1 = "";
        doubleQuote = false;
        sign = 1;
        for(;;){
            c1 = peek();
            // This code is unreachable.
            // if (!lexStates[lexState]) {
            //     throw invalidLexState(lexState)
            // }
            var token = lexStates[lexState]();
            if (token) return token;
        }
    }
    function peek() {
        if (source1[pos1]) return String.fromCodePoint(source1.codePointAt(pos1));
    }
    function read() {
        var c = peek();
        if (c === "\n") {
            line++;
            column = 0;
        } else if (c) column += c.length;
        else column++;
        if (c) pos1 += c.length;
        return c;
    }
    var lexStates = {
        default: function default$1() {
            switch(c1){
                case "	":
                case "\v":
                case "\f":
                case " ":
                case "\xa0":
                case "\uFEFF":
                case "\n":
                case "\r":
                case "\u2028":
                case "\u2029":
                    read();
                    return;
                case "/":
                    read();
                    lexState = "comment";
                    return;
                case undefined:
                    read();
                    return newToken("eof");
            }
            if (util.isSpaceSeparator(c1)) {
                read();
                return;
            }
            // This code is unreachable.
            // if (!lexStates[parseState]) {
            //     throw invalidLexState(parseState)
            // }
            return lexStates[parseState]();
        },
        comment: function comment() {
            switch(c1){
                case "*":
                    read();
                    lexState = "multiLineComment";
                    return;
                case "/":
                    read();
                    lexState = "singleLineComment";
                    return;
            }
            throw invalidChar(read());
        },
        multiLineComment: function multiLineComment() {
            switch(c1){
                case "*":
                    read();
                    lexState = "multiLineCommentAsterisk";
                    return;
                case undefined:
                    throw invalidChar(read());
            }
            read();
        },
        multiLineCommentAsterisk: function multiLineCommentAsterisk() {
            switch(c1){
                case "*":
                    read();
                    return;
                case "/":
                    read();
                    lexState = "default";
                    return;
                case undefined:
                    throw invalidChar(read());
            }
            read();
            lexState = "multiLineComment";
        },
        singleLineComment: function singleLineComment() {
            switch(c1){
                case "\n":
                case "\r":
                case "\u2028":
                case "\u2029":
                    read();
                    lexState = "default";
                    return;
                case undefined:
                    read();
                    return newToken("eof");
            }
            read();
        },
        value: function value() {
            switch(c1){
                case "{":
                case "[":
                    return newToken("punctuator", read());
                case "n":
                    read();
                    literal("ull");
                    return newToken("null", null);
                case "t":
                    read();
                    literal("rue");
                    return newToken("boolean", true);
                case "f":
                    read();
                    literal("alse");
                    return newToken("boolean", false);
                case "-":
                case "+":
                    if (read() === "-") sign = -1;
                    lexState = "sign";
                    return;
                case ".":
                    buffer1 = read();
                    lexState = "decimalPointLeading";
                    return;
                case "0":
                    buffer1 = read();
                    lexState = "zero";
                    return;
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                    buffer1 = read();
                    lexState = "decimalInteger";
                    return;
                case "I":
                    read();
                    literal("nfinity");
                    return newToken("numeric", Infinity);
                case "N":
                    read();
                    literal("aN");
                    return newToken("numeric", NaN);
                case '"':
                case "'":
                    doubleQuote = read() === '"';
                    buffer1 = "";
                    lexState = "string";
                    return;
            }
            throw invalidChar(read());
        },
        identifierNameStartEscape: function identifierNameStartEscape() {
            if (c1 !== "u") throw invalidChar(read());
            read();
            var u = unicodeEscape();
            switch(u){
                case "$":
                case "_":
                    break;
                default:
                    if (!util.isIdStartChar(u)) throw invalidIdentifier();
                    break;
            }
            buffer1 += u;
            lexState = "identifierName";
        },
        identifierName: function identifierName() {
            switch(c1){
                case "$":
                case "_":
                case "\u200C":
                case "\u200D":
                    buffer1 += read();
                    return;
                case "\\":
                    read();
                    lexState = "identifierNameEscape";
                    return;
            }
            if (util.isIdContinueChar(c1)) {
                buffer1 += read();
                return;
            }
            return newToken("identifier", buffer1);
        },
        identifierNameEscape: function identifierNameEscape() {
            if (c1 !== "u") throw invalidChar(read());
            read();
            var u = unicodeEscape();
            switch(u){
                case "$":
                case "_":
                case "\u200C":
                case "\u200D":
                    break;
                default:
                    if (!util.isIdContinueChar(u)) throw invalidIdentifier();
                    break;
            }
            buffer1 += u;
            lexState = "identifierName";
        },
        sign: function sign$1() {
            switch(c1){
                case ".":
                    buffer1 = read();
                    lexState = "decimalPointLeading";
                    return;
                case "0":
                    buffer1 = read();
                    lexState = "zero";
                    return;
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                    buffer1 = read();
                    lexState = "decimalInteger";
                    return;
                case "I":
                    read();
                    literal("nfinity");
                    return newToken("numeric", sign * Infinity);
                case "N":
                    read();
                    literal("aN");
                    return newToken("numeric", NaN);
            }
            throw invalidChar(read());
        },
        zero: function zero() {
            switch(c1){
                case ".":
                    buffer1 += read();
                    lexState = "decimalPoint";
                    return;
                case "e":
                case "E":
                    buffer1 += read();
                    lexState = "decimalExponent";
                    return;
                case "x":
                case "X":
                    buffer1 += read();
                    lexState = "hexadecimal";
                    return;
            }
            return newToken("numeric", sign * 0);
        },
        decimalInteger: function decimalInteger() {
            switch(c1){
                case ".":
                    buffer1 += read();
                    lexState = "decimalPoint";
                    return;
                case "e":
                case "E":
                    buffer1 += read();
                    lexState = "decimalExponent";
                    return;
            }
            if (util.isDigit(c1)) {
                buffer1 += read();
                return;
            }
            return newToken("numeric", sign * Number(buffer1));
        },
        decimalPointLeading: function decimalPointLeading() {
            if (util.isDigit(c1)) {
                buffer1 += read();
                lexState = "decimalFraction";
                return;
            }
            throw invalidChar(read());
        },
        decimalPoint: function decimalPoint() {
            switch(c1){
                case "e":
                case "E":
                    buffer1 += read();
                    lexState = "decimalExponent";
                    return;
            }
            if (util.isDigit(c1)) {
                buffer1 += read();
                lexState = "decimalFraction";
                return;
            }
            return newToken("numeric", sign * Number(buffer1));
        },
        decimalFraction: function decimalFraction() {
            switch(c1){
                case "e":
                case "E":
                    buffer1 += read();
                    lexState = "decimalExponent";
                    return;
            }
            if (util.isDigit(c1)) {
                buffer1 += read();
                return;
            }
            return newToken("numeric", sign * Number(buffer1));
        },
        decimalExponent: function decimalExponent() {
            switch(c1){
                case "+":
                case "-":
                    buffer1 += read();
                    lexState = "decimalExponentSign";
                    return;
            }
            if (util.isDigit(c1)) {
                buffer1 += read();
                lexState = "decimalExponentInteger";
                return;
            }
            throw invalidChar(read());
        },
        decimalExponentSign: function decimalExponentSign() {
            if (util.isDigit(c1)) {
                buffer1 += read();
                lexState = "decimalExponentInteger";
                return;
            }
            throw invalidChar(read());
        },
        decimalExponentInteger: function decimalExponentInteger() {
            if (util.isDigit(c1)) {
                buffer1 += read();
                return;
            }
            return newToken("numeric", sign * Number(buffer1));
        },
        hexadecimal: function hexadecimal() {
            if (util.isHexDigit(c1)) {
                buffer1 += read();
                lexState = "hexadecimalInteger";
                return;
            }
            throw invalidChar(read());
        },
        hexadecimalInteger: function hexadecimalInteger() {
            if (util.isHexDigit(c1)) {
                buffer1 += read();
                return;
            }
            return newToken("numeric", sign * Number(buffer1));
        },
        string: function string() {
            switch(c1){
                case "\\":
                    read();
                    buffer1 += escape();
                    return;
                case '"':
                    if (doubleQuote) {
                        read();
                        return newToken("string", buffer1);
                    }
                    buffer1 += read();
                    return;
                case "'":
                    if (!doubleQuote) {
                        read();
                        return newToken("string", buffer1);
                    }
                    buffer1 += read();
                    return;
                case "\n":
                case "\r":
                    throw invalidChar(read());
                case "\u2028":
                case "\u2029":
                    separatorChar(c1);
                    break;
                case undefined:
                    throw invalidChar(read());
            }
            buffer1 += read();
        },
        start: function start() {
            switch(c1){
                case "{":
                case "[":
                    return newToken("punctuator", read());
            }
            lexState = "value";
        },
        beforePropertyName: function beforePropertyName() {
            switch(c1){
                case "$":
                case "_":
                    buffer1 = read();
                    lexState = "identifierName";
                    return;
                case "\\":
                    read();
                    lexState = "identifierNameStartEscape";
                    return;
                case "}":
                    return newToken("punctuator", read());
                case '"':
                case "'":
                    doubleQuote = read() === '"';
                    lexState = "string";
                    return;
            }
            if (util.isIdStartChar(c1)) {
                buffer1 += read();
                lexState = "identifierName";
                return;
            }
            throw invalidChar(read());
        },
        afterPropertyName: function afterPropertyName() {
            if (c1 === ":") return newToken("punctuator", read());
            throw invalidChar(read());
        },
        beforePropertyValue: function beforePropertyValue() {
            lexState = "value";
        },
        afterPropertyValue: function afterPropertyValue() {
            switch(c1){
                case ",":
                case "}":
                    return newToken("punctuator", read());
            }
            throw invalidChar(read());
        },
        beforeArrayValue: function beforeArrayValue() {
            if (c1 === "]") return newToken("punctuator", read());
            lexState = "value";
        },
        afterArrayValue: function afterArrayValue() {
            switch(c1){
                case ",":
                case "]":
                    return newToken("punctuator", read());
            }
            throw invalidChar(read());
        },
        end: function end() {
            // This code is unreachable since it's handled by the default lexState.
            // if (c === undefined) {
            //     read()
            //     return newToken('eof')
            // }
            throw invalidChar(read());
        }
    };
    function newToken(type, value) {
        return {
            type: type,
            value: value,
            line: line,
            column: column
        };
    }
    function literal(s) {
        for(var i = 0, list = s; i < list.length; i += 1){
            var c = list[i];
            var p = peek();
            if (p !== c) throw invalidChar(read());
            read();
        }
    }
    function escape() {
        var c = peek();
        switch(c){
            case "b":
                read();
                return "\b";
            case "f":
                read();
                return "\f";
            case "n":
                read();
                return "\n";
            case "r":
                read();
                return "\r";
            case "t":
                read();
                return "	";
            case "v":
                read();
                return "\v";
            case "0":
                read();
                if (util.isDigit(peek())) throw invalidChar(read());
                return "\0";
            case "x":
                read();
                return hexEscape();
            case "u":
                read();
                return unicodeEscape();
            case "\n":
            case "\u2028":
            case "\u2029":
                read();
                return "";
            case "\r":
                read();
                if (peek() === "\n") read();
                return "";
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                throw invalidChar(read());
            case undefined:
                throw invalidChar(read());
        }
        return read();
    }
    function hexEscape() {
        var buffer = "";
        var c = peek();
        if (!util.isHexDigit(c)) throw invalidChar(read());
        buffer += read();
        c = peek();
        if (!util.isHexDigit(c)) throw invalidChar(read());
        buffer += read();
        return String.fromCodePoint(parseInt(buffer, 16));
    }
    function unicodeEscape() {
        var buffer = "";
        var count = 4;
        while(count-- > 0){
            var c = peek();
            if (!util.isHexDigit(c)) throw invalidChar(read());
            buffer += read();
        }
        return String.fromCodePoint(parseInt(buffer, 16));
    }
    var parseStates = {
        start: function start() {
            if (token1.type === "eof") throw invalidEOF();
            push();
        },
        beforePropertyName: function beforePropertyName() {
            switch(token1.type){
                case "identifier":
                case "string":
                    key1 = token1.value;
                    parseState = "afterPropertyName";
                    return;
                case "punctuator":
                    // This code is unreachable since it's handled by the lexState.
                    // if (token.value !== '}') {
                    //     throw invalidToken()
                    // }
                    pop();
                    return;
                case "eof":
                    throw invalidEOF();
            }
        // This code is unreachable since it's handled by the lexState.
        // throw invalidToken()
        },
        afterPropertyName: function afterPropertyName() {
            // This code is unreachable since it's handled by the lexState.
            // if (token.type !== 'punctuator' || token.value !== ':') {
            //     throw invalidToken()
            // }
            if (token1.type === "eof") throw invalidEOF();
            parseState = "beforePropertyValue";
        },
        beforePropertyValue: function beforePropertyValue() {
            if (token1.type === "eof") throw invalidEOF();
            push();
        },
        beforeArrayValue: function beforeArrayValue() {
            if (token1.type === "eof") throw invalidEOF();
            if (token1.type === "punctuator" && token1.value === "]") {
                pop();
                return;
            }
            push();
        },
        afterPropertyValue: function afterPropertyValue() {
            // This code is unreachable since it's handled by the lexState.
            // if (token.type !== 'punctuator') {
            //     throw invalidToken()
            // }
            if (token1.type === "eof") throw invalidEOF();
            switch(token1.value){
                case ",":
                    parseState = "beforePropertyName";
                    return;
                case "}":
                    pop();
            }
        // This code is unreachable since it's handled by the lexState.
        // throw invalidToken()
        },
        afterArrayValue: function afterArrayValue() {
            // This code is unreachable since it's handled by the lexState.
            // if (token.type !== 'punctuator') {
            //     throw invalidToken()
            // }
            if (token1.type === "eof") throw invalidEOF();
            switch(token1.value){
                case ",":
                    parseState = "beforeArrayValue";
                    return;
                case "]":
                    pop();
            }
        // This code is unreachable since it's handled by the lexState.
        // throw invalidToken()
        },
        end: function end() {
        // This code is unreachable since it's handled by the lexState.
        // if (token.type !== 'eof') {
        //     throw invalidToken()
        // }
        }
    };
    function push() {
        var value;
        switch(token1.type){
            case "punctuator":
                switch(token1.value){
                    case "{":
                        value = {};
                        break;
                    case "[":
                        value = [];
                        break;
                }
                break;
            case "null":
            case "boolean":
            case "numeric":
            case "string":
                value = token1.value;
                break;
        }
        if (root === undefined) root = value;
        else {
            var parent = stack1[stack1.length - 1];
            if (Array.isArray(parent)) parent.push(value);
            else parent[key1] = value;
        }
        if (value !== null && typeof value === "object") {
            stack1.push(value);
            if (Array.isArray(value)) parseState = "beforeArrayValue";
            else parseState = "beforePropertyName";
        } else {
            var current = stack1[stack1.length - 1];
            if (current == null) parseState = "end";
            else if (Array.isArray(current)) parseState = "afterArrayValue";
            else parseState = "afterPropertyValue";
        }
    }
    function pop() {
        stack1.pop();
        var current = stack1[stack1.length - 1];
        if (current == null) parseState = "end";
        else if (Array.isArray(current)) parseState = "afterArrayValue";
        else parseState = "afterPropertyValue";
    }
    // This code is unreachable.
    // function invalidParseState () {
    //     return new Error(`JSON5: invalid parse state '${parseState}'`)
    // }
    // This code is unreachable.
    // function invalidLexState (state) {
    //     return new Error(`JSON5: invalid lex state '${state}'`)
    // }
    function invalidChar(c) {
        if (c === undefined) return syntaxError("JSON5: invalid end of input at " + line + ":" + column);
        return syntaxError("JSON5: invalid character '" + formatChar(c) + "' at " + line + ":" + column);
    }
    function invalidEOF() {
        return syntaxError("JSON5: invalid end of input at " + line + ":" + column);
    }
    // This code is unreachable.
    // function invalidToken () {
    //     if (token.type === 'eof') {
    //         return syntaxError(`JSON5: invalid end of input at ${line}:${column}`)
    //     }
    //     const c = String.fromCodePoint(token.value.codePointAt(0))
    //     return syntaxError(`JSON5: invalid character '${formatChar(c)}' at ${line}:${column}`)
    // }
    function invalidIdentifier() {
        column -= 5;
        return syntaxError("JSON5: invalid identifier character at " + line + ":" + column);
    }
    function separatorChar(c) {
        console.warn("JSON5: '" + formatChar(c) + "' in strings is not valid ECMAScript; consider escaping");
    }
    function formatChar(c) {
        var replacements = {
            "'": "\\'",
            '"': '\\"',
            "\\": "\\\\",
            "\b": "\\b",
            "\f": "\\f",
            "\n": "\\n",
            "\r": "\\r",
            "	": "\\t",
            "\v": "\\v",
            "\0": "\\0",
            "\u2028": "\\u2028",
            "\u2029": "\\u2029"
        };
        if (replacements[c]) return replacements[c];
        if (c < " ") {
            var hexString = c.charCodeAt(0).toString(16);
            return "\\x" + ("00" + hexString).substring(hexString.length);
        }
        return c;
    }
    function syntaxError(message) {
        var err = new SyntaxError(message);
        err.lineNumber = line;
        err.columnNumber = column;
        return err;
    }
    var stringify = function stringify(value1, replacer, space) {
        var stack = [];
        var indent = "";
        var propertyList;
        var replacerFunc;
        var gap = "";
        var quote;
        if (replacer != null && typeof replacer === "object" && !Array.isArray(replacer)) {
            space = replacer.space;
            quote = replacer.quote;
            replacer = replacer.replacer;
        }
        if (typeof replacer === "function") replacerFunc = replacer;
        else if (Array.isArray(replacer)) {
            propertyList = [];
            for(var i = 0, list = replacer; i < list.length; i += 1){
                var v = list[i];
                var item = void 0;
                if (typeof v === "string") item = v;
                else if (typeof v === "number" || v instanceof String || v instanceof Number) item = String(v);
                if (item !== undefined && propertyList.indexOf(item) < 0) propertyList.push(item);
            }
        }
        if (space instanceof Number) space = Number(space);
        else if (space instanceof String) space = String(space);
        if (typeof space === "number") {
            if (space > 0) {
                space = Math.min(10, Math.floor(space));
                gap = "          ".substr(0, space);
            }
        } else if (typeof space === "string") gap = space.substr(0, 10);
        return serializeProperty("", {
            "": value1
        });
        function serializeProperty(key, holder) {
            var value = holder[key];
            if (value != null) {
                if (typeof value.toJSON5 === "function") {
                    value = value.toJSON5(key);
                } else if (typeof value.toJSON === "function") {
                    value = value.toJSON(key);
                }
            }
            if (replacerFunc) {
                value = replacerFunc.call(holder, key, value);
            }
            if (value instanceof Number) {
                value = Number(value);
            } else if (value instanceof String) {
                value = String(value);
            } else if (value instanceof Boolean) {
                value = value.valueOf();
            }
            switch(value){
                case null:
                    return "null";
                case true:
                    return "true";
                case false:
                    return "false";
            }
            if (typeof value === "string") {
                return quoteString(value, false);
            }
            if (typeof value === "number") {
                return String(value);
            }
            if (typeof value === "object") {
                return Array.isArray(value) ? serializeArray(value) : serializeObject(value);
            }
            return undefined;
        }
        function quoteString(value) {
            var quotes = {
                "'": 0.1,
                '"': 0.2
            };
            var replacements = {
                "'": "\\'",
                '"': '\\"',
                "\\": "\\\\",
                "\b": "\\b",
                "\f": "\\f",
                "\n": "\\n",
                "\r": "\\r",
                "	": "\\t",
                "\v": "\\v",
                "\0": "\\0",
                "\u2028": "\\u2028",
                "\u2029": "\\u2029"
            };
            var product = "";
            for(var i = 0; i < value.length; i++){
                var c = value[i];
                switch(c){
                    case "'":
                    case '"':
                        quotes[c]++;
                        product += c;
                        continue;
                    case "\0":
                        if (util.isDigit(value[i + 1])) {
                            product += "\\x00";
                            continue;
                        }
                }
                if (replacements[c]) {
                    product += replacements[c];
                    continue;
                }
                if (c < " ") {
                    var hexString = c.charCodeAt(0).toString(16);
                    product += "\\x" + ("00" + hexString).substring(hexString.length);
                    continue;
                }
                product += c;
            }
            var quoteChar = quote || Object.keys(quotes).reduce(function(a, b) {
                return quotes[a] < quotes[b] ? a : b;
            });
            product = product.replace(new RegExp(quoteChar, "g"), replacements[quoteChar]);
            return quoteChar + product + quoteChar;
        }
        function serializeObject(value) {
            if (stack.indexOf(value) >= 0) {
                throw TypeError("Converting circular structure to JSON5");
            }
            stack.push(value);
            var stepback = indent;
            indent = indent + gap;
            var keys = propertyList || Object.keys(value);
            var partial = [];
            for(var i = 0, list = keys; i < list.length; i += 1){
                var key = list[i];
                var propertyString = serializeProperty(key, value);
                if (propertyString !== undefined) {
                    var member = serializeKey(key) + ":";
                    if (gap !== "") {
                        member += " ";
                    }
                    member += propertyString;
                    partial.push(member);
                }
            }
            var final;
            if (partial.length === 0) {
                final = "{}";
            } else {
                var properties;
                if (gap === "") {
                    properties = partial.join(",");
                    final = "{" + properties + "}";
                } else {
                    var separator = ",\n" + indent;
                    properties = partial.join(separator);
                    final = "{\n" + indent + properties + ",\n" + stepback + "}";
                }
            }
            stack.pop();
            indent = stepback;
            return final;
        }
        function serializeKey(key) {
            if (key.length === 0) {
                return quoteString(key, true);
            }
            var firstChar = String.fromCodePoint(key.codePointAt(0));
            if (!util.isIdStartChar(firstChar)) {
                return quoteString(key, true);
            }
            for(var i = firstChar.length; i < key.length; i++){
                if (!util.isIdContinueChar(String.fromCodePoint(key.codePointAt(i)))) {
                    return quoteString(key, true);
                }
            }
            return key;
        }
        function serializeArray(value) {
            if (stack.indexOf(value) >= 0) {
                throw TypeError("Converting circular structure to JSON5");
            }
            stack.push(value);
            var stepback = indent;
            indent = indent + gap;
            var partial = [];
            for(var i = 0; i < value.length; i++){
                var propertyString = serializeProperty(String(i), value);
                partial.push(propertyString !== undefined ? propertyString : "null");
            }
            var final;
            if (partial.length === 0) {
                final = "[]";
            } else {
                if (gap === "") {
                    var properties = partial.join(",");
                    final = "[" + properties + "]";
                } else {
                    var separator = ",\n" + indent;
                    var properties$1 = partial.join(separator);
                    final = "[\n" + indent + properties$1 + ",\n" + stepback + "]";
                }
            }
            stack.pop();
            indent = stepback;
            return final;
        }
    };
    var JSON5 = {
        parse: parse,
        stringify: stringify
    };
    var lib = JSON5;
    var es5 = lib;
    return es5;
});


class $6c5f5cfc3fa4523a$export$915e9e7bd4f0f96d {
    constructor(message){
        this.message = message;
    }
}
function $6c5f5cfc3fa4523a$export$be84b78d16b1be5e(url, path) {
    if (url && path) return `${$6c5f5cfc3fa4523a$export$770c7916125832a9(url, "/")}/${$6c5f5cfc3fa4523a$export$c6a55a9d77585122(path, "/")}`;
    else if (url) return url;
    else if (path) return path;
    else return "";
}
function $6c5f5cfc3fa4523a$export$c6a55a9d77585122(text, pattern) {
    while(text.startsWith(pattern))text = text.slice(pattern.length);
    return text;
}
function $6c5f5cfc3fa4523a$export$770c7916125832a9(text, pattern) {
    while(text.endsWith(pattern))text = text.slice(0, -1 * pattern.length);
    return text;
}
function $6c5f5cfc3fa4523a$export$e772c8ff12451969(ms) {
    return new Promise((resolve)=>setTimeout(resolve, ms));
} //# sourceMappingURL=utilities.js.map



/**
 * @implements {IHooks}
 */ class $2ebefb9401e09ebe$var$Hooks {
    /**
	 * @callback HookCallback
	 * @this {*|Jsep} this
	 * @param {Jsep} env
	 * @returns: void
	 */ /**
	 * Adds the given callback to the list of callbacks for the given hook.
	 *
	 * The callback will be invoked when the hook it is registered for is run.
	 *
	 * One callback function can be registered to multiple hooks and the same hook multiple times.
	 *
	 * @param {string|object} name The name of the hook, or an object of callbacks keyed by name
	 * @param {HookCallback|boolean} callback The callback function which is given environment variables.
	 * @param {?boolean} [first=false] Will add the hook to the top of the list (defaults to the bottom)
	 * @public
	 */ add(name2, callback, first) {
        if (typeof arguments[0] != "string") // Multiple hook callbacks, keyed by name
        for(let name1 in arguments[0])this.add(name1, arguments[0][name1], arguments[1]);
        else (Array.isArray(name2) ? name2 : [
            name2
        ]).forEach(function(name) {
            this[name] = this[name] || [];
            if (callback) this[name][first ? "unshift" : "push"](callback);
        }, this);
    }
    /**
	 * Runs a hook invoking all registered callbacks with the given environment variables.
	 *
	 * Callbacks will be invoked synchronously and in the order in which they were registered.
	 *
	 * @param {string} name The name of the hook.
	 * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
	 * @public
	 */ run(name, env) {
        this[name] = this[name] || [];
        this[name].forEach(function(callback) {
            callback.call(env && env.context ? env.context : env, env);
        });
    }
}
/**
 * @implements {IPlugins}
 */ class $2ebefb9401e09ebe$var$Plugins {
    constructor(jsep1){
        this.jsep = jsep1;
        this.registered = {};
    }
    /**
	 * @callback PluginSetup
	 * @this {Jsep} jsep
	 * @returns: void
	 */ /**
	 * Adds the given plugin(s) to the registry
	 *
	 * @param {object} plugins
	 * @param {string} plugins.name The name of the plugin
	 * @param {PluginSetup} plugins.init The init function
	 * @public
	 */ register(...plugins) {
        plugins.forEach((plugin)=>{
            if (typeof plugin !== "object" || !plugin.name || !plugin.init) throw new Error("Invalid JSEP plugin format");
            if (this.registered[plugin.name]) // already registered. Ignore.
            return;
            plugin.init(this.jsep);
            this.registered[plugin.name] = plugin;
        });
    }
}
//     JavaScript Expression Parser (JSEP) 1.3.8
class $2ebefb9401e09ebe$export$90f6e7cc0133c961 {
    /**
	 * @returns {string}
	 */ static get version() {
        // To be filled in by the template
        return "1.3.8";
    }
    /**
	 * @returns {string}
	 */ static toString() {
        return "JavaScript Expression Parser (JSEP) v" + $2ebefb9401e09ebe$export$90f6e7cc0133c961.version;
    }
    // ==================== CONFIG ================================
    /**
	 * @method addUnaryOp
	 * @param {string} op_name The name of the unary op to add
	 * @returns {Jsep}
	 */ static addUnaryOp(op_name) {
        $2ebefb9401e09ebe$export$90f6e7cc0133c961.max_unop_len = Math.max(op_name.length, $2ebefb9401e09ebe$export$90f6e7cc0133c961.max_unop_len);
        $2ebefb9401e09ebe$export$90f6e7cc0133c961.unary_ops[op_name] = 1;
        return $2ebefb9401e09ebe$export$90f6e7cc0133c961;
    }
    /**
	 * @method jsep.addBinaryOp
	 * @param {string} op_name The name of the binary op to add
	 * @param {number} precedence The precedence of the binary op (can be a float). Higher number = higher precedence
	 * @param {boolean} [isRightAssociative=false] whether operator is right-associative
	 * @returns {Jsep}
	 */ static addBinaryOp(op_name, precedence, isRightAssociative) {
        $2ebefb9401e09ebe$export$90f6e7cc0133c961.max_binop_len = Math.max(op_name.length, $2ebefb9401e09ebe$export$90f6e7cc0133c961.max_binop_len);
        $2ebefb9401e09ebe$export$90f6e7cc0133c961.binary_ops[op_name] = precedence;
        if (isRightAssociative) $2ebefb9401e09ebe$export$90f6e7cc0133c961.right_associative.add(op_name);
        else $2ebefb9401e09ebe$export$90f6e7cc0133c961.right_associative.delete(op_name);
        return $2ebefb9401e09ebe$export$90f6e7cc0133c961;
    }
    /**
	 * @method addIdentifierChar
	 * @param {string} char The additional character to treat as a valid part of an identifier
	 * @returns {Jsep}
	 */ static addIdentifierChar(char) {
        $2ebefb9401e09ebe$export$90f6e7cc0133c961.additional_identifier_chars.add(char);
        return $2ebefb9401e09ebe$export$90f6e7cc0133c961;
    }
    /**
	 * @method addLiteral
	 * @param {string} literal_name The name of the literal to add
	 * @param {*} literal_value The value of the literal
	 * @returns {Jsep}
	 */ static addLiteral(literal_name, literal_value) {
        $2ebefb9401e09ebe$export$90f6e7cc0133c961.literals[literal_name] = literal_value;
        return $2ebefb9401e09ebe$export$90f6e7cc0133c961;
    }
    /**
	 * @method removeUnaryOp
	 * @param {string} op_name The name of the unary op to remove
	 * @returns {Jsep}
	 */ static removeUnaryOp(op_name) {
        delete $2ebefb9401e09ebe$export$90f6e7cc0133c961.unary_ops[op_name];
        if (op_name.length === $2ebefb9401e09ebe$export$90f6e7cc0133c961.max_unop_len) $2ebefb9401e09ebe$export$90f6e7cc0133c961.max_unop_len = $2ebefb9401e09ebe$export$90f6e7cc0133c961.getMaxKeyLen($2ebefb9401e09ebe$export$90f6e7cc0133c961.unary_ops);
        return $2ebefb9401e09ebe$export$90f6e7cc0133c961;
    }
    /**
	 * @method removeAllUnaryOps
	 * @returns {Jsep}
	 */ static removeAllUnaryOps() {
        $2ebefb9401e09ebe$export$90f6e7cc0133c961.unary_ops = {};
        $2ebefb9401e09ebe$export$90f6e7cc0133c961.max_unop_len = 0;
        return $2ebefb9401e09ebe$export$90f6e7cc0133c961;
    }
    /**
	 * @method removeIdentifierChar
	 * @param {string} char The additional character to stop treating as a valid part of an identifier
	 * @returns {Jsep}
	 */ static removeIdentifierChar(char) {
        $2ebefb9401e09ebe$export$90f6e7cc0133c961.additional_identifier_chars.delete(char);
        return $2ebefb9401e09ebe$export$90f6e7cc0133c961;
    }
    /**
	 * @method removeBinaryOp
	 * @param {string} op_name The name of the binary op to remove
	 * @returns {Jsep}
	 */ static removeBinaryOp(op_name) {
        delete $2ebefb9401e09ebe$export$90f6e7cc0133c961.binary_ops[op_name];
        if (op_name.length === $2ebefb9401e09ebe$export$90f6e7cc0133c961.max_binop_len) $2ebefb9401e09ebe$export$90f6e7cc0133c961.max_binop_len = $2ebefb9401e09ebe$export$90f6e7cc0133c961.getMaxKeyLen($2ebefb9401e09ebe$export$90f6e7cc0133c961.binary_ops);
        $2ebefb9401e09ebe$export$90f6e7cc0133c961.right_associative.delete(op_name);
        return $2ebefb9401e09ebe$export$90f6e7cc0133c961;
    }
    /**
	 * @method removeAllBinaryOps
	 * @returns {Jsep}
	 */ static removeAllBinaryOps() {
        $2ebefb9401e09ebe$export$90f6e7cc0133c961.binary_ops = {};
        $2ebefb9401e09ebe$export$90f6e7cc0133c961.max_binop_len = 0;
        return $2ebefb9401e09ebe$export$90f6e7cc0133c961;
    }
    /**
	 * @method removeLiteral
	 * @param {string} literal_name The name of the literal to remove
	 * @returns {Jsep}
	 */ static removeLiteral(literal_name) {
        delete $2ebefb9401e09ebe$export$90f6e7cc0133c961.literals[literal_name];
        return $2ebefb9401e09ebe$export$90f6e7cc0133c961;
    }
    /**
	 * @method removeAllLiterals
	 * @returns {Jsep}
	 */ static removeAllLiterals() {
        $2ebefb9401e09ebe$export$90f6e7cc0133c961.literals = {};
        return $2ebefb9401e09ebe$export$90f6e7cc0133c961;
    }
    // ==================== END CONFIG ============================
    /**
	 * @returns {string}
	 */ get char() {
        return this.expr.charAt(this.index);
    }
    /**
	 * @returns {number}
	 */ get code() {
        return this.expr.charCodeAt(this.index);
    }
    /**
	 * @param {string} expr a string with the passed in express
	 * @returns Jsep
	 */ constructor(expr){
        // `index` stores the character number we are currently at
        // All of the gobbles below will modify `index` as we move along
        this.expr = expr;
        this.index = 0;
    }
    /**
	 * static top-level parser
	 * @returns {jsep.Expression}
	 */ static parse(expr) {
        return new $2ebefb9401e09ebe$export$90f6e7cc0133c961(expr).parse();
    }
    /**
	 * Get the longest key length of any object
	 * @param {object} obj
	 * @returns {number}
	 */ static getMaxKeyLen(obj) {
        return Math.max(0, ...Object.keys(obj).map((k)=>k.length));
    }
    /**
	 * `ch` is a character code in the next three functions
	 * @param {number} ch
	 * @returns {boolean}
	 */ static isDecimalDigit(ch) {
        return ch >= 48 && ch <= 57; // 0...9
    }
    /**
	 * Returns the precedence of a binary operator or `0` if it isn't a binary operator. Can be float.
	 * @param {string} op_val
	 * @returns {number}
	 */ static binaryPrecedence(op_val) {
        return $2ebefb9401e09ebe$export$90f6e7cc0133c961.binary_ops[op_val] || 0;
    }
    /**
	 * Looks for start of identifier
	 * @param {number} ch
	 * @returns {boolean}
	 */ static isIdentifierStart(ch) {
        return ch >= 65 && ch <= 90 || ch >= 97 && ch <= 122 || ch >= 128 && !$2ebefb9401e09ebe$export$90f6e7cc0133c961.binary_ops[String.fromCharCode(ch)] || $2ebefb9401e09ebe$export$90f6e7cc0133c961.additional_identifier_chars.has(String.fromCharCode(ch)); // additional characters
    }
    /**
	 * @param {number} ch
	 * @returns {boolean}
	 */ static isIdentifierPart(ch) {
        return $2ebefb9401e09ebe$export$90f6e7cc0133c961.isIdentifierStart(ch) || $2ebefb9401e09ebe$export$90f6e7cc0133c961.isDecimalDigit(ch);
    }
    /**
	 * throw error at index of the expression
	 * @param {string} message
	 * @throws
	 */ throwError(message) {
        const error = new Error(message + " at character " + this.index);
        error.index = this.index;
        error.description = message;
        throw error;
    }
    /**
	 * Run a given hook
	 * @param {string} name
	 * @param {jsep.Expression|false} [node]
	 * @returns {?jsep.Expression}
	 */ runHook(name, node) {
        if ($2ebefb9401e09ebe$export$90f6e7cc0133c961.hooks[name]) {
            const env = {
                context: this,
                node: node
            };
            $2ebefb9401e09ebe$export$90f6e7cc0133c961.hooks.run(name, env);
            return env.node;
        }
        return node;
    }
    /**
	 * Runs a given hook until one returns a node
	 * @param {string} name
	 * @returns {?jsep.Expression}
	 */ searchHook(name) {
        if ($2ebefb9401e09ebe$export$90f6e7cc0133c961.hooks[name]) {
            const env = {
                context: this
            };
            $2ebefb9401e09ebe$export$90f6e7cc0133c961.hooks[name].find(function(callback) {
                callback.call(env.context, env);
                return env.node;
            });
            return env.node;
        }
    }
    /**
	 * Push `index` up to the next non-space character
	 */ gobbleSpaces() {
        let ch = this.code;
        // Whitespace
        while(ch === $2ebefb9401e09ebe$export$90f6e7cc0133c961.SPACE_CODE || ch === $2ebefb9401e09ebe$export$90f6e7cc0133c961.TAB_CODE || ch === $2ebefb9401e09ebe$export$90f6e7cc0133c961.LF_CODE || ch === $2ebefb9401e09ebe$export$90f6e7cc0133c961.CR_CODE)ch = this.expr.charCodeAt(++this.index);
        this.runHook("gobble-spaces");
    }
    /**
	 * Top-level method to parse all expressions and returns compound or single node
	 * @returns {jsep.Expression}
	 */ parse() {
        this.runHook("before-all");
        const nodes = this.gobbleExpressions();
        // If there's only one expression just try returning the expression
        const node = nodes.length === 1 ? nodes[0] : {
            type: $2ebefb9401e09ebe$export$90f6e7cc0133c961.COMPOUND,
            body: nodes
        };
        return this.runHook("after-all", node);
    }
    /**
	 * top-level parser (but can be reused within as well)
	 * @param {number} [untilICode]
	 * @returns {jsep.Expression[]}
	 */ gobbleExpressions(untilICode) {
        let nodes = [], ch_i, node;
        while(this.index < this.expr.length){
            ch_i = this.code;
            // Expressions can be separated by semicolons, commas, or just inferred without any
            // separators
            if (ch_i === $2ebefb9401e09ebe$export$90f6e7cc0133c961.SEMCOL_CODE || ch_i === $2ebefb9401e09ebe$export$90f6e7cc0133c961.COMMA_CODE) this.index++; // ignore separators
            else {
                // Try to gobble each expression individually
                if (node = this.gobbleExpression()) nodes.push(node);
                else if (this.index < this.expr.length) {
                    if (ch_i === untilICode) break;
                    this.throwError('Unexpected "' + this.char + '"');
                }
            }
        }
        return nodes;
    }
    /**
	 * The main parsing function.
	 * @returns {?jsep.Expression}
	 */ gobbleExpression() {
        const node = this.searchHook("gobble-expression") || this.gobbleBinaryExpression();
        this.gobbleSpaces();
        return this.runHook("after-expression", node);
    }
    /**
	 * Search for the operation portion of the string (e.g. `+`, `===`)
	 * Start by taking the longest possible binary operations (3 characters: `===`, `!==`, `>>>`)
	 * and move down from 3 to 2 to 1 character until a matching binary operation is found
	 * then, return that binary operation
	 * @returns {string|boolean}
	 */ gobbleBinaryOp() {
        this.gobbleSpaces();
        let to_check = this.expr.substr(this.index, $2ebefb9401e09ebe$export$90f6e7cc0133c961.max_binop_len);
        let tc_len = to_check.length;
        while(tc_len > 0){
            // Don't accept a binary op when it is an identifier.
            // Binary ops that start with a identifier-valid character must be followed
            // by a non identifier-part valid character
            if ($2ebefb9401e09ebe$export$90f6e7cc0133c961.binary_ops.hasOwnProperty(to_check) && (!$2ebefb9401e09ebe$export$90f6e7cc0133c961.isIdentifierStart(this.code) || this.index + to_check.length < this.expr.length && !$2ebefb9401e09ebe$export$90f6e7cc0133c961.isIdentifierPart(this.expr.charCodeAt(this.index + to_check.length)))) {
                this.index += tc_len;
                return to_check;
            }
            to_check = to_check.substr(0, --tc_len);
        }
        return false;
    }
    /**
	 * This function is responsible for gobbling an individual expression,
	 * e.g. `1`, `1+2`, `a+(b*2)-Math.sqrt(2)`
	 * @returns {?jsep.BinaryExpression}
	 */ gobbleBinaryExpression() {
        let node, biop, prec, stack, biop_info, left, right, i, cur_biop;
        // First, try to get the leftmost thing
        // Then, check to see if there's a binary operator operating on that leftmost thing
        // Don't gobbleBinaryOp without a left-hand-side
        left = this.gobbleToken();
        if (!left) return left;
        biop = this.gobbleBinaryOp();
        // If there wasn't a binary operator, just return the leftmost node
        if (!biop) return left;
        // Otherwise, we need to start a stack to properly place the binary operations in their
        // precedence structure
        biop_info = {
            value: biop,
            prec: $2ebefb9401e09ebe$export$90f6e7cc0133c961.binaryPrecedence(biop),
            right_a: $2ebefb9401e09ebe$export$90f6e7cc0133c961.right_associative.has(biop)
        };
        right = this.gobbleToken();
        if (!right) this.throwError("Expected expression after " + biop);
        stack = [
            left,
            biop_info,
            right
        ];
        // Properly deal with precedence using [recursive descent](http://www.engr.mun.ca/~theo/Misc/exp_parsing.htm)
        while(biop = this.gobbleBinaryOp()){
            prec = $2ebefb9401e09ebe$export$90f6e7cc0133c961.binaryPrecedence(biop);
            if (prec === 0) {
                this.index -= biop.length;
                break;
            }
            biop_info = {
                value: biop,
                prec: prec,
                right_a: $2ebefb9401e09ebe$export$90f6e7cc0133c961.right_associative.has(biop)
            };
            cur_biop = biop;
            // Reduce: make a binary expression from the three topmost entries.
            const comparePrev = (prev)=>biop_info.right_a && prev.right_a ? prec > prev.prec : prec <= prev.prec;
            while(stack.length > 2 && comparePrev(stack[stack.length - 2])){
                right = stack.pop();
                biop = stack.pop().value;
                left = stack.pop();
                node = {
                    type: $2ebefb9401e09ebe$export$90f6e7cc0133c961.BINARY_EXP,
                    operator: biop,
                    left: left,
                    right: right
                };
                stack.push(node);
            }
            node = this.gobbleToken();
            if (!node) this.throwError("Expected expression after " + cur_biop);
            stack.push(biop_info, node);
        }
        i = stack.length - 1;
        node = stack[i];
        while(i > 1){
            node = {
                type: $2ebefb9401e09ebe$export$90f6e7cc0133c961.BINARY_EXP,
                operator: stack[i - 1].value,
                left: stack[i - 2],
                right: node
            };
            i -= 2;
        }
        return node;
    }
    /**
	 * An individual part of a binary expression:
	 * e.g. `foo.bar(baz)`, `1`, `"abc"`, `(a % 2)` (because it's in parenthesis)
	 * @returns {boolean|jsep.Expression}
	 */ gobbleToken() {
        let ch, to_check, tc_len, node;
        this.gobbleSpaces();
        node = this.searchHook("gobble-token");
        if (node) return this.runHook("after-token", node);
        ch = this.code;
        if ($2ebefb9401e09ebe$export$90f6e7cc0133c961.isDecimalDigit(ch) || ch === $2ebefb9401e09ebe$export$90f6e7cc0133c961.PERIOD_CODE) // Char code 46 is a dot `.` which can start off a numeric literal
        return this.gobbleNumericLiteral();
        if (ch === $2ebefb9401e09ebe$export$90f6e7cc0133c961.SQUOTE_CODE || ch === $2ebefb9401e09ebe$export$90f6e7cc0133c961.DQUOTE_CODE) // Single or double quotes
        node = this.gobbleStringLiteral();
        else if (ch === $2ebefb9401e09ebe$export$90f6e7cc0133c961.OBRACK_CODE) node = this.gobbleArray();
        else {
            to_check = this.expr.substr(this.index, $2ebefb9401e09ebe$export$90f6e7cc0133c961.max_unop_len);
            tc_len = to_check.length;
            while(tc_len > 0){
                // Don't accept an unary op when it is an identifier.
                // Unary ops that start with a identifier-valid character must be followed
                // by a non identifier-part valid character
                if ($2ebefb9401e09ebe$export$90f6e7cc0133c961.unary_ops.hasOwnProperty(to_check) && (!$2ebefb9401e09ebe$export$90f6e7cc0133c961.isIdentifierStart(this.code) || this.index + to_check.length < this.expr.length && !$2ebefb9401e09ebe$export$90f6e7cc0133c961.isIdentifierPart(this.expr.charCodeAt(this.index + to_check.length)))) {
                    this.index += tc_len;
                    const argument = this.gobbleToken();
                    if (!argument) this.throwError("missing unaryOp argument");
                    return this.runHook("after-token", {
                        type: $2ebefb9401e09ebe$export$90f6e7cc0133c961.UNARY_EXP,
                        operator: to_check,
                        argument: argument,
                        prefix: true
                    });
                }
                to_check = to_check.substr(0, --tc_len);
            }
            if ($2ebefb9401e09ebe$export$90f6e7cc0133c961.isIdentifierStart(ch)) {
                node = this.gobbleIdentifier();
                if ($2ebefb9401e09ebe$export$90f6e7cc0133c961.literals.hasOwnProperty(node.name)) node = {
                    type: $2ebefb9401e09ebe$export$90f6e7cc0133c961.LITERAL,
                    value: $2ebefb9401e09ebe$export$90f6e7cc0133c961.literals[node.name],
                    raw: node.name
                };
                else if (node.name === $2ebefb9401e09ebe$export$90f6e7cc0133c961.this_str) node = {
                    type: $2ebefb9401e09ebe$export$90f6e7cc0133c961.THIS_EXP
                };
            } else if (ch === $2ebefb9401e09ebe$export$90f6e7cc0133c961.OPAREN_CODE) node = this.gobbleGroup();
        }
        if (!node) return this.runHook("after-token", false);
        node = this.gobbleTokenProperty(node);
        return this.runHook("after-token", node);
    }
    /**
	 * Gobble properties of of identifiers/strings/arrays/groups.
	 * e.g. `foo`, `bar.baz`, `foo['bar'].baz`
	 * It also gobbles function calls:
	 * e.g. `Math.acos(obj.angle)`
	 * @param {jsep.Expression} node
	 * @returns {jsep.Expression}
	 */ gobbleTokenProperty(node) {
        this.gobbleSpaces();
        let ch = this.code;
        while(ch === $2ebefb9401e09ebe$export$90f6e7cc0133c961.PERIOD_CODE || ch === $2ebefb9401e09ebe$export$90f6e7cc0133c961.OBRACK_CODE || ch === $2ebefb9401e09ebe$export$90f6e7cc0133c961.OPAREN_CODE || ch === $2ebefb9401e09ebe$export$90f6e7cc0133c961.QUMARK_CODE){
            let optional;
            if (ch === $2ebefb9401e09ebe$export$90f6e7cc0133c961.QUMARK_CODE) {
                if (this.expr.charCodeAt(this.index + 1) !== $2ebefb9401e09ebe$export$90f6e7cc0133c961.PERIOD_CODE) break;
                optional = true;
                this.index += 2;
                this.gobbleSpaces();
                ch = this.code;
            }
            this.index++;
            if (ch === $2ebefb9401e09ebe$export$90f6e7cc0133c961.OBRACK_CODE) {
                node = {
                    type: $2ebefb9401e09ebe$export$90f6e7cc0133c961.MEMBER_EXP,
                    computed: true,
                    object: node,
                    property: this.gobbleExpression()
                };
                this.gobbleSpaces();
                ch = this.code;
                if (ch !== $2ebefb9401e09ebe$export$90f6e7cc0133c961.CBRACK_CODE) this.throwError("Unclosed [");
                this.index++;
            } else if (ch === $2ebefb9401e09ebe$export$90f6e7cc0133c961.OPAREN_CODE) // A function call is being made; gobble all the arguments
            node = {
                type: $2ebefb9401e09ebe$export$90f6e7cc0133c961.CALL_EXP,
                "arguments": this.gobbleArguments($2ebefb9401e09ebe$export$90f6e7cc0133c961.CPAREN_CODE),
                callee: node
            };
            else if (ch === $2ebefb9401e09ebe$export$90f6e7cc0133c961.PERIOD_CODE || optional) {
                if (optional) this.index--;
                this.gobbleSpaces();
                node = {
                    type: $2ebefb9401e09ebe$export$90f6e7cc0133c961.MEMBER_EXP,
                    computed: false,
                    object: node,
                    property: this.gobbleIdentifier()
                };
            }
            if (optional) node.optional = true;
             // else leave undefined for compatibility with esprima
            this.gobbleSpaces();
            ch = this.code;
        }
        return node;
    }
    /**
	 * Parse simple numeric literals: `12`, `3.4`, `.5`. Do this by using a string to
	 * keep track of everything in the numeric literal and then calling `parseFloat` on that string
	 * @returns {jsep.Literal}
	 */ gobbleNumericLiteral() {
        let number = "", ch, chCode;
        while($2ebefb9401e09ebe$export$90f6e7cc0133c961.isDecimalDigit(this.code))number += this.expr.charAt(this.index++);
        if (this.code === $2ebefb9401e09ebe$export$90f6e7cc0133c961.PERIOD_CODE) {
            number += this.expr.charAt(this.index++);
            while($2ebefb9401e09ebe$export$90f6e7cc0133c961.isDecimalDigit(this.code))number += this.expr.charAt(this.index++);
        }
        ch = this.char;
        if (ch === "e" || ch === "E") {
            number += this.expr.charAt(this.index++);
            ch = this.char;
            if (ch === "+" || ch === "-") number += this.expr.charAt(this.index++);
            while($2ebefb9401e09ebe$export$90f6e7cc0133c961.isDecimalDigit(this.code))number += this.expr.charAt(this.index++);
            if (!$2ebefb9401e09ebe$export$90f6e7cc0133c961.isDecimalDigit(this.expr.charCodeAt(this.index - 1))) this.throwError("Expected exponent (" + number + this.char + ")");
        }
        chCode = this.code;
        // Check to make sure this isn't a variable name that start with a number (123abc)
        if ($2ebefb9401e09ebe$export$90f6e7cc0133c961.isIdentifierStart(chCode)) this.throwError("Variable names cannot start with a number (" + number + this.char + ")");
        else if (chCode === $2ebefb9401e09ebe$export$90f6e7cc0133c961.PERIOD_CODE || number.length === 1 && number.charCodeAt(0) === $2ebefb9401e09ebe$export$90f6e7cc0133c961.PERIOD_CODE) this.throwError("Unexpected period");
        return {
            type: $2ebefb9401e09ebe$export$90f6e7cc0133c961.LITERAL,
            value: parseFloat(number),
            raw: number
        };
    }
    /**
	 * Parses a string literal, staring with single or double quotes with basic support for escape codes
	 * e.g. `"hello world"`, `'this is\nJSEP'`
	 * @returns {jsep.Literal}
	 */ gobbleStringLiteral() {
        let str = "";
        const startIndex = this.index;
        const quote = this.expr.charAt(this.index++);
        let closed = false;
        while(this.index < this.expr.length){
            let ch = this.expr.charAt(this.index++);
            if (ch === quote) {
                closed = true;
                break;
            } else if (ch === "\\") {
                // Check for all of the common escape codes
                ch = this.expr.charAt(this.index++);
                switch(ch){
                    case "n":
                        str += "\n";
                        break;
                    case "r":
                        str += "\r";
                        break;
                    case "t":
                        str += "	";
                        break;
                    case "b":
                        str += "\b";
                        break;
                    case "f":
                        str += "\f";
                        break;
                    case "v":
                        str += "\v";
                        break;
                    default:
                        str += ch;
                }
            } else str += ch;
        }
        if (!closed) this.throwError('Unclosed quote after "' + str + '"');
        return {
            type: $2ebefb9401e09ebe$export$90f6e7cc0133c961.LITERAL,
            value: str,
            raw: this.expr.substring(startIndex, this.index)
        };
    }
    /**
	 * Gobbles only identifiers
	 * e.g.: `foo`, `_value`, `$x1`
	 * Also, this function checks if that identifier is a literal:
	 * (e.g. `true`, `false`, `null`) or `this`
	 * @returns {jsep.Identifier}
	 */ gobbleIdentifier() {
        let ch = this.code, start = this.index;
        if ($2ebefb9401e09ebe$export$90f6e7cc0133c961.isIdentifierStart(ch)) this.index++;
        else this.throwError("Unexpected " + this.char);
        while(this.index < this.expr.length){
            ch = this.code;
            if ($2ebefb9401e09ebe$export$90f6e7cc0133c961.isIdentifierPart(ch)) this.index++;
            else break;
        }
        return {
            type: $2ebefb9401e09ebe$export$90f6e7cc0133c961.IDENTIFIER,
            name: this.expr.slice(start, this.index)
        };
    }
    /**
	 * Gobbles a list of arguments within the context of a function call
	 * or array literal. This function also assumes that the opening character
	 * `(` or `[` has already been gobbled, and gobbles expressions and commas
	 * until the terminator character `)` or `]` is encountered.
	 * e.g. `foo(bar, baz)`, `my_func()`, or `[bar, baz]`
	 * @param {number} termination
	 * @returns {jsep.Expression[]}
	 */ gobbleArguments(termination) {
        const args = [];
        let closed = false;
        let separator_count = 0;
        while(this.index < this.expr.length){
            this.gobbleSpaces();
            let ch_i = this.code;
            if (ch_i === termination) {
                closed = true;
                this.index++;
                if (termination === $2ebefb9401e09ebe$export$90f6e7cc0133c961.CPAREN_CODE && separator_count && separator_count >= args.length) this.throwError("Unexpected token " + String.fromCharCode(termination));
                break;
            } else if (ch_i === $2ebefb9401e09ebe$export$90f6e7cc0133c961.COMMA_CODE) {
                this.index++;
                separator_count++;
                if (separator_count !== args.length) {
                    if (termination === $2ebefb9401e09ebe$export$90f6e7cc0133c961.CPAREN_CODE) this.throwError("Unexpected token ,");
                    else if (termination === $2ebefb9401e09ebe$export$90f6e7cc0133c961.CBRACK_CODE) for(let arg = args.length; arg < separator_count; arg++)args.push(null);
                }
            } else if (args.length !== separator_count && separator_count !== 0) // NOTE: `&& separator_count !== 0` allows for either all commas, or all spaces as arguments
            this.throwError("Expected comma");
            else {
                const node = this.gobbleExpression();
                if (!node || node.type === $2ebefb9401e09ebe$export$90f6e7cc0133c961.COMPOUND) this.throwError("Expected comma");
                args.push(node);
            }
        }
        if (!closed) this.throwError("Expected " + String.fromCharCode(termination));
        return args;
    }
    /**
	 * Responsible for parsing a group of things within parentheses `()`
	 * that have no identifier in front (so not a function call)
	 * This function assumes that it needs to gobble the opening parenthesis
	 * and then tries to gobble everything within that parenthesis, assuming
	 * that the next thing it should see is the close parenthesis. If not,
	 * then the expression probably doesn't have a `)`
	 * @returns {boolean|jsep.Expression}
	 */ gobbleGroup() {
        this.index++;
        let nodes = this.gobbleExpressions($2ebefb9401e09ebe$export$90f6e7cc0133c961.CPAREN_CODE);
        if (this.code === $2ebefb9401e09ebe$export$90f6e7cc0133c961.CPAREN_CODE) {
            this.index++;
            if (nodes.length === 1) return nodes[0];
            else if (!nodes.length) return false;
            else return {
                type: $2ebefb9401e09ebe$export$90f6e7cc0133c961.SEQUENCE_EXP,
                expressions: nodes
            };
        } else this.throwError("Unclosed (");
    }
    /**
	 * Responsible for parsing Array literals `[1, 2, 3]`
	 * This function assumes that it needs to gobble the opening bracket
	 * and then tries to gobble the expressions as arguments.
	 * @returns {jsep.ArrayExpression}
	 */ gobbleArray() {
        this.index++;
        return {
            type: $2ebefb9401e09ebe$export$90f6e7cc0133c961.ARRAY_EXP,
            elements: this.gobbleArguments($2ebefb9401e09ebe$export$90f6e7cc0133c961.CBRACK_CODE)
        };
    }
}
// Static fields:
const $2ebefb9401e09ebe$var$hooks = new $2ebefb9401e09ebe$var$Hooks();
Object.assign($2ebefb9401e09ebe$export$90f6e7cc0133c961, {
    hooks: $2ebefb9401e09ebe$var$hooks,
    plugins: new $2ebefb9401e09ebe$var$Plugins($2ebefb9401e09ebe$export$90f6e7cc0133c961),
    // Node Types
    // ----------
    // This is the full set of types that any JSEP node can be.
    // Store them here to save space when minified
    COMPOUND: "Compound",
    SEQUENCE_EXP: "SequenceExpression",
    IDENTIFIER: "Identifier",
    MEMBER_EXP: "MemberExpression",
    LITERAL: "Literal",
    THIS_EXP: "ThisExpression",
    CALL_EXP: "CallExpression",
    UNARY_EXP: "UnaryExpression",
    BINARY_EXP: "BinaryExpression",
    ARRAY_EXP: "ArrayExpression",
    TAB_CODE: 9,
    LF_CODE: 10,
    CR_CODE: 13,
    SPACE_CODE: 32,
    PERIOD_CODE: 46,
    COMMA_CODE: 44,
    SQUOTE_CODE: 39,
    DQUOTE_CODE: 34,
    OPAREN_CODE: 40,
    CPAREN_CODE: 41,
    OBRACK_CODE: 91,
    CBRACK_CODE: 93,
    QUMARK_CODE: 63,
    SEMCOL_CODE: 59,
    COLON_CODE: 58,
    // Operations
    // ----------
    // Use a quickly-accessible map to store all of the unary operators
    // Values are set to `1` (it really doesn't matter)
    unary_ops: {
        "-": 1,
        "!": 1,
        "~": 1,
        "+": 1
    },
    // Also use a map for the binary operations but set their values to their
    // binary precedence for quick reference (higher number = higher precedence)
    // see [Order of operations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)
    binary_ops: {
        "||": 1,
        "&&": 2,
        "|": 3,
        "^": 4,
        "&": 5,
        "==": 6,
        "!=": 6,
        "===": 6,
        "!==": 6,
        "<": 7,
        ">": 7,
        "<=": 7,
        ">=": 7,
        "<<": 8,
        ">>": 8,
        ">>>": 8,
        "+": 9,
        "-": 9,
        "*": 10,
        "/": 10,
        "%": 10
    },
    // sets specific binary_ops as right-associative
    right_associative: new Set(),
    // Additional valid identifier chars, apart from a-z, A-Z and 0-9 (except on the starting char)
    additional_identifier_chars: new Set([
        "$",
        "_"
    ]),
    // Literals
    // ----------
    // Store the values to return for the various literals we may encounter
    literals: {
        "true": true,
        "false": false,
        "null": null
    },
    // Except for `this`, which is special. This could be changed to something like `'self'` as well
    this_str: "this"
});
$2ebefb9401e09ebe$export$90f6e7cc0133c961.max_unop_len = $2ebefb9401e09ebe$export$90f6e7cc0133c961.getMaxKeyLen($2ebefb9401e09ebe$export$90f6e7cc0133c961.unary_ops);
$2ebefb9401e09ebe$export$90f6e7cc0133c961.max_binop_len = $2ebefb9401e09ebe$export$90f6e7cc0133c961.getMaxKeyLen($2ebefb9401e09ebe$export$90f6e7cc0133c961.binary_ops);
// Backward Compatibility:
const $2ebefb9401e09ebe$export$2e2bcd8739ae039 = (expr)=>new $2ebefb9401e09ebe$export$90f6e7cc0133c961(expr).parse();
const $2ebefb9401e09ebe$var$staticMethods = Object.getOwnPropertyNames($2ebefb9401e09ebe$export$90f6e7cc0133c961);
$2ebefb9401e09ebe$var$staticMethods.forEach((m)=>{
    if ($2ebefb9401e09ebe$export$2e2bcd8739ae039[m] === undefined && m !== "prototype") $2ebefb9401e09ebe$export$2e2bcd8739ae039[m] = $2ebefb9401e09ebe$export$90f6e7cc0133c961[m];
});
$2ebefb9401e09ebe$export$2e2bcd8739ae039.Jsep = $2ebefb9401e09ebe$export$90f6e7cc0133c961; // allows for const { Jsep } = require('jsep');
const $2ebefb9401e09ebe$var$CONDITIONAL_EXP = "ConditionalExpression";
var $2ebefb9401e09ebe$var$ternary = {
    name: "ternary",
    init (jsep2) {
        // Ternary expression: test ? consequent : alternate
        jsep2.hooks.add("after-expression", function gobbleTernary(env) {
            if (env.node && this.code === jsep2.QUMARK_CODE) {
                this.index++;
                const test = env.node;
                const consequent = this.gobbleExpression();
                if (!consequent) this.throwError("Expected expression");
                this.gobbleSpaces();
                if (this.code === jsep2.COLON_CODE) {
                    this.index++;
                    const alternate = this.gobbleExpression();
                    if (!alternate) this.throwError("Expected expression");
                    env.node = {
                        type: $2ebefb9401e09ebe$var$CONDITIONAL_EXP,
                        test: test,
                        consequent: consequent,
                        alternate: alternate
                    };
                    // check for operators of higher priority than ternary (i.e. assignment)
                    // jsep sets || at 1, and assignment at 0.9, and conditional should be between them
                    if (test.operator && jsep2.binary_ops[test.operator] <= 0.9) {
                        let newTest = test;
                        while(newTest.right.operator && jsep2.binary_ops[newTest.right.operator] <= 0.9)newTest = newTest.right;
                        env.node.test = newTest.right;
                        newTest.right = env.node;
                        env.node = test;
                    }
                } else this.throwError("Expected :");
            }
        });
    }
};
// Add default plugins:
$2ebefb9401e09ebe$export$2e2bcd8739ae039.plugins.register($2ebefb9401e09ebe$var$ternary);


function $f8c9f20f6892bec9$var$addSelectAction(template, obj) {
    if (typeof obj === "string") template.actions.push({
        select: [
            {
                query: $f8c9f20f6892bec9$var$parseMultiQuery(obj)
            }
        ]
    });
    else if (obj instanceof Array) template.actions.push({
        select: obj.map((select)=>$f8c9f20f6892bec9$var$convertSelect(select))
    });
    else if (typeof obj === "object" && obj !== null) template.actions.push({
        select: [
            $f8c9f20f6892bec9$var$convertSelect(obj)
        ]
    });
    else throw new (0, $6c5f5cfc3fa4523a$export$915e9e7bd4f0f96d)("Invalid select action");
}
function $f8c9f20f6892bec9$var$convertActions(actions) {
    if (actions instanceof Array) return actions.map((action)=>{
        if (action.select) return $f8c9f20f6892bec9$var$convertSelectAction(action.select);
        else if (action.click) return $f8c9f20f6892bec9$var$convertClickAction(action.click);
        else if (action.transform) return $f8c9f20f6892bec9$var$convertTransformAction(action.transform);
        else if (action.waitfor) return $f8c9f20f6892bec9$var$convertWaitForAction(action.waitfor);
        else if (action.each) return $f8c9f20f6892bec9$var$convertEachAction(action.each);
        else if (action.repeat) return $f8c9f20f6892bec9$var$convertRepeatAction(action.repeat);
        else return action;
    }).filter((action)=>action !== undefined);
    else return [];
}
function $f8c9f20f6892bec9$var$convertClick(obj) {
    if (typeof obj === "string") {
        const query = $f8c9f20f6892bec9$var$parseMultiQuery(obj);
        return query ? {
            query: query
        } : undefined;
    } else if (typeof obj === "object" && obj !== null) {
        const { query: query , ...click } = obj;
        click.query = $f8c9f20f6892bec9$var$parseMultiQuery(query);
        return click;
    }
}
function $f8c9f20f6892bec9$var$convertClickAction(obj) {
    const click = $f8c9f20f6892bec9$var$convertClick(obj);
    if (click) return {
        click: click
    };
}
function $f8c9f20f6892bec9$var$convertEachAction(obj) {
    const { query: query , actions: actions , ...each } = obj;
    each.query = $f8c9f20f6892bec9$var$parseMultiQuery(query);
    each.actions = $f8c9f20f6892bec9$var$convertActions(actions);
    return {
        each: each
    };
}
function $f8c9f20f6892bec9$var$convertRepeatAction(obj) {
    const { actions: actions , ...repeat } = obj;
    repeat.actions = $f8c9f20f6892bec9$var$convertActions(actions);
    return {
        repeat: repeat
    };
}
function $f8c9f20f6892bec9$var$convertSelect(obj1) {
    const { query: query , ...select } = obj1;
    select.query = $f8c9f20f6892bec9$var$parseMultiQuery(query);
    if (select.select instanceof Array) select.select = select.select.map((obj)=>$f8c9f20f6892bec9$var$convertSelect(obj));
    return select;
}
function $f8c9f20f6892bec9$var$convertSelectAction(obj2) {
    const select1 = obj2.map((obj3)=>{
        const { query: query , ...select } = obj3;
        select.query = $f8c9f20f6892bec9$var$parseMultiQuery(query);
        if (select.select instanceof Array) select.select = select.select.map((obj)=>$f8c9f20f6892bec9$var$convertSelect(obj));
        return select;
    });
    return {
        select: select1
    };
}
function $f8c9f20f6892bec9$var$convertTransform(obj) {
    const { query: query , ...transform } = obj;
    transform.query = $f8c9f20f6892bec9$var$parseSingleQuery(query);
    return transform;
}
function $f8c9f20f6892bec9$var$convertTransformAction(obj4) {
    const transform = obj4.map((obj)=>$f8c9f20f6892bec9$var$convertTransform(obj));
    return {
        transform: transform
    };
}
function $f8c9f20f6892bec9$var$convertWaitForAction(obj) {
    if (typeof obj === "string") return {
        waitfor: {
            query: $f8c9f20f6892bec9$var$parseMultiQuery(obj)
        }
    };
    else {
        const { query: query , ...waitfor } = obj;
        waitfor.query = $f8c9f20f6892bec9$var$parseMultiQuery(query);
        return {
            waitfor: waitfor
        };
    }
}
function $f8c9f20f6892bec9$var$parseMultiQuery(obj) {
    if (typeof obj === "string") {
        if (obj.startsWith("$(")) {
            const query = $f8c9f20f6892bec9$export$dd48e276a5eff34c(obj);
            return query ? [
                query
            ] : undefined;
        } else return [
            [
                obj
            ]
        ];
    }
}
function $f8c9f20f6892bec9$var$parseSingleQuery(obj) {
    if (typeof obj === "string") {
        if (obj.startsWith("$(")) return $f8c9f20f6892bec9$export$dd48e276a5eff34c(obj);
        else return [
            obj
        ];
    }
}
function $f8c9f20f6892bec9$export$dd48e276a5eff34c(text) {
    const result = [];
    let expression = (0, $2ebefb9401e09ebe$export$2e2bcd8739ae039)(text);
    while(expression){
        if (expression.type === "CallExpression") {
            const callExpression = expression;
            if (callExpression.callee.type === "Identifier" && callExpression.callee.name === "$" && callExpression.arguments.length > 0) {
                result.unshift(callExpression.arguments[0].value);
                expression = undefined;
            } else if (callExpression.callee.type === "MemberExpression") {
                const memberExpression = callExpression.callee;
                result.unshift([
                    memberExpression.property.name,
                    ...callExpression.arguments.map((obj)=>obj.value)
                ]);
                expression = memberExpression.object;
            } else return undefined;
        } else return undefined;
    }
    return result.length > 0 ? result : undefined;
}
function $f8c9f20f6892bec9$export$fda399eb1db879ef(obj) {
    const { select: select , actions: actions , ...props } = obj;
    const template = {
        ...props,
        actions: $f8c9f20f6892bec9$var$convertActions(actions)
    };
    if (select) $f8c9f20f6892bec9$var$addSelectAction(template, select);
    return template;
} //# sourceMappingURL=yaml.js.map


const $c69f9b8c799101a6$var$storageUrl = "https://storage.googleapis.com/syphonx/";
async function $c69f9b8c799101a6$export$f7cfcaf0a9623f58(file) {
    if (typeof file !== "string" || !file.startsWith("$")) throw new (0, $6c5f5cfc3fa4523a$export$915e9e7bd4f0f96d)("Invalid file path specified");
    const url = (0, $6c5f5cfc3fa4523a$export$be84b78d16b1be5e)($c69f9b8c799101a6$var$storageUrl, file.slice(1));
    const response = await fetch(url);
    const text = await response.text();
    const template = $c69f9b8c799101a6$export$2e2dbd43b49fd373(text);
    return template;
}
async function $c69f9b8c799101a6$export$89e9000316b0fc38(file) {
    if (typeof file !== "string" || !file.startsWith("$")) throw new (0, $6c5f5cfc3fa4523a$export$915e9e7bd4f0f96d)("Invalid file path specified");
    const url = (0, $6c5f5cfc3fa4523a$export$be84b78d16b1be5e)($c69f9b8c799101a6$var$storageUrl, file.slice(1));
    const response = await fetch(url);
    const text = await response.text();
    return text;
}
function $c69f9b8c799101a6$export$2e2dbd43b49fd373(text) {
    if (typeof text !== "string") throw new (0, $6c5f5cfc3fa4523a$export$915e9e7bd4f0f96d)("Failed to parse template");
    if (text.trim().startsWith("{") && text.trim().endsWith("}")) {
        const obj = (0, (/*@__PURE__*/$parcel$interopDefault($72f8eca84efc7805$exports))).parse(text);
        return obj;
    } else {
        const obj = $cfcf25c51c3b1777$export$11e63f7b0f3d9900(text);
        const template = (0, $f8c9f20f6892bec9$export$fda399eb1db879ef)(obj);
        return template;
    }
} //# sourceMappingURL=template.js.map





function $46d53147699ca8a7$export$f2909722c7f0f932(selectors) {
    document.querySelectorAll(".sx-hover, .sx-select").forEach((element)=>element.classList.remove("sx-hover", "sx-select"));
    const result = [];
    for (const selector of selectors)document.querySelectorAll(selector).forEach((element)=>{
        element.classList.add("sx-select");
        result.push(element.textContent);
    });
    return result;
}


function $b2515d1c013cc4bc$export$e684be5f4b22cc14() {
    sx.tracking = false;
    document.querySelectorAll(".sx-hover").forEach((element)=>{
        element.classList.remove("sx-hover");
        if (element.classList.length === 0) element.removeAttribute("class");
    });
    document.querySelectorAll(".sx-select").forEach((element)=>{
        element.classList.remove("sx-select");
        if (element.classList.length === 0) element.removeAttribute("class");
    });
    document.querySelectorAll(".sx-click").forEach((element)=>{
        element.classList.remove("sx-click");
        if (element.classList.length === 0) element.removeAttribute("class");
    });
}
function $b2515d1c013cc4bc$export$1f8ffc6fd33b1d16() {
    sx.tracking = true;
    window.addEventListener("beforeunload", (event)=>{
        if (sx.tracking) {
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
        document.querySelectorAll(".sx-select").forEach((element)=>{
            element.classList.remove("sx-select");
            if (element.classList.length === 0) element.removeAttribute("class");
        });
        if (sx.tracking) {
            if (event.target instanceof HTMLElement) event.target.classList.add("sx-hover");
        }
    });
    document.addEventListener("click", onClick);
    //document.querySelectorAll("a").forEach(element => element.addEventListener("click", onClick));
    function onClick(event) {
        document.querySelectorAll(".sx-click").forEach((element)=>{
            element.classList.remove("sx-click");
            if (element.classList.length === 0) element.removeAttribute("class");
        });
        document.querySelectorAll(".sx-hover").forEach((element)=>{
            element.classList.remove("sx-hover");
            if (element.classList.length === 0) element.removeAttribute("class");
        });
        document.querySelectorAll(".sx-select").forEach((element)=>{
            element.classList.remove("sx-select");
            if (element.classList.length === 0) element.removeAttribute("class");
        });
        if (sx.tracking) {
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
        return words.length > 0 && words.every((word)=>sx.dictionary.has(word));
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
    "applyTemplate": $818fa7ea367b0594$export$f9380c9a627682d3,
    "disableTracking": $b2515d1c013cc4bc$export$e684be5f4b22cc14,
    "enableTracking": $b2515d1c013cc4bc$export$1f8ffc6fd33b1d16,
    "queryTracking": $b2515d1c013cc4bc$export$225ea495d1fa0d5,
    "selectElements": $46d53147699ca8a7$export$f2909722c7f0f932
};
const $07c03eb40a016611$var$blockedTabIds = new Set();
function $07c03eb40a016611$var$onDevToolsMessage(message, port) {
    if (message.log) {
        console.log("DEVTOOLS", message.log);
        return false;
    } else if (message.key === "load" && typeof message.tabId === "number") {
        (async ()=>{
            try {
                const url = await $07c03eb40a016611$var$getTabUrl(message.tabId);
                console.log("DEVTOOLS", {
                    message: message
                }, url);
            //await executeScriptFile(tabId, "jquery.slim.js");
            //console.log(`DEVTOOLS injected jquery`);
            //await chrome.scripting.insertCSS({ target: { tabId }, files: ["sx.css"] });
            //console.log(`DEVTOOLS injected css`);
            } catch (error) {
                console.error("DEVTOOLS", {
                    message: message,
                    error: error
                });
            }
        })();
        return true; // response will be sent asynchronously
    } else {
        console.warn("DEVTOOLS UNKNOWN MESSAGE", {
            message: message
        });
        return false;
    }
}
function $07c03eb40a016611$var$executeScript(tabId, func, ...args) {
    return new Promise((resolve, reject)=>chrome.scripting.executeScript({
            target: {
                tabId: tabId
            },
            func: func,
            args: args
        }, (results)=>results.length > 0 ? resolve(results[0].result) : reject({
                message: `Failed to execute script`
            })));
}
function $07c03eb40a016611$var$executeScriptFile(tabId, file) {
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
async function $07c03eb40a016611$var$getTabUrl(tabId) {
    if (tabId) {
        const tab = await chrome.tabs.get(tabId);
        return tab?.url;
    }
}
async function $07c03eb40a016611$var$injectAll(tabId) {
    const injected = await $07c03eb40a016611$var$executeScript(tabId, ()=>typeof window.sx === "object");
    if (!injected) {
        await $07c03eb40a016611$var$executeScriptFile(tabId, "jquery.slim.js");
        await $07c03eb40a016611$var$executeScriptFile(tabId, "sx.js");
        await chrome.scripting.insertCSS({
            target: {
                tabId: tabId
            },
            files: [
                "sx.css"
            ]
        });
        console.log(`BACKGROUND injected sx, jquery tabId=${tabId}`);
    }
}
/*
chrome.webRequest.onBeforeRequest.addListener(request => {
    if (blockedTabIds.has(request.tabId)) {
        console.log("REQUEST BLOCKED", request);
        return { cancel: true };
    }    
}, { urls: ["<all_urls>"]});
*/ chrome.runtime.onConnect.addListener((port)=>{
    port.onMessage.addListener($07c03eb40a016611$var$onDevToolsMessage);
    port.onDisconnect.addListener(()=>port.onMessage.removeListener($07c03eb40a016611$var$onDevToolsMessage));
});
chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    if (message.log) {
        console.log("MESSAGE", message.log);
        return false;
    }
    if (!Object.keys($07c03eb40a016611$var$scriptMap).includes(message.key)) {
        console.warn("MESSAGE", {
            message: message,
            sender: sender,
            error: `Property "key" is invalid: "${message.key}"`
        });
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
    if (message.key === "enableTracking") $07c03eb40a016611$var$blockedTabIds.add(message.tabId);
    if (message.key === "disableTracking") $07c03eb40a016611$var$blockedTabIds.delete(message.tabId);
    (async ()=>{
        try {
            await $07c03eb40a016611$var$injectAll(message.tabId);
            const result = await $07c03eb40a016611$var$executeScript(message.tabId, $07c03eb40a016611$var$scriptMap[message.key], ...message.params);
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
/*
    executeScript(message.tabId, scriptMap[message.key] as () => void, ...message.params)
        .then(result => {
            console.log("MESSAGE", message.key, { message, sender, result });
            sendResponse({ result });
        })
        .catch(error => {
            console.warn("MESSAGE", message.key, { message, sender, error });
            sendResponse({ error });
        });

    return true;
    */ });

})();
//# sourceMappingURL=background.js.map

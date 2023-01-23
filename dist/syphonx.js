(function () {

async function extract(state) {
    function collapseWhitespace(text, newlines = true) {
        if (typeof text === "string" && text.trim().length === 0) {
            return null;
        }
        else if (typeof text === "string" && newlines) {
            return text
                .replace(/\s*\n\s*/gm, "\n")
                .replace(/\n{2,}/gm, "\n")
                .replace(/\s{2,}/gm, " ")
                .trim();
        }
        else if (typeof text === "string" && !newlines) {
            return text
                .replace(/\n/gm, " ")
                .replace(/\s{2,}/gm, " ")
                .trim();
        }
        else {
            return text;
        }
    }
    function coerceValue(value, type) {
        if (type === "string") {
            return typeof value === "string" ? value : typeof value === "number" || typeof value === "boolean" ? value.toString() : null;
        }
        else if (type === "number") {
            return typeof value === "number" ? value : typeof value === "string" ? parseNumber(value) : null;
        }
        else if (type === "boolean") {
            return typeof value === "boolean" ? value : typeof value === "string" ? value.trim().length > 0 : typeof value === "number" && !isNaN(value) ? value !== 0 : null;
        }
        else {
            return null;
        }
    }
    function combineUrl(url, path) {
        if (url && path) {
            return `${rtrim(url, "/")}/${ltrim(path, "/")}`;
        }
        else if (url) {
            return url;
        }
        else if (path) {
            return path;
        }
        else {
            return "";
        }
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
            const a = text
                .split(splitter, limit)
                .map(value => value.trim())
                .filter(value => value.length > 0);
            const i = n >= 0 ? n : a.length + n;
            return i >= 0 && i < a.length ? a[i] : null;
        }
        else {
            return null;
        }
    }
    function evaluateFormula(expression, args = {}) {
        const keys = Object.keys(args);
        const values = keys.map(key => args[key]);
        const fn = new Function(...keys, `return ${expression}`);
        const result = fn(...values);
        return result;
    }
    function formatHTML(value) {
        if (typeof value === "string") {
            return value
                .replace(/(<[a-z0-9:._-]+>)[ ]*/gi, "$1")
                .replace(/[ ]*<\//g, "</");
        }
        else if (value instanceof Array && value.every(obj => typeof obj === "string")) {
            return value.map(obj => formatHTML(obj));
        }
        else {
            return value;
        }
    }
    function formatStringValue(value, format, origin) {
        if (format === "href" && typeof value === "string" && origin && !isAbsoluteUrl(value)) {
            return combineUrl(origin, value);
        }
        else if (format === "multiline") {
            return collapseWhitespace(value, true);
        }
        else if (format === "singleline") {
            return collapseWhitespace(value, false);
        }
        else if (format === "none") {
            return value;
        }
        else {
            return value;
        }
    }
    function isAbsoluteUrl(url) {
        return url.startsWith("http://") || url.startsWith("https://");
    }
    function isEmpty(obj) {
        if (obj === undefined || obj === null) {
            return true;
        }
        else if (obj instanceof Array) {
            return obj.length === 0;
        }
        else if (typeof obj === "string") {
            return obj.length === 0;
        }
        else {
            return false;
        }
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
        if (source instanceof Array && target instanceof Array) {
            return [...source, ...target];
        }
        else if (isObject(source) && isObject(target)) {
            const obj = {};
            const keys = Array.from(new Set([...Object.keys(source), ...Object.keys(target)]));
            for (const key of keys) {
                obj[key] = merge(source[key], target[key]);
            }
            return obj;
        }
        else if (target) {
            return target;
        }
        else {
            return source;
        }
    }
    function parseNumber(value) {
        if (typeof value === "number") {
            return !isNaN(value) ? value : undefined;
        }
        if (typeof value === "string") {
            let [, text] = /([0-9.,]+)/.exec(value) || [];
            if (/\.\d+$/.test(text))
                text = text.replace(/,/g, "");
            if (/,\d+$/.test(text))
                text = text.replace(/\./g, "");
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
            if (!regexp) {
                return null;
            }
        }
        const match = regexp.exec(text);
        const result = match ? match[1] : null;
        if (trim && result) {
            return result.trim();
        }
        else {
            return result;
        }
    }
    function regexpReplace(text, regexp, replace) {
        if (typeof text === "string") {
            return text.replace(regexp, replace);
        }
        else {
            return text;
        }
    }
    function regexpTest(text, pattern) {
        const negate = pattern.startsWith("!");
        if (negate) {
            pattern = pattern.slice(1);
        }
        const regexp = createRegExp(pattern);
        if (!regexp) {
            return null;
        }
        let result = regexp?.test(text);
        if (result === undefined) {
            return null;
        }
        else if (negate) {
            return !result;
        }
        else {
            return result;
        }
    }
    function removeDOMRefs(obj) {
        if (obj instanceof Array) {
            return obj.map(item => removeDOMRefs(item));
        }
        else if (isObject(obj) && typeof obj.hasOwnProperty === "function" && obj.hasOwnProperty("value")) {
            return removeDOMRefs(obj.value);
        }
        else if (isObject(obj)) {
            const source = obj;
            const target = {};
            for (const key of Object.keys(obj)) {
                if (isObject(source[key]) && typeof source[key].hasOwnProperty === "function" && source[key].hasOwnProperty("value")) {
                    target[key] = removeDOMRefs(source[key].value);
                }
                else {
                    target[key] = removeDOMRefs(source[key]);
                }
            }
            return target;
        }
        else {
            return obj;
        }
    }
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    function trim(text, pattern = " ") {
        return ltrim(rtrim(text, pattern));
    }
    function ltrim(text, pattern = " ") {
        if (typeof text === "string") {
            if (typeof pattern === "string") {
                while (text.startsWith(pattern)) {
                    text = text.slice(pattern.length);
                }
            }
            else {
                const hits = pattern.exec(text) || [];
                let hit = hits.find(hit => text.startsWith(hit));
                while (hit) {
                    text = text.slice(hit.length);
                    hit = hits.find(hit => text.startsWith(hit));
                }
            }
        }
        return text;
    }
    function rtrim(text, pattern = " ") {
        if (typeof text === "string") {
            if (typeof pattern === "string") {
                while (text.endsWith(pattern)) {
                    text = text.slice(0, -1 * pattern.length);
                }
            }
            else {
                const hits = pattern.exec(text) || [];
                let hit = hits.find(hit => text.endsWith(hit));
                while (hit) {
                    text = text.slice(0, -1 * hit.length);
                    hit = hits.find(hit => text.endsWith(hit));
                }
            }
        }
        return text;
    }
    function trunc(obj, max = 80) {
        if (obj) {
            const text = JSON.stringify(obj);
            if (typeof text === "string")
                return text.length <= max ? text : `${text[0]}${text.slice(1, max)}…${text[text.length - 1]}`;
        }
        return "(empty)";
    }
    function typeName(obj) {
        if (obj === null)
            return "null";
        else if (obj === undefined)
            return "undefined";
        else if (typeof obj === "string")
            return "string";
        else if (typeof obj === "number")
            return "number";
        else if (obj instanceof Array)
            return obj.length > 0 ? `Array<${Array.from(new Set(obj.map(value => typeName(value)))).join("|")}>` : "[]";
        else if (obj instanceof Date)
            return "date";
        else if (typeof obj === "object")
            return "object";
        else
            return "unknown";
    }
    function $merge(source, target) {
        for (const targetAttr of target[0].attributes) {
            const sourceAttr = Array.from(source[0].attributes).find(attr => attr.name === targetAttr.name);
            if (sourceAttr && targetAttr.name === "class") {
                const value = Array.from(new Set([
                    ...sourceAttr.value.split(" "),
                    ...targetAttr.value.split(" ")
                ])).join(" ");
                source.attr("class", value);
            }
            else if (!sourceAttr) {
                source.attr(targetAttr.name, targetAttr.value);
            }
        }
    }
    function $scrollToBottom(delay = 100, max = 100) {
        let n = 0;
        return new Promise(resolve => {
            const timer = setInterval(() => {
                window.scrollBy(0, window.innerHeight);
                n += 1;
                if ((window.scrollY >= document.body.scrollHeight - window.innerHeight) || (--max < 1)) {
                    clearInterval(timer);
                    resolve(n);
                }
            }, delay);
        });
    }
    function $statement(query) {
        const valid = query instanceof Array && query.length > 0 && typeof query[0] === "string" && query.slice(1).every(op => op instanceof Array);
        if (!valid) {
            return `INVALID: ${JSON.stringify(query)}`;
        }
        const selector = query[0];
        const ops = query.slice(1);
        return [`$("${selector}")`, ...ops.map(op => `${op[0]}(${op.slice(1).map(param => JSON.stringify(param)).join(", ")})`)].join(".");
    }
    function $statements(query) {
        if (query && query.length > 0)
            return `${$statement(query[0])}${query.length > 1 ? ` (+${query.length - 1} more))` : ""}`;
        else
            return "(none)";
    }
    class ExtractContext {
        constructor(state) {
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
            if (this.online) {
                state.url = window.location.href;
            }
            const { domain, origin } = parseUrl(state.url);
            state.domain = domain || "";
            state.origin = origin || "";
            this.state = state;
        }
        appendError(code, message, level, stack) {
            const key = this.contextKey();
            this.state.errors.push({ code, message, key, level, stack });
            const text = `ERROR ${key ? `${key}: ` : ""}${message} code=${code} level=${level}${stack ? `\n${stack}` : ""}`;
            this.log(text);
        }
        break({ query, on = "any", pattern, when, active = true }) {
            if (this.online && active) {
                if (this.when(when, "BREAK")) {
                    if (query) {
                        this.log(`BREAK WAITFOR QUERY ${trunc($)} on=${on}, pattern=${pattern}`);
                        const result = this.queryCheck(query, on, pattern);
                        if (result === null) {
                            this.log(`BREAK ${when}`);
                            return true;
                        }
                    }
                    else {
                        this.log(`BREAK ${when}`);
                        return true;
                    }
                }
                else {
                    this.log(`BREAK SKIPPED ${when}`);
                }
            }
            else {
                this.log(`BREAK BYPASSED ${when}`);
            }
            return false;
        }
        async click({ query, waitfor, snooze, required, retry, active, when }) {
            if (this.online && (active ?? true)) {
                if (this.when(when, "CLICK")) {
                    const mode = snooze ? snooze[2] || "before" : undefined;
                    if (snooze && (mode === "before" || mode === "before-and-after")) {
                        const seconds = snooze[0];
                        this.log(`CLICK SNOOZE BEFORE (${seconds}s) ${$statements(query)}`);
                        await sleep(seconds * 1000);
                    }
                    const result = this.query({ query });
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
                                }
                                else if (code === "timeout") {
                                    this.appendError("click-timeout", `Timeout waiting for click result. ${trunc(waitfor.query)}${waitfor.pattern ? `, pattern=${waitfor.pattern}` : ""}`, 1);
                                    return "timeout";
                                }
                                else if (code === "invalid") {
                                }
                            }
                        }
                    }
                    else {
                        if (required) {
                            this.appendError("click-required", `Required click target not found. ${trunc(query)}`, 1);
                        }
                        return "not-found";
                    }
                }
                else {
                    this.log(`CLICK SKIPPED ${$statements(query)}`);
                }
            }
            else {
                this.log(`CLICK BYPASSED ${$statements(query)}`);
            }
            return null;
        }
        clickElement(element, context) {
            if (element instanceof HTMLElement) {
                if (element instanceof HTMLOptionElement && element.parentElement instanceof HTMLSelectElement) {
                    this.log(`CLICK ${context} <select> "${element.parentElement.value}" -> "${element.value}"`);
                    element.parentElement.value = element.value;
                    element.parentElement.dispatchEvent(new Event("change", { bubbles: true, cancelable: false }));
                    element.parentElement.dispatchEvent(new Event("input", { bubbles: true, cancelable: false }));
                }
                else {
                    this.log(`CLICK ${context}`);
                    element.click();
                }
                return true;
            }
            else {
                this.log(`CLICK ${context} not insanceof HTMLElement`);
                return false;
            }
        }
        context() {
            const stack = this.state.vars.__context;
            let j = stack.length - 1;
            const context = { ...stack[j] };
            let subcontext = context;
            while (--j >= 0) {
                subcontext.parent = { ...stack[j] };
                subcontext = subcontext.parent;
            }
            return context;
        }
        contextKey() {
            const stack = this.state.vars.__context;
            let key = "";
            for (const { name, index } of stack) {
                if (name) {
                    if (key) {
                        key += ".";
                    }
                    key += name;
                    if (index !== undefined) {
                        key += `[${index}]`;
                    }
                }
            }
            return key;
        }
        contextKeyInfo() {
            const key = this.contextKey();
            const stack = this.state.vars.__context;
            let info = "";
            if (stack.length > 0) {
                const [top] = stack.slice(-1);
                if (top.pivot !== undefined) {
                    info = `PIVOT(${top.pivot})`;
                }
                else if (top.union !== undefined) {
                    info = `UNION(${top.union})`;
                }
                else if (top.action !== undefined) {
                    info = `${top.action.toUpperCase()}`;
                }
            }
            return info ? `${key} ${info}` : key;
        }
        async dispatch(action, step) {
            if (action.hasOwnProperty("select")) {
                const data = this.select(action.select);
                this.state.data = merge(this.state.data, data);
            }
            else if (action.hasOwnProperty("break")) {
                if (this.break(action.break)) {
                    return "break";
                }
            }
            else if (action.hasOwnProperty("click")) {
                const required = action.click.required;
                const code = await this.click(action.click);
                if (code === "timeout" && required) {
                    return "timeout";
                }
                else if (code === "not-found" && required) {
                    return "required";
                }
            }
            else if (action.hasOwnProperty("each")) {
                await this.each(action.each);
            }
            else if (action.hasOwnProperty("error")) {
                this.error(action.error);
            }
            else if (action.hasOwnProperty("repeat")) {
                await this.repeat(action.repeat);
            }
            else if (action.hasOwnProperty("snooze")) {
                await this.snooze(action.snooze);
            }
            else if (action.hasOwnProperty("transform")) {
                await this.transform(action.transform);
            }
            else if (action.hasOwnProperty("waitfor")) {
                const required = action.waitfor.required;
                const code = await this.waitfor(action.waitfor);
                if (code === "timeout" && required) {
                    return "timeout";
                }
            }
            else if (action.hasOwnProperty("yield")) {
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
        async each({ query, actions, context, active, when }) {
            const $ = this.jquery;
            if (active ?? true) {
                if (this.when(when, "CLICK")) {
                    const result = this.query({ query, repeated: true });
                    if (result && result.nodes.length > 0) {
                        const elements = result.nodes.toArray();
                        for (const element of elements) {
                            const nodes = $(element);
                            this.pushContext({
                                nodes,
                                value: this.text(nodes),
                                action: "each",
                                index: elements.indexOf(element)
                            }, context);
                            const code = await this.run(actions);
                            this.popContext();
                            if (code === "break") {
                                break;
                            }
                        }
                    }
                }
            }
        }
        eachNode({ nodes, value }, callback) {
            const $ = this.jquery;
            if (nodes) {
                const elements = nodes.toArray();
                for (let i = 0; i < elements.length; ++i) {
                    const node = $(elements[i]);
                    const subvalue = value instanceof Array ? value[i] : value;
                    callback(node, subvalue);
                }
            }
        }
        error({ query, code = "custom-error", message = "Custom template error", level = 1, stop, active = true, when }) {
            if (active) {
                if (query) {
                    const result = this.query({ query, type: "boolean", repeated: false });
                    if (result?.value === false) {
                        this.appendError(code, String(this.evaluate(message)), level);
                        if (stop === true || (stop === undefined && level === 0)) {
                            throw "STOP";
                        }
                    }
                }
                else if (this.when(when, "ERROR")) {
                    this.appendError(code, String(this.evaluate(message)), level);
                    if (stop === true || (stop === undefined && level === 0)) {
                        throw "STOP";
                    }
                }
            }
        }
        evaluate(input, params = {}) {
            if (isFormula(input)) {
                const { data, ...extra } = params;
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
                }
                catch (err) {
                    this.appendError("eval-error", `Error evaluating formula "${input}": ${err instanceof Error ? err.message : JSON.stringify(err)}`, 0);
                }
            }
            else if (isRegexp(input)) {
                const result = regexpExtract(params.value, input);
                return result;
            }
            else {
                return input;
            }
        }
        evaluateBoolean(input, params = {}) {
            if (isRegexp(input)) {
                const result = regexpTest(params.value, input);
                return result;
            }
            else {
                const result = this.evaluate(input, params);
                return typeof result === "boolean" ? result : null;
            }
        }
        formatResult(result, type, all, limit, format = "multiline", pattern) {
            const $ = this.jquery;
            const regexp = createRegExp(pattern);
            if (!type) {
                const defaultType = result.value instanceof Array ? typeof result.value[0] : typeof result.value;
                type = ["string", "number", "boolean"].includes(defaultType) ? defaultType : "string";
            }
            if (limit !== undefined && limit !== null && result.value instanceof Array) {
                result.nodes = $(result.nodes.toArray().slice(0, limit));
                result.value = result.value.slice(0, limit);
            }
            if (type === "string" && result.value instanceof Array) {
                if (!result.formatted) {
                    result.value = result.value.map(value => formatStringValue(coerceValue(value, "string"), format, this.state.origin));
                }
                if (regexp && !isEmpty(result.value)) {
                    result.valid = result.value.every(value => regexp.test(value));
                }
            }
            else if (type === "string") {
                if (!result.formatted) {
                    result.value = formatStringValue(coerceValue(result.value, "string"), format, this.state.origin);
                }
                if (regexp && !isEmpty(result.value)) {
                    result.valid = regexp.test(result.value);
                }
            }
            else if (type === "boolean" && result.value instanceof Array && result.value.length === 0) {
                result.value = false;
            }
            else if (type === "boolean" && result.value instanceof Array && all) {
                result.value = result.value.every(value => coerceValue(value, "boolean") === true);
            }
            else if (type === "boolean" && result.value instanceof Array && !all) {
                result.value = result.value.some(value => coerceValue(value, "boolean") === true);
            }
            else if (type === "boolean") {
                result.value = coerceValue(result.value, "boolean");
            }
            else if (type === "number" && result.value instanceof Array) {
                result.value = result.value.map(value => coerceValue(value, "number"));
            }
            else if (type === "number") {
                result.value = coerceValue(result.value, "number");
            }
            return result;
        }
        log(text) {
            if (this.state.debug) {
                if (this.lastLogLine === text) {
                    const elapsed = (new Date().valueOf() - this.lastLogTimestamp) / 1000;
                    this.state.log = `${this.state.log.slice(0, this.lastLogLength)}${text} (${elapsed.toFixed(1)}s)\n`;
                }
                else {
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
                const nodes = source.nodes && target.nodes ? $([...source.nodes.toArray(), ...target.nodes.toArray()]) : target.nodes || source.nodes;
                let value = undefined;
                if (source.value instanceof Array && target.value instanceof Array) {
                    value = [...source.value, ...target.value];
                }
                else if (source.value instanceof Array && !isNullOrUndefined(target.value)) {
                    value = [...source.value, target.value];
                }
                else if (target.value instanceof Array && !isNullOrUndefined(source.value)) {
                    value = [source.value, ...target.value];
                }
                else if (!isNullOrUndefined(source.value) && !isNullOrUndefined(target.value)) {
                    value = [source.value, target.value];
                }
                else {
                    value = target.value ?? source.value;
                }
                return { nodes, key: this.contextKey(), value, valid: target.valid ?? source.valid };
            }
            else if (target) {
                return target;
            }
            else {
                return source;
            }
        }
        nodeKey(node) {
            const $ = this.jquery;
            const path = [];
            const elements = $(node && node.length > 1 ? node[0] : node).parents().addBack().not("html").toArray().reverse();
            for (const element of elements) {
                const $parent = $(element).parent();
                const tag = element.tagName.toLowerCase();
                const id = $(element).attr('id');
                const className = $(element).attr('class')?.split(' ')[0];
                const n = $(element).index() + 1;
                const uniqueId = $(`#${id}`).length === 1;
                const uniqueClassName = className ? $(`${tag}.${className}`).length === 1 : false;
                const onlyTag = $parent.children(tag).length === 1;
                const onlyClassName = className ? $parent.children(`${tag}.${className}`).length === 1 : false;
                if (uniqueId) {
                    path.push(`#${id}`);
                    break;
                }
                else if (uniqueClassName) {
                    path.push(`${tag}.${className}`);
                    break;
                }
                else if (onlyTag) {
                    path.push(tag);
                }
                else if (onlyClassName) {
                    path.push(`${tag}.${className}`);
                }
                else {
                    path.push(`${tag}:nth-child(${n})`);
                }
            }
            return path.reverse().join(" > ");
        }
        nodeKeys(nodes) {
            if (typeof nodes === "object" && typeof nodes.toArray === "function") {
                return nodes.toArray().map(node => this.nodeKey(node));
            }
            else {
                return [];
            }
        }
        pokeContext(context) {
            const stack = this.state.vars.__context;
            const i = stack.length - 1;
            if (i >= 0) {
                stack[i] = { ...stack[i], ...context };
            }
            if (context.nodes) {
                this.log(`--> ${this.contextKeyInfo()} [${this.nodeKey(stack[stack.length - 1].nodes)}] ${trunc(stack[stack.length - 1].value)}`);
            }
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
            }
            else if (inherit === null) {
                stack.push({ ...context, nodes: undefined });
            }
            else if (inherit > 0 && inherit <= stack.length) {
                const [parent] = stack.slice(-1 * inherit);
                stack.push({
                    ...context,
                    nodes: parent?.nodes,
                    value: parent?.value
                });
            }
            else {
                stack.push(context);
                this.appendError("eval-error", `Undefined context #${inherit}`, 1);
            }
            this.log(`>>> ${this.contextKeyInfo()} [${this.nodeKey(stack[stack.length - 1].nodes)}] ${trunc(stack[stack.length - 1].value)} ${stack.length}`);
        }
        query({ query, type, repeated = false, all = false, format, pattern, limit, hits }) {
            if (query instanceof Array && query.every(stage => stage instanceof Array) && query[0].length > 0 && !!query[0][0]) {
                if (limit === undefined && type === "string" && !repeated && !all) {
                    limit = 1;
                }
                if (hits === null || hits === undefined) {
                    hits = query.length;
                }
                let hit = 0;
                let result = undefined;
                for (const stage of query) {
                    const subresult = this.resolveQuery({ query: stage, type, repeated, all, limit, format, pattern, result });
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
                    else {
                    }
                }
                if (result) {
                    if (repeated && !(result.value instanceof Array)) {
                        result.value = [result.value];
                    }
                    else if (!repeated && result.value instanceof Array && result.value.every(value => typeof value === "string")) {
                        result.value = result.value.length > 0 ? result.value.join(format === "singleline" ? " " : "\n") : null;
                    }
                    else if (!repeated && result.value instanceof Array) {
                        result.value = result.value[0];
                    }
                    return result;
                }
            }
        }
        queryCheck(query, on, pattern) {
            const type = pattern ? "string" : "boolean";
            const all = on === "all";
            const result = this.query({ query, type, pattern, all, repeated: all });
            let pass = false;
            if (result) {
                if (type === "boolean") {
                    if (on === "any") {
                        pass = result.value === true;
                    }
                    else if (on === "all") {
                        pass = result.value.every(value => value === true);
                    }
                    else if (on === "none") {
                        pass = result.value === false;
                    }
                }
                else if (type === "string") {
                    if (on === "any") {
                        pass = !isEmpty(trim(result.value)) && result.valid !== false;
                    }
                    else if (on === "all") {
                        pass = result.value.every(value => !isEmpty(trim(value))) && result.valid !== false;
                    }
                    else if (on === "none") {
                        pass = !(!isEmpty(trim(result.value)) && result.valid !== false);
                    }
                }
            }
            return [pass, result];
        }
        async repeat({ actions, limit = 100, errors = 1 }) {
            let errorCount = 0;
            let baselineErrorCount = this.state.errors.length;
            let i = 0;
            let code = undefined;
            while (i < limit) {
                this.log(`REPEAT #${++i} (limit=${limit})`);
                this.state.vars._page = i;
                for (const action of actions) {
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
                }
                else {
                    break;
                }
            }
            this.log(`REPEAT ${i} iterations completed (limit=${limit}, errors=${errorCount}/${errors})`);
        }
        resolveOperands(operands, result) {
            for (let i = 0; i < operands.length; ++i) {
                if (isFormula(operands[i]) || isRegexp(operands[i])) {
                    this.eachNode(result, (node, value) => {
                        const resolvedValue = String(this.evaluate(operands[i], { value }));
                        if (resolvedValue !== operands[i]) {
                            operands[i] = resolvedValue;
                        }
                    });
                }
            }
        }
        resolveQuery({ query, type, repeated, all, limit, format, pattern, result }) {
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
            }
            else if (selector === ".." && context?.parent) {
                nodes = $(context.parent.nodes);
                value = context.parent.value;
                this.log(`QUERY $("..", [${this.nodeKey(context.nodes)}]) -> ${trunc(value)} (${nodes.length} nodes)`);
            }
            else if (selector.startsWith("^")) {
                let n = parseInt(selector.slice(1));
                let subcontext = n > 0 ? context : undefined;
                while (subcontext && n-- >= 0) {
                    subcontext = context.parent;
                }
                if (subcontext) {
                    nodes = $(subcontext.nodes);
                    value = subcontext.value;
                    this.log(`QUERY $(${selector}, [${this.nodeKey(context.nodes)}]) -> ${trunc(value)} (${nodes.length} nodes)`);
                }
                else {
                    this.appendError("eval-error", `Invalid context for selector "${selector}"`, 0);
                    return undefined;
                }
            }
            else if (selector === "{window}") {
                nodes = this.online ? $(window) : $();
                value = null;
            }
            else if (selector === "{document}") {
                nodes = this.online ? $(document) : $();
                value = null;
            }
            else {
                try {
                    const _selector = String(this.evaluate(selector));
                    nodes = this.resolveQueryNodes($(_selector, context?.nodes), result?.nodes);
                    value = this.text(nodes, format);
                    if (selector !== _selector) {
                        this.log(`EVALUATE "${selector}" >>> "${_selector}"`);
                    }
                    this.log(`QUERY $("${_selector}", [${this.nodeKey(context.nodes)}]) -> ${trunc(value)} (${nodes.length} nodes)`);
                }
                catch (err) {
                    this.appendError("eval-error", `Failed to resolve selector for "${$statement(query)}": ${err instanceof Error ? err.message : JSON.stringify(err)}`, 0);
                    return undefined;
                }
            }
            if (ops.length > 0 && nodes.length > 0) {
                try {
                    return this.resolveQueryOps({ ops, nodes, type, repeated, all, limit, format, pattern, value });
                }
                catch (err) {
                    this.appendError("eval-error", `Failed to resolve operation for "${$statement(query)}": ${err instanceof Error ? err.message : JSON.stringify(err)}`, 0);
                    return undefined;
                }
            }
            else if (type === "boolean") {
                return {
                    nodes,
                    key: this.contextKey(),
                    value: !repeated ? nodes.length > 0 : [nodes.length > 0]
                };
            }
            else if (nodes.length > 0) {
                return this.formatResult({ nodes, key: this.contextKey(), value }, type, all, limit, format, pattern);
            }
            else {
                return undefined;
            }
        }
        resolveQueryNodes(target, result) {
            const $ = this.jquery;
            if (result) {
                const source = result.toArray();
                const nodes = target.toArray().filter(node => !source.includes(node));
                return $(nodes);
            }
            else {
                return target;
            }
        }
        resolveQueryOps({ ops, nodes, type, repeated, all, limit, format, pattern, value }) {
            const $ = this.jquery;
            const result = { nodes, key: this.contextKey(), value };
            if (!this.validateOperators(ops)) {
                return result;
            }
            const a = ops.slice(0);
            while (a.length > 0) {
                const [operator, ...operands] = a.shift();
                if (operator === "blank") {
                    result.nodes = $(result.nodes.toArray().filter(element => $(element).text().trim().length === 0));
                    result.value = this.text(result.nodes, format);
                }
                else if (operator === "cut") {
                    if (!this.validateOperands(operator, operands, ["string", "number"], ["number"])) {
                        break;
                    }
                    const splitter = operands[0];
                    const n = operands[1];
                    const limit = operands[2];
                    if (typeof result.value === "string") {
                        result.value = cut(result.value, splitter, n, limit);
                    }
                    else if (result.value instanceof Array && result.value.every(value => typeof value === "string")) {
                        result.value = result.value.map(value => cut(value, splitter, n, limit));
                    }
                    else {
                        result.value = null;
                    }
                }
                else if (operator === "extract") {
                    if (!this.validateOperands(operator, operands, ["string"], ["boolean", "boolean"])) {
                        break;
                    }
                    const regexp = createRegExp(operands[0]);
                    const keepUnmatchedItems = operands[1];
                    const trim = operands[2] ?? true;
                    if (!regexp) {
                        this.appendError("invalid-operand", `Invalid regular expression for "extract"`, 0);
                    }
                    else if (result.value instanceof Array && result.value.every(value => typeof value === "string")) {
                        const values = result.value.map(value => regexpExtract(value.trim(), regexp, trim));
                        if (!keepUnmatchedItems) {
                            const elements = result.nodes.toArray();
                            for (let i = result.value.length - 1; i >= 0; --i) {
                                if (values[i] === null) {
                                    elements.splice(i, 1);
                                    values.splice(i, 1);
                                }
                            }
                            result.nodes = $(elements);
                        }
                        result.value = values;
                    }
                    else if (typeof result.value === "string") {
                        result.value = regexpExtract(result.value.trim(), regexp, trim);
                    }
                    else {
                        result.value = null;
                    }
                }
                else if (operator === "filter" && (isFormula(operands[0]) || isRegexp(operands[0]))) {
                    if (!this.validateOperands(operator, operands, ["string"])) {
                        break;
                    }
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
                        for (let i = 0; i < n; ++i) {
                            const hit = this.evaluateBoolean(operands[0], { value: input.values[i], index: i, count: n });
                            if (hit) {
                                output.elements.push(input.elements[i]);
                                output.values.push(input.values[i]);
                            }
                        }
                        result.nodes = $(output.elements);
                        result.value = output.values;
                    }
                    else {
                        const hit = this.evaluateBoolean(operands[0], { value: result.value });
                        if (!hit) {
                            result.nodes = $([]);
                            result.value = null;
                        }
                    }
                }
                else if (operator === "html" && (operands[0] === "outer" || operands[0] === undefined)) {
                    if (this.online) {
                        result.value = result.nodes.toArray().map(element => element.outerHTML.trim());
                    }
                    else {
                        result.value = result.nodes.toArray().map(element => $.html(element).toString().trim());
                    }
                    if (typeof operands[1] === "boolean" ? operands[1] : true) {
                        result.value = formatHTML(result.value);
                        result.formatted = true;
                    }
                }
                else if (operator === "html" && operands[0] === "inner") {
                    result.value = result.nodes.toArray().map(element => $(element).html());
                    if (typeof operands[1] === "boolean" ? operands[1] : true) {
                        result.value = formatHTML(result.value);
                        result.formatted = true;
                    }
                }
                else if (operator === "map") {
                    if (!this.validateOperands(operator, operands, ["string"])) {
                        break;
                    }
                    const input = {
                        elements: result.nodes.toArray(),
                        values: result.value instanceof Array ? result.value : new Array(result.nodes.length).fill(result.value)
                    };
                    const output = {
                        elements: [],
                        values: []
                    };
                    const n = input.elements.length;
                    for (let i = 0; i < n; ++i) {
                        const value = this.evaluate(operands[0], { value: input.values[i], index: i, count: n });
                        if (value !== null && value !== undefined) {
                            output.elements.push(input.elements[i]);
                            output.values.push(value);
                        }
                    }
                    result.nodes = $(output.elements);
                    result.value = output.values;
                }
                else if (operator === "nonblank") {
                    result.nodes = $(result.nodes.toArray().filter(element => $(element).text().trim().length > 0));
                    result.value = this.text(result.nodes, format);
                }
                else if (operator === "replace") {
                    if (!this.validateOperands(operator, operands, ["string", "string"])) {
                        break;
                    }
                    const regexp = createRegExp(operands[0]);
                    if (!regexp) {
                        this.appendError("invalid-operand", `Invalid regular expression for "replace"`, 0);
                    }
                    else if (result.value instanceof Array && result.value.every(value => typeof value === "string")) {
                        result.value = result.value.map(value => regexpReplace(value, regexp, operands[1]));
                    }
                    else if (typeof result.value === "string") {
                        result.value = regexpReplace(result.value, regexp, operands[1]);
                    }
                }
                else if (operator === "replaceHTML") {
                    if (!this.validateOperands(operator, operands, ["string"])) {
                        break;
                    }
                    this.eachNode(result, (node, value) => {
                        const content = String(this.evaluate(operands[0], { value }));
                        node.html(content);
                    });
                    result.value = null;
                }
                else if (operator === "replaceTag") {
                    if (!this.validateOperands(operator, operands, ["string"], ["boolean"])) {
                        break;
                    }
                    const newTag = String(this.evaluate(operands[0], { value: operands[0] }));
                    const keepProps = operands[1] ?? true;
                    this.eachNode(result, node => {
                        const newNode = $(newTag);
                        if (keepProps) {
                            $merge(newNode, node);
                        }
                        node.wrapAll(newNode);
                        node.contents().unwrap();
                    });
                    result.value = null;
                }
                else if (operator === "replaceText") {
                    if (!this.validateOperands(operator, operands, ["string"])) {
                        break;
                    }
                    this.eachNode(result, (node, value) => {
                        const content = String(this.evaluate(operands[0], { value }));
                        node.text(content);
                    });
                    result.value = null;
                }
                else if (operator === "replaceWith") {
                    if (!this.validateOperands(operator, operands, ["string"])) {
                        break;
                    }
                    this.eachNode(result, (node, value) => {
                        const content = String(this.evaluate(operands[0], { value }));
                        node.replaceWith(content);
                    });
                    result.value = null;
                }
                else if (operator === "reverse") {
                    if (!this.validateOperands(operator, operands, [], [])) {
                        break;
                    }
                    result.nodes = $(result.nodes.toArray().reverse());
                    result.value = this.text(result.nodes, format);
                }
                else if (operator === "scrollBottom") {
                    if (this.online) {
                        const y = result.nodes.scrollTop() + result.nodes.height();
                        this.log(`scrollBottom ${result.nodes.scrollTop()} ${result.nodes.height()} ${y}`);
                        window.scrollTo(0, y);
                    }
                }
                else if (operator === "size") {
                    result.value = result.nodes.length;
                }
                else if (operator === "split") {
                    const bypass = operands[0] === undefined && result.value instanceof Array;
                    if (!bypass) {
                        const text = result.value instanceof Array ? result.value.join("\n") : result.value;
                        const separator = operands[0];
                        const limit = typeof operands[1] === "number" ? operands[1] : undefined;
                        const trim = typeof operands[2] === "boolean" ? operands[2] : true;
                        result.value = text.split(separator, limit);
                        if (trim && result.value instanceof Array) {
                            result.value = result.value.map(value => value.trim()).filter(value => value.length > 0);
                        }
                    }
                }
                else if (operator === "text" && operands[0] === "inline") {
                    result.value = result.nodes.toArray().map((element) => Array.from(element.childNodes)
                        .filter(node => node.nodeType === 3)
                        .map(node => node.textContent ?? node.data)
                        .join(" ")
                        .trim()
                        .replace(/[ ]{2,}/, " "));
                    result.formatted = false;
                }
                else if (["appendTo", "each", "prependTo", "insertBefore", "insertAfter", "replaceAll"].includes(operator)) {
                    this.appendError("invalid-operator", `Operator "${operator}" not supported`, 0);
                }
                else if (isInvocableFrom(result.nodes, operator)) {
                    this.resolveOperands(operands, result);
                    const delegate = result.nodes;
                    const obj = delegate[operator](...operands);
                    if (isJQueryObject(obj)) {
                        result.nodes = obj;
                        result.value = this.text(result.nodes, format);
                        result.formatted = false;
                    }
                    else if (repeated) {
                        result.value = result.nodes.toArray().map(element => {
                            const delegate = $(element);
                            const obj = delegate[operator](...operands);
                            return obj;
                        });
                        result.formatted = false;
                    }
                    else {
                        result.value = obj;
                        result.formatted = false;
                    }
                }
                else {
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
            for (const action of actions) {
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
            for (const select of selects) {
                if (select.active ?? true) {
                    this.validateSelect(select);
                    let item = null;
                    if (this.when(select.when)) {
                        if (select.pivot) {
                            item = this.selectResolvePivot(select, item);
                        }
                        else {
                            if (!pivot) {
                                this.pushContext({ name: select.name }, select.context);
                            }
                            if (select.union) {
                                item = this.selectResolveUnion(select, item, data);
                            }
                            else if (select.query) {
                                item = this.selectResolveSelector(select, item);
                            }
                            else if (select.value) {
                                item = this.selectResolveValue(select, data);
                            }
                            if (!pivot) {
                                if (isEmpty(item?.value) && select.required) {
                                    this.appendError("select-required", `Required select '${this.contextKey()}' not found`, 0);
                                }
                                this.popContext();
                            }
                        }
                    }
                    if (select.name?.startsWith("_") && item) {
                        this.state.vars[select.name] = item.value;
                    }
                    else if (select.name) {
                        data[select.name] = item;
                    }
                    else {
                        return item;
                    }
                }
            }
            return data;
        }
        selectResolvePivot(select, item) {
            const $ = this.jquery;
            const { pivot, ...superselect } = select;
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
                    for (const element of elements) {
                        const nodes = $(element);
                        this.pushContext({
                            nodes: $(element),
                            value: this.text(nodes, select.format),
                            pivot: elements.indexOf(element)
                        }, select.context);
                        item = this.selectResolveSelector({ ...superselect, ...pivot }, item, true);
                        this.log(`PIVOT ${this.contextKey()} -> ${typeName(item?.value)}`);
                        this.popContext();
                    }
                    if (isEmpty(item?.value) && select.required) {
                        this.appendError("select-required", `Required select '${this.contextKey()}' not found`, 0);
                    }
                    this.popContext();
                }
                else {
                    this.log(`PIVOT ${this.contextKey()} EMPTY`);
                }
            }
            return item;
        }
        selectResolveSelector(select, item, pivot = false) {
            const $ = this.jquery;
            let subitem = null;
            if (select.type === undefined && select.select) {
                select.type = "object";
            }
            const result = this.query(select);
            if (result) {
                if (select.type !== "object") {
                    subitem = {
                        nodes: this.nodeKeys(result.nodes),
                        key: result.key,
                        value: result.value
                    };
                }
                else if (select.select) {
                    this.pushContext({ action: "subselect" }, select.context);
                    const n = result.value instanceof Array ? result.value.length : 0;
                    if (select.repeated && result.nodes.length === n && !select.collate) {
                        subitem = {
                            nodes: this.nodeKeys(result.nodes),
                            key: result.key,
                            value: result.nodes.toArray().map((node, index) => {
                                this.pokeContext({
                                    nodes: $(node),
                                    value: result.value instanceof Array ? result.value[index] : result.value,
                                    index
                                });
                                return this.select(select.select, pivot);
                            })
                        };
                    }
                    else if (select.repeated && result.value instanceof Array && !select.collate) {
                        subitem = {
                            nodes: this.nodeKeys(result.nodes),
                            key: result.key,
                            value: result.value.map((value, index) => {
                                this.pokeContext({
                                    nodes: result.nodes,
                                    value,
                                    index
                                });
                                return this.select(select.select, pivot);
                            })
                        };
                    }
                    else {
                        this.pokeContext({
                            nodes: result.nodes,
                            value: result.value,
                        });
                        const subselect = select.collate ? select.select.map(obj => ({ ...obj, all: true })) : select.select;
                        const value = this.select(subselect, pivot);
                        subitem = {
                            nodes: this.nodeKeys(result.nodes),
                            key: result.key,
                            value: select.repeated ? [value] : value
                        };
                    }
                    this.popContext();
                }
            }
            this.log(`SELECT ${this.contextKey()} -> ${$statements(select.query)} -> ${subitem ? trunc(subitem.value) : "(none)"}${item ? ` merge(${typeName(item?.value)}, ${typeName(subitem?.value)})` : ""}`);
            return merge(item, subitem);
        }
        selectResolveUnion(select, item, data) {
            const { union, ...superselect } = select;
            if (union) {
                for (const subselect of union) {
                    if (subselect.active ?? true) {
                        if (this.when(subselect.when)) {
                            this.pokeContext({
                                action: "union",
                                union: union.indexOf(subselect)
                            });
                            this.log(`UNION ${this.contextKey()} ${union.indexOf(subselect) + 1}/${union.length}`);
                            if (subselect.pivot) {
                                item = this.selectResolvePivot({ ...superselect, ...subselect }, item);
                            }
                            else if (subselect.query) {
                                item = this.selectResolveSelector({ ...superselect, ...subselect }, item);
                            }
                            else if (subselect.value) {
                                item = this.selectResolveValue(subselect);
                            }
                        }
                        else {
                            this.log(`UNION SKIPPED ${this.contextKey()} ${union.indexOf(subselect) + 1}/${union.length}`);
                        }
                    }
                    else {
                        this.log(`UNION BYPASSED ${this.contextKey()} ${union.indexOf(subselect) + 1}/${union.length}`);
                    }
                }
            }
            return item;
        }
        selectResolveValue(select, data) {
            const result = this.evaluate(select.value, { data });
            const value = coerceValue(result, select.type || "string");
            return {
                nodes: [],
                key: this.contextKey(),
                value: select.repeated ? [value] : value
            };
        }
        async snooze(interval) {
            this.log(`SNOOZE ${interval[0]}s`);
            await sleep(interval[0] * 1000);
        }
        text(nodes, format) {
            const $ = this.jquery;
            format = format?.toLowerCase();
            if (this.online && format === "innertext") {
                return nodes.toArray().map(element => element.innerText);
            }
            else if (this.online && format === "textcontent") {
                return nodes.toArray().map(element => element.textContent);
            }
            else if (format === "none") {
                return nodes.toArray().map(element => $(element).text());
            }
            else {
                nodes.find("*").each((index, element) => {
                    const node = $(element);
                    const tag = node.prop("tagName").toLowerCase();
                    const whitespace = tag === "br" || tag === "p" ? "\n" : " ";
                    node.append(whitespace);
                    if (index === 0) {
                        node.prepend(" ");
                    }
                });
                return nodes.toArray().map(element => $(element).text().trim().replace(/[ ]{2,}/g, " "));
            }
        }
        async transform(transforms) {
            for (const transform of transforms) {
                if (transform.active ?? true) {
                    if (this.when(transform.when, "TRANSFORM")) {
                        const query = transform.query;
                        const selector = query[0];
                        const [operands] = query.slice(1);
                        if (selector === "{window}" && operands[0] === "scrollBottom") {
                            const delay = typeof operands[1] === "number" ? operands[1] : undefined;
                            const max = typeof operands[2] === "number" ? operands[2] : undefined;
                            const pagedowns = await $scrollToBottom(delay, max);
                            this.log(`TRANSFORM ${$statement(query)} (${pagedowns}x)`);
                        }
                        else {
                            try {
                                const result = this.resolveQuery({ query, repeated: true, all: true, limit: null });
                                this.log(`TRANSFORM ${$statement(query)} -> (${result?.nodes?.length || 0} nodes)`);
                            }
                            catch (err) {
                                this.log(`TRANSFORM ERROR ${$statement(query)}: ${err instanceof Error ? err.message : JSON.stringify(err)}`);
                            }
                        }
                    }
                    else {
                        this.log(`TRANSFORM SKIPPED ${$statement(transform.query)}`);
                    }
                }
                else {
                    this.log(`TRANSFORM BYPASSED ${$statement(transform.query)}`);
                }
            }
        }
        validateOperands(operator, operands, required, optional = []) {
            for (let i = 0; i < required.length; ++i) {
                if (typeof operands[i] !== required[i]) {
                    this.appendError("invalid-operand", `Operand #${i + 1} of "${operator}" is invalid: "${operands[i]}" is not a ${required[i]}`, 0);
                    return false;
                }
            }
            for (let i = 0; i < optional.length; ++i) {
                const j = i + required.length;
                if (operands[j] !== undefined && operands[j] !== null && typeof operands[j] !== optional[i]) {
                    this.appendError("invalid-operand", `Operand #${j + 1} of "${operator}" is invalid: "${operands[j]}" is not a ${optional[i]}`, 0);
                    return false;
                }
            }
            return true;
        }
        validateOperators(ops) {
            const valid = ops instanceof Array && ops.every(op => op instanceof Array && op.length > 0 && typeof op[0] === "string");
            if (!valid) {
                this.appendError("invalid-operator", `Invalid operator in: ${JSON.stringify(ops)}`, 0);
            }
            return valid;
        }
        validateSelect(select) {
            const n = (select.query !== undefined ? 1 : 0) + (select.union !== undefined ? 1 : 0) + (select.value !== undefined ? 1 : 0);
            if (n !== 1) {
                this.appendError("invalid-select", "Select requires one of 'query', 'union', or 'value'", 0);
                return false;
            }
            else {
                return true;
            }
        }
        async waitfor({ query, select, timeout, on = "any", required, pattern, when, active }, context) {
            if (this.online && (active ?? true)) {
                if (this.when(when, "WAITFOR")) {
                    if (timeout === undefined) {
                        timeout = 30;
                    }
                    else if (timeout === null || timeout <= 0) {
                        timeout = Infinity;
                    }
                    let code = null;
                    if (query) {
                        this.log(`${context ? `${context} ` : ""}WAITFOR QUERY ${trunc(query)} on=${on}, timeout=${timeout}, pattern=${pattern}`);
                        code = await this.waitforQuery(query, on, timeout, required, pattern, context);
                    }
                    else if (select) {
                        this.log(`${context ? `${context} ` : ""}WAITFOR SELECT ${trunc(select)} on=${on}, timeout=${timeout}, pattern=${pattern}`);
                        code = await this.waitforSelect(select, on, timeout, required, pattern, context);
                    }
                    return code;
                }
                else {
                    this.log(`${context ? `${context} ` : ""}WAITFOR BYPASSSED ${$statements(query)}`);
                    return null;
                }
            }
            else {
                this.log(`${context ? `${context} ` : ""}WAITFOR SKIPPED ${$statements(query)}`);
                return null;
            }
        }
        async waitforQuery(query, on, timeout, required, pattern, context) {
            const t0 = new Date().valueOf();
            let elapsed = 0;
            let pass = false;
            let result = undefined;
            while (!pass && elapsed < timeout) {
                [pass, result] = this.queryCheck(query, on, pattern);
                if (!pass) {
                    await sleep(100);
                }
                elapsed = (new Date().valueOf() - t0) / 1000;
            }
            const message = `${context ? `${context} ` : ""}WAITFOR QUERY ${$statements(query)} -> ${trunc(result?.value)}${pattern ? ` (valid=${result?.valid})` : ""} -> on=${on} -> ${pass} (${elapsed.toFixed(1)}s${elapsed > timeout ? " TIMEOUT" : ""})`;
            this.log(message);
            if (pass) {
                return null;
            }
            else if (required) {
                this.appendError("waitfor-timeout", message, 1);
                return "timeout";
            }
            else {
                return null;
            }
        }
        async waitforSelect(selects, on, timeout, required, pattern, context) {
            for (const select of selects) {
                if (!select.name || !select.name.startsWith("_") || !(!select.type || select.type === "boolean") || select.repeated) {
                    this.appendError("invalid-select", "waitfor select must all be internal, boolean, and not repeated", 0);
                    return "invalid";
                }
            }
            const t0 = new Date().valueOf();
            let elapsed = 0;
            let state = {};
            let pass = false;
            while (!pass && elapsed < timeout) {
                state = {};
                let n = 0;
                for (const select of selects) {
                    const type = pattern ? "string" : "boolean";
                    const all = on === "all";
                    const result = this.query({ ...select, type, pattern, all });
                    if (result && result.valid !== false) {
                        state[select.name] = result.value;
                        this.state.vars[select.name] = result.value;
                        if (result.value) {
                            n += 1;
                        }
                    }
                }
                if (on === "any") {
                    pass = n > 0;
                }
                else if (on === "all") {
                    pass = n === selects.length;
                }
                else if (on === "none") {
                    pass = n === 0;
                }
                else {
                    pass = n > 0;
                }
                if (!pass) {
                    await sleep(100);
                }
                elapsed = (new Date().valueOf() - t0) / 1000;
            }
            const message = `${context ? `${context} ` : ""}WAITFOR SELECT ${JSON.stringify(state)}${pattern ? "valid=???" : ""} -> on=${on} -> ${pass} (${elapsed.toFixed(1)}s${elapsed > timeout ? " TIMEOUT" : ""})`;
            this.log(message);
            if (pass) {
                return null;
            }
            else if (required) {
                this.appendError("waitfor-timeout", message, 1);
                return "timeout";
            }
            else {
                return null;
            }
        }
        when(when, context) {
            if (when) {
                try {
                    const result = !!this.evaluate(when);
                    this.log(`${context ? `${context} ` : ""}WHEN ${JSON.stringify(when)} -> ${result}`);
                    return result;
                }
                catch (err) {
                    this.log(`${context ? `${context} ` : ""}WHEN ${JSON.stringify(when)} -> ERROR ${err instanceof Error ? err.message : JSON.stringify(err)}`);
                    return false;
                }
            }
            return true;
        }
        yield({ active, when, timeout }) {
            if (this.online && (active ?? true)) {
                if (this.when(when, "YIELD")) {
                    this.log(`YIELD ${when || "(default)"} -> timeout=${timeout || "(default)"}`);
                    return { timeout };
                }
                else {
                    this.log(`YIELD SKIPPED ${when}`);
                }
            }
            else {
                this.log(`YIELD BYPASSED ${when}`);
            }
            return undefined;
        }
    }
    if (typeof state?.vars?.__instance === "number") {
        state.vars.__instance += 1;
    }
    const obj = new ExtractContext(state);
    obj.log(`INSTANCE #${obj.state.vars.__instance}${obj.online ? ` ${window.location.href}` : ""}`);
    try {
        await obj.run(obj.state.actions);
    }
    catch (err) {
        if (err === "STOP") {
            obj.log("STOPPED");
        }
        else {
            obj.appendError("fatal-error", err instanceof Error ? err.message : JSON.stringify(err), 0, err instanceof Error ? err.stack : undefined);
        }
    }
    return obj.state;
}

window.syphonx = { ...window.syphonx, extract };

})();
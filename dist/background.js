(() => {
const $c762165c71c37c57$var$defaultState = {
    params: {},
    log: [],
    errors: []
};
async function $c762165c71c37c57$export$f9380c9a627682d3({ actions: actions1 , url: url1 , state: state1 , step: step1 , root: root , params: params , debug: debug = false , nodes: nodes1 = false  }) {
    function collapseWhitespace(text, newlines = true) {
        if (typeof text === "string" && text.trim().length === 0) return null;
        else if (typeof text === "string" && newlines) return text.replace(/\s*\n\s*/gm, "\n").replace(/\n{2,}/gm, "\n").replace(/\s{2,}/gm, " ").trim();
        else if (typeof text === "string" && !newlines) return text.replace(/\n/gm, " ").replace(/\s{2,}/gm, " ").trim();
        else return text;
    }
    function coerceValue(value, type) {
        if (type === "string") return typeof value === "string" ? value : typeof value === "number" || typeof value === "boolean" ? value.toString() : null;
        else if (type === "number") return typeof value === "number" ? value : typeof value === "string" ? parseNumber(value) : null;
        else if (type === "boolean") return typeof value === "boolean" ? value : typeof value === "string" ? value.trim().length > 0 : null;
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
    function expandTokens(input, obj, encode = false) {
        if (typeof input === "string") {
            let result = input;
            const tokens = Array.from(new Set(input.match(/{[a-z0-9._]+}/g) || []));
            for (const token of tokens){
                let value = resolveProperty(obj, token.slice(1, -1));
                if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") result = result.replace(new RegExp(token, "gi"), encode ? encodeURIComponent(value.toString()) : value.toString());
                else if (value === null) return null;
                else result = result.replace(new RegExp(token, "gi"), "");
            }
            result = result.replace(/\{\{/g, "{").replace(/\}\}/g, "}");
            return result;
        } else return input;
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
        const [protocol, , host] = url.split("/");
        const a = host.split(":")[0].split(".").reverse();
        return {
            domain: a.length >= 3 && a[0].length === 2 && a[1].length === 2 ? `${a[2]}.${a[1]}.${a[0]}` : a.length >= 2 ? `${a[1]}.${a[0]}` : undefined,
            origin: protocol && host ? `${protocol}//${host}` : undefined
        };
    }
    function regexpExtract(text, regexp) {
        const match = regexp.exec(text);
        return match ? match[1] : null;
    }
    function regexpReplace(text, regexp, replace) {
        if (typeof text === "string") return text.replace(regexp, replace);
        else return text;
    }
    function resolveProperty(dictionary, key) {
        if (typeof key === "string") return key.split(".").reduce((result, prop)=>typeof result === "object" && result !== null ? result[prop] : undefined, dictionary);
    }
    function resolveQueryStringValue(value1, delegate) {
        let result = null;
        if (typeof value1 === "string") result = delegate(value1);
        else if (value1 instanceof Array && value1.every((value)=>typeof value === "string")) result = value1.map((value)=>delegate(value));
        return result;
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
        const text = JSON.stringify(obj);
        if (typeof text === "string") return text.length <= max ? text : `${text[0]}${text.slice(1, max)}…${text[text.length - 1]}`;
        else return "";
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
    function unwrapValue(obj) {
        if (obj instanceof Array) return obj.map((item)=>unwrapValue(item));
        else if (isObject(obj) && typeof obj.hasOwnProperty === "function" && obj.hasOwnProperty("value")) return unwrapValue(obj.value);
        else if (isObject(obj)) {
            const source = obj;
            const target = {};
            for (const key of Object.keys(obj))if (isObject(source[key]) && typeof source[key].hasOwnProperty === "function" && source[key].hasOwnProperty("value")) target[key] = unwrapValue(source[key].value);
            else target[key] = unwrapValue(source[key]);
            return target;
        } else return obj;
    }
    function $scrollToBottom() {
        return new Promise((resolve)=>{
            let totalHeight = 0;
            const timer = setInterval(()=>{
                window.scrollBy(0, window.innerHeight);
                totalHeight += window.innerHeight;
                if (totalHeight >= document.body.scrollHeight - window.innerHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    }
    function $statement(query) {
        const selector = query[0];
        const ops = query.slice(1);
        return [
            `$("${selector}")`,
            ...ops.map((op)=>`${op[0]}(${op.slice(1).map((param)=>JSON.stringify(param)).join(", ")})`)
        ].join(".");
    }
    function $statements($) {
        if ($ && $.length > 0) return `${$statement($[0])}${$.length > 1 ? ` (+${$.length - 1} more))` : ""}`;
        else return "(none)";
    }
    class ExtractError {
        constructor(code, message){
            this.code = code;
            this.message = message;
        }
    }
    class ExtractContext {
        constructor(jquery, url, actions, state){
            this.jquery = jquery;
            this.actions = actions;
            this.state = state;
            this.online = typeof jquery.noConflict === "function";
        }
        break({ active: active , when: when  }) {
            if (this.online && (active ?? true)) {
                if (this.when(when, "BREAK")) {
                    this.log(`BREAK ${when}`);
                    return true;
                } else this.log(`BREAK SKIPPED ${when}`);
            } else this.log(`BREAK BYPASSED ${when}`);
            return false;
        }
        async click({ $: $ , waitfor: waitfor , snooze: snooze , required: required , retry: retry , active: active , when: when  }) {
            if (this.online && (active ?? true)) {
                if (this.when(when, "CLICK")) {
                    const mode = snooze ? snooze[2] || "before" : undefined;
                    if (snooze && (mode === "before" || mode === "before-and-after")) {
                        const seconds = snooze[0];
                        this.log(`CLICK SNOOZE BEFORE (${seconds}s) ${$statements($)}`);
                        await sleep(seconds * 1000);
                    }
                    const result = this.query({
                        $: $
                    });
                    if (result && result.nodes.length > 0) {
                        this.log(`CLICK ${$statements($)}`);
                        const [node] = result.nodes;
                        node.click();
                        if (waitfor) {
                            const code = await this.waitfor(waitfor, "CLICK");
                            if (!code) {
                                if (snooze && (mode === "after" || mode === "before-and-after")) {
                                    const seconds = snooze[0];
                                    this.log(`CLICK SNOOZE AFTER (${seconds}s) ${$statements($)}`);
                                    await sleep(seconds * 1000);
                                }
                            } else if (code === "timeout") {
                                this.error("click-timeout", `Timeout waiting for click result. ${trunc(waitfor.$)}${waitfor.pattern ? `, pattern=${waitfor.pattern}` : ""}`);
                                return "timeout";
                            } else code;
                        }
                    } else {
                        if (required) this.error("click-required", `Required click target not found. ${trunc($)}`);
                        return "not-found";
                    }
                } else this.log(`CLICK SKIPPED ${$statements($)}`);
            } else this.log(`CLICK BYPASSED ${$statements($)}`);
            return null;
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
            } else if (action.hasOwnProperty("repeat")) await this.repeat(action.repeat);
            else if (action.hasOwnProperty("snooze")) await this.snooze(action.snooze);
            else if (action.hasOwnProperty("transform")) await this.transform(action.transform);
            else if (action.hasOwnProperty("waitfor")) {
                const required = action.waitfor.required;
                const code = await this.waitfor(action.waitfor);
                if (code === "timeout" && required) return "timeout";
            } else if (action.hasOwnProperty("yield")) {
                const waitfor = this.yield(action.yield || {});
                if (waitfor) {
                    this.state.yield = {
                        step: step,
                        waitfor: waitfor
                    };
                    return "yield";
                }
            }
            return null;
        }
        error(code, message) {
            this.state.errors.push({
                code: code,
                message: message
            });
            this.log(`ERROR (${code}): ${message}`);
        }
        async execute(actions, start = 1) {
            for (const action of actions){
                const step = actions.indexOf(action) + 1;
                if (step >= start) {
                    this.log(`step ${step}/${actions.length}`);
                    const code = await this.dispatch(action, step);
                    if (code) {
                        this.log(`break at step ${step}/${actions.length}, code=${code}`);
                        return;
                    }
                }
            }
            this.log(`${actions.length} steps completed`);
        }
        formatResult(result, type, all, limit, format = "multiline", pattern) {
            const regexp = createRegExp(pattern);
            if (limit !== undefined && limit !== null && result.value instanceof Array) {
                result.nodes = this.jquery(result.nodes.toArray().slice(0, limit));
                result.value = result.value.slice(0, limit);
            }
            if (type === "string" && result.value instanceof Array) {
                result.value = result.value.map((value)=>formatStringValue(coerceValue(value, "string"), format, this.state.origin));
                if (regexp && !isEmpty(result.value)) result.valid = result.value.every((value)=>regexp.test(value));
            } else if (type === "string") {
                result.value = formatStringValue(coerceValue(result.value, "string"), format, this.state.origin);
                if (regexp && !isEmpty(result.value)) result.valid = regexp.test(result.value);
            } else if (type === "boolean" && result.value instanceof Array && result.value.length === 0) result.value = false;
            else if (type === "boolean" && result.value instanceof Array && all) result.value = result.value.every((value)=>coerceValue(value, "boolean") === true);
            else if (type === "boolean" && result.value instanceof Array && !all) result.value = result.value.some((value)=>coerceValue(value, "boolean") === true);
            else if (type === "boolean") result.value = coerceValue(result.value, "boolean");
            else if (type === "number" && result.value instanceof Array) result.value = result.value.map((value)=>coerceValue(value, "number"));
            else if (type === "number") result.value = coerceValue(result.value, "number");
            return result;
        }
        formatValue(value, type, format) {
            type = type?.toLowerCase();
            format = format?.toLowerCase();
            if (typeof value === "string") {
                if (type === "number") return parseNumber(value);
                else if (type === "boolean") return value.trim().length > 0;
                else if (format === "href" && typeof value === "string" && this.state.origin) return combineUrl(this.state.origin, value);
                else if (format === "multiline") return collapseWhitespace(value, true);
                else if (format === "singleline") return collapseWhitespace(value, false);
                else if (format === "none") return value;
            }
            return value;
        }
        html() {
            if (this.online) return window.document.documentElement.outerHTML;
            else {
                const cheerio = this.jquery;
                return cheerio.html();
            }
        }
        keypath(name, context) {
            return context ? `${context.name}.${name || "."}` : `${name || ""}`;
        }
        log(text) {
            if (this.state.debug) this.state.log.push(text);
        }
        mergeQueryResult(source, target) {
            if (source && target) {
                let nodes = source.nodes && target.nodes ? this.jquery([
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
                    value: value,
                    valid: target.valid ?? source.valid
                };
            } else if (target) return target;
            else return source;
        }
        query({ $: $ , type: type = "string" , repeated: repeated = false , all: all = false , format: format , pattern: pattern , limit: limit  }, context) {
            if (limit === undefined && type === "string" && !repeated && !all) limit = 1;
            if ($ instanceof Array && $.every((query)=>query instanceof Array) && $[0].length > 0 && !!$[0][0]) {
                let result = undefined;
                for (const query of $){
                    const subresult = this.resolveQuery(query, type, repeated, all, limit, format, pattern, context);
                    result = this.mergeQueryResult(result, subresult);
                    this.log(`${$statement(query)} -> ${trunc(subresult.value)} (${subresult.nodes.length} nodes) ${$.indexOf(query) + 1}/${$.length}${subresult !== result ? ` (merged ${result.nodes.length} nodes)` : ""}${pattern ? `, pattern=${pattern}, valid=${subresult.valid}` : ""}`);
                    if (!all && subresult.nodes.length > 0) break;
                }
                if (result) {
                    if (repeated && !(result.value instanceof Array)) result.value = [
                        result.value
                    ];
                    else if (!repeated && result.value instanceof Array && type === "string") result.value = result.value.length > 0 ? result.value.join(format === "singleline" ? " " : "\n") : null;
                    else if (!repeated && result.value instanceof Array) result.value = result.value[0];
                    return result;
                }
            }
        }
        async repeat({ actions: actions , limit: limit = 100 , errors: errors = 1  }) {
            let errorCount = 0;
            let baselineErrorCount = this.state.errors.length;
            let i = 0;
            while(i < limit){
                this.log(`REPEAT #${++i} (limit=${limit})`);
                this.state._page = i;
                for (const action of actions){
                    const step = actions.indexOf(action) + 1;
                    const code = await this.dispatch(action, step);
                    if (code) {
                        this.log(`REPEAT #${i} -> break at step ${step}/${actions.length}, code=${code}`);
                        break;
                    }
                }
                this.log(`REPEAT #${i} -> ${actions.length} steps completed`);
                errorCount = this.state.errors.length - baselineErrorCount;
                if (errorCount >= errors) {
                    this.error("error-limit", `${errorCount} errors in repeat (error ${errors} limit exceeded)`);
                    break;
                }
            }
            this.log(`REPEAT ${i} iterations completed (limit=${limit}, errors=${errorCount}/${errors})`);
        }
        resolveQuery(query, type, repeated, all, limit, format, pattern, context) {
            const selector = query[0];
            const ops = query.slice(1);
            let nodes;
            let value;
            if (selector === "." && context) {
                nodes = this.jquery(context.nodes);
                value = context.value;
            } else if (selector === ".." && context?.parent) {
                nodes = this.jquery(context.parent.nodes);
                value = context.parent.value;
            } else if (selector === "{window}") {
                nodes = this.online ? this.jquery(window) : this.jquery();
                value = null;
            } else if (selector === "{document}") {
                nodes = this.online ? this.jquery(document) : this.jquery();
                value = null;
            } else {
                nodes = this.jquery(selector, context?.nodes);
                value = this.text(nodes, format);
            }
            if (ops.length > 0) return this.resolveQueryOps({
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
            else if (type === "boolean") return {
                nodes: nodes,
                value: !repeated ? nodes.length > 0 : [
                    nodes.length > 0
                ]
            };
            else return this.formatResult({
                nodes: nodes,
                value: value
            }, type, all, limit, format, pattern);
        }
        resolveQueryOps({ ops: ops , nodes: nodes , type: type , repeated: repeated , all: all , limit: limit , format: format , pattern: pattern , value: value2  }) {
            const result = {
                nodes: nodes,
                value: value2
            };
            const a = ops.slice(0);
            while(a.length > 0){
                const [operator, ...operands] = a.shift();
                if (operator === "cut") {
                    if (!this.validateOperands(operator, operands, [
                        "string",
                        "number"
                    ], [
                        "number"
                    ])) {
                        result.value = null;
                        break;
                    }
                    const splitter = operands[0];
                    const n = operands[1];
                    const limit = operands[2];
                    if (typeof result.value === "string") result.value = cut(result.value, splitter, n, limit);
                    else if (result.value instanceof Array && result.value.every((value)=>typeof value === "string")) result.value = result.value.map((value)=>cut(value, splitter, n, limit));
                    else result.value = null;
                } else if (operator === "endsWith" && operands[0]) {
                    const pattern = operands[0];
                    result.nodes = this.jquery(result.nodes.toArray().filter((element)=>this.jquery(element).text().trim().endsWith(pattern)));
                    result.value = this.text(result.nodes, format);
                } else if (operator === "extract") {
                    if (!this.validateOperands(operator, operands, [
                        "string"
                    ], [
                        "boolean"
                    ])) {
                        result.value = null;
                        break;
                    }
                    const regexp = createRegExp(operands[0]);
                    const keepUnmatchedItems = operands[1];
                    if (!regexp) result.value = null;
                    else if (result.value instanceof Array && result.value.every((value)=>typeof value === "string")) {
                        const values = result.value.map((value)=>regexpExtract(value.trim(), regexp));
                        if (!keepUnmatchedItems) {
                            const elements = result.nodes.toArray();
                            for(let i = result.value.length - 1; i >= 0; --i)if (values[i] === null) {
                                elements.splice(i, 1);
                                values.splice(i, 1);
                            }
                            result.nodes = this.jquery(elements);
                        }
                        result.value = values;
                    } else if (typeof result.value === "string") result.value = regexpExtract(result.value.trim(), regexp);
                    else result.value = null;
                } else if (operator === "filterText") {
                    if (!this.validateOperands(operator, operands, [
                        "string"
                    ])) {
                        result.value = null;
                        break;
                    }
                    const regexp = createRegExp(operands[0]);
                    if (regexp && result.value instanceof Array && result.value.length === result.nodes.length && result.value.every((value)=>typeof value === "string")) {
                        const elements = result.nodes.toArray();
                        const values = result.value;
                        for(let i = result.value.length - 1; i >= 0; --i)if (!regexp.test(result.value[i])) {
                            elements.splice(i, 1);
                            values.splice(i, 1);
                        }
                        result.nodes = this.jquery(elements);
                        result.value = values;
                    }
                } else if (operator === "first") {
                    result.nodes = this.jquery(result.nodes.toArray()[0]);
                    result.value = result.value instanceof Array ? result.value[0] : null;
                } else if (operator === "html" && (operands[0] === "outer" || operands[0] === undefined)) {
                    if (this.online) result.value = result.nodes.toArray().map((element)=>element.outerHTML);
                    else {
                        const cheerio = this.jquery;
                        result.value = result.nodes.toArray().map((element)=>cheerio.html(element));
                    }
                } else if (operator === "html" && operands[0] === "inner") result.value = result.nodes.html();
                else if (operator === "last") {
                    result.nodes = this.jquery(result.nodes.toArray()[result.nodes.length - 1]);
                    result.value = result.value instanceof Array ? result.value[result.value.length - 1] : null;
                } else if (operator === "ltrim") {
                    if (!this.validateOperands(operator, operands, [
                        "string"
                    ])) {
                        result.value = null;
                        break;
                    }
                    result.value = resolveQueryStringValue(result.value, (text)=>ltrim(text, createRegExp(operands[0]) || operands[0]));
                } else if (operator === "replace") {
                    if (!this.validateOperands(operator, operands, [
                        "string",
                        "string"
                    ])) {
                        result.value = null;
                        break;
                    }
                    const regexp = createRegExp(operands[0]);
                    if (!regexp) result.value = null;
                    else if (result.value instanceof Array && result.value.every((value)=>typeof value === "string")) result.value = result.value.map((value)=>regexpReplace(value, regexp, operands[1]));
                    else if (typeof result.value === "string") result.value = regexpReplace(result.value, regexp, operands[1]);
                    else result.value = null;
                } else if (operator === "rtrim") {
                    if (!this.validateOperands(operator, operands, [
                        "string"
                    ])) {
                        result.value = null;
                        break;
                    }
                    result.value = resolveQueryStringValue(result.value, (text)=>rtrim(text, createRegExp(operands[0]) || operands[0]));
                } else if (operator === "scrollBottom") {
                    if (this.online) {
                        const y = result.nodes.scrollTop() + result.nodes.height();
                        this.log(`scrollBottom ${result.nodes.scrollTop()} ${result.nodes.height()} ${y}`);
                        window.scrollTo(0, y);
                    }
                } else if (operator === "split") {
                    const bypass = operands[0] === undefined && result.value instanceof Array;
                    if (!bypass) {
                        const text = result.value instanceof Array ? result.value.join("\n") : result.value;
                        const separator = operands[0];
                        const limit = typeof operands[1] === "number" ? operands[1] : undefined;
                        const trim = typeof operands[2] === "boolean" ? operands[2] : true;
                        result.value = text.split(separator, limit);
                        if (trim && result.value instanceof Array) result.value = result.value.map((value)=>value.trim()).filter((value)=>value.length > 0);
                    }
                } else if (operator === "startsWith" && operands[0]) {
                    const pattern = operands[0];
                    result.nodes = this.jquery(result.nodes.toArray().filter((element)=>this.jquery(element).text().trim().startsWith(pattern)));
                    result.value = this.text(result.nodes, format);
                } else if (operator === "text" && operands[0] === "inline") result.value = result.nodes.toArray().map((element)=>Array.from(element.childNodes).filter((node)=>node.nodeType === 3).map((node)=>node.textContent ?? node.data).join(" ").trim().replace(/[ ]{2,}/, " "));
                else if (operator === "trim") {
                    if (!this.validateOperands(operator, operands, [
                        "string"
                    ])) {
                        result.value = null;
                        break;
                    }
                    result.value = resolveQueryStringValue(result.value, (text)=>trim1(text, createRegExp(operands[0]) || operands[0]));
                } else if (operator === ":not(:blank)") {
                    result.nodes = this.jquery(result.nodes.toArray().filter((element)=>this.jquery(element).text().trim().length > 0));
                    result.value = this.text(result.nodes, format);
                } else if (isInvocableFrom(result.nodes, operator)) {
                    const delegate1 = result.nodes;
                    const obj2 = delegate1[operator](...operands);
                    if (isJQueryObject(obj2)) {
                        result.nodes = obj2;
                        result.value = this.text(result.nodes, format);
                    } else if (repeated) result.value = result.nodes.toArray().map((element)=>{
                        const delegate = this.query(element);
                        const obj = delegate[operator](...operands);
                        return obj;
                    });
                    else result.value = obj2;
                } else {
                    this.error("invalid-operator", `'${operator}' not found`);
                    break;
                }
            }
            return this.formatResult(result, type, all, limit, format, pattern);
        }
        select(selects, context) {
            const data = {};
            for (const select of selects)if (select.active ?? true) {
                let item = null;
                if (this.when(select.when)) {
                    if (select.pivot) item = this.selectResolvePivot(select, item, context);
                    else if (select.$) item = this.selectResolve(select, item, context);
                    else if (select.union) item = this.selectResolveUnion(select, item, context, data);
                    else if (select.value) item = this.selectResolveValue(select, data);
                }
                if (isEmpty(item?.value) && select.required) this.error("select-required", `Required select '${context?.name ? `${context.name}.${select.name}` : select.name}' not found`);
                if (select.name?.startsWith("_") && item) this.state[select.name] = item.value;
                else if (select.name) data[select.name] = item;
                else return item;
            }
            return data;
        }
        selectResolve(select, item, context) {
            let subitem = null;
            if (select.type === undefined) select.type = select.select ? "object" : "string";
            const result = this.query(select, context);
            if (result) {
                if (select.type !== "object") subitem = {
                    nodes: [],
                    value: result.value
                };
                else if (select.select) {
                    const n = result.value instanceof Array ? result.value.length : 0;
                    if (select.repeated && result.nodes.length === n && !select.collate) subitem = {
                        nodes: [],
                        value: result.nodes.toArray().map((node, i)=>{
                            const subcontext = {
                                name: context?.name ? `${context.name}.${select.name}[${i}]` : `${select.name}[${i}]`,
                                nodes: this.jquery(node),
                                value: result.value instanceof Array ? result.value[i] : result.value,
                                parent: context
                            };
                            return this.select(select.select, subcontext);
                        })
                    };
                    else if (select.repeated && result.value instanceof Array && !select.collate) subitem = {
                        nodes: [],
                        value: result.value.map((value, i)=>{
                            const subcontext = {
                                name: context?.name ? `${context.name}.${select.name}[${i}]` : `${select.name}[${i}]`,
                                nodes: result.nodes,
                                value: value,
                                parent: context
                            };
                            return this.select(select.select, subcontext);
                        })
                    };
                    else {
                        const subcontext = {
                            name: context?.name ? `${context.name}.${select.name}` : select.name,
                            nodes: result.nodes,
                            value: result.value,
                            parent: context
                        };
                        const subselect = select.collate ? select.select.map((obj)=>({
                                ...obj,
                                all: true
                            })) : select.select;
                        const value = this.select(subselect, subcontext);
                        subitem = {
                            nodes: [],
                            value: select.repeated ? [
                                value
                            ] : value
                        };
                    }
                }
            }
            this.log(`SELECT ${this.keypath(select.name, context)} -> ${$statements(select.$)} -> ${subitem ? trunc(subitem.value) : "(none)"}${item ? ` merge(${typeName(item?.value)}, ${typeName(subitem?.value)})` : ""}`);
            return merge(item, subitem);
        }
        selectResolvePivot(select, item, context) {
            const { pivot: pivot , ...superselect } = select;
            if (pivot) {
                const result = this.query(select, context);
                if (result && result.nodes && result.nodes.length > 0) {
                    const parent = {
                        name: context?.name ? `${context.name}.${select.name}` : select.name,
                        nodes: result.nodes,
                        value: result.value,
                        parent: context
                    };
                    const elements = result.nodes.toArray();
                    for (const element of elements){
                        const i = elements.indexOf(element);
                        const nodes = this.jquery(element);
                        const value = this.text(nodes, select.format);
                        const subcontext = {
                            name: context?.name ? `${context.name}.${select.name}[${i}]` : `${select.name}[${i}]`,
                            nodes: nodes,
                            value: value,
                            parent: parent
                        };
                        item = this.selectResolve({
                            ...superselect,
                            ...pivot
                        }, item, subcontext);
                        this.log(`PIVOT ${subcontext.name} -> ${typeName(item?.value)}`);
                    }
                } else this.log(`PIVOT ${this.keypath(select.name, context)} EMPTY`);
            }
            return item;
        }
        selectResolveUnion(select, item, context, data) {
            const { union: union , ...superselect } = select;
            if (union) {
                for (const subselect of union)if (subselect.active ?? true) {
                    if (this.when(subselect.when)) {
                        this.log(`UNION ${this.keypath(select.name, context)} ${union.indexOf(subselect) + 1}/${union.length}`);
                        if (subselect.pivot) item = this.selectResolvePivot({
                            ...superselect,
                            ...subselect
                        }, item, context);
                        else if (subselect.$) item = this.selectResolve({
                            ...superselect,
                            ...subselect
                        }, item, context);
                        else if (subselect.value) item = this.selectResolveValue(subselect);
                    } else this.log(`UNION SKIPPED ${this.keypath(select.name, context)} ${union.indexOf(subselect) + 1}/${union.length}`);
                } else this.log(`UNION BYPASSED ${this.keypath(select.name, context)} ${union.indexOf(subselect) + 1}/${union.length}`);
            }
            return item;
        }
        selectResolveValue(select, data) {
            const obj = {
                ...this.state,
                data: merge(this.state.data, data)
            };
            const value = coerceValue(expandTokens(select.value, obj), select.type || "string");
            return {
                nodes: [],
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
            format = format?.toLowerCase();
            if (this.online && format === "innertext") return nodes.toArray().map((element)=>element.innerText);
            else if (this.online && format === "textcontent") return nodes.toArray().map((element)=>element.textContent);
            else if (format === "none") return nodes.toArray().map((element)=>this.jquery(element).text());
            else {
                nodes.find("*").each((index, element)=>{
                    const node = this.jquery(element);
                    const tag = node.prop("tagName").toLowerCase();
                    const whitespace = tag === "br" || tag === "p" ? "\n" : " ";
                    node.append(whitespace);
                    if (index === 0) node.prepend(" ");
                });
                return nodes.toArray().map((element)=>this.jquery(element).text().trim().replace(/[ ]{2,}/g, " "));
            }
        }
        async transform(transforms) {
            for (const transform of transforms)if (transform.active ?? true) {
                if (this.when(transform.when, "TRANSFORM")) for (const query of transform.$){
                    const selector = query[0];
                    const ops = query.slice(1);
                    if (selector === "{window}" && ops[0][0] === "scrollBottom") {
                        this.log(`TRANSFORM ${$statement(query)}`);
                        await $scrollToBottom();
                    } else {
                        this.log(`TRANSFORM ${$statement(query)}`);
                        this.resolveQuery(query, "string", false, false, null);
                    }
                }
                else this.log(`TRANSFORM SKIPPED ${$statements(transform.$)}`);
            } else this.log(`TRANSFORM BYPASSED ${$statements(transform.$)}`);
        }
        validateOperands(operator, operands, required, optional = []) {
            for(let i = 0; i < required.length; ++i)if (typeof operands[i] !== required[i]) {
                this.error("invalid-operand", `'${operator}' operand #${i + 1} is invalid: "${operands[i]}" is not a ${required[i]}`);
                return false;
            }
            for(let i1 = 0; i1 < optional.length; ++i1){
                const j = i1 + required.length;
                if (operands[j] !== undefined && operands[j] !== null && typeof operands[j] !== optional[i1]) {
                    this.error("invalid-operand", `'${operator}' operand #${j + 1} is invalid: "${operands[j]}" is not a ${optional[i1]}`);
                    return false;
                }
            }
            return true;
        }
        async waitfor({ $: $ , select: select , timeout: timeout , on: on = "any" , pattern: pattern , when: when , active: active  }, context) {
            if (this.online && (active ?? true)) {
                if (this.when(when, "WAITFOR")) {
                    if (timeout === undefined) timeout = 30;
                    else if (timeout === null || timeout <= 0) timeout = Infinity;
                    let code = null;
                    if ($) {
                        this.log(`${context ? `${context} ` : ""}WAITFOR QUERY ${trunc($)} on=${on}, timeout=${timeout}, pattern=${pattern}`);
                        code = await this.waitforQuery($, on, timeout, pattern, context);
                    } else if (select) {
                        this.log(`${context ? `${context} ` : ""}WAITFOR SELECT ${trunc(select)} on=${on}, timeout=${timeout}, pattern=${pattern}`);
                        code = await this.waitforSelect(select, on, timeout, pattern, context);
                    }
                    return code;
                } else {
                    this.log(`${context ? `${context} ` : ""}WAITFOR BYPASSSED ${$statements($)}`);
                    return null;
                }
            } else {
                this.log(`${context ? `${context} ` : ""}WAITFOR SKIPPED ${$statements($)}`);
                return null;
            }
        }
        async waitforQuery($, on, timeout, pattern, context) {
            const t0 = new Date().valueOf();
            let elapsed = 0;
            let pass = false;
            let result = undefined;
            while(!pass && elapsed < timeout){
                const type = pattern ? "string" : "boolean";
                const all = on === "all";
                result = this.query({
                    $: $,
                    type: type,
                    pattern: pattern,
                    all: all,
                    repeated: all
                });
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
                if (!pass) await sleep(100);
                elapsed = (new Date().valueOf() - t0) / 1000;
            }
            const message = `${context ? `${context} ` : ""}WAITFOR QUERY ${$statements($)} -> ${trunc(result?.value)}${pattern ? ` (valid=${result?.valid})` : ""} -> on=${on} -> ${pass} (${elapsed}s${elapsed > timeout ? " TIMEOUT" : ""})`;
            this.log(message);
            if (pass) return null;
            else {
                this.error("waitfor-timeout", message);
                return "timeout";
            }
        }
        async waitforSelect(selects, on, timeout, pattern, context) {
            for (const select of selects)if (!select.name || !select.name.startsWith("_") || !(!select.type || select.type === "boolean") || select.repeated) {
                this.error("invalid-select", "waitfor select must all be internal, boolean, and not repeated");
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
                        this.state[select.name] = result.value;
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
            const message = `${context ? `${context} ` : ""}WAITFOR SELECT ${JSON.stringify(state)}${pattern ? "valid=???" : ""} -> on=${on} -> ${pass} (${elapsed}s${elapsed > timeout ? " TIMEOUT" : ""})`;
            this.log(message);
            if (pass) return null;
            else {
                this.error("waitfor-timeout", message);
                return "timeout";
            }
        }
        when(when, context) {
            if (when && /^\{\!?_[a-z0-9_]+\}$/i.test(when)) {
                const i = when.indexOf("_");
                const key = when.slice(i, -1);
                const negate = when.includes("!");
                const value = this.state[key];
                const result = negate ? !value : !!value;
                this.log(`${context ? `${context} ` : ""}WHEN ${JSON.stringify(when)} -> ${JSON.stringify(value)} -> ${result}`);
                return result;
            } else if (when !== undefined) this.log(`${context ? `${context} ` : ""}WHEN ${JSON.stringify(when)} -> invalid`);
            return true;
        }
        yield({ active: active , when: when , waitfor: waitfor = "load"  }) {
            if (this.online && (active ?? true)) {
                if (this.when(when, "YIELD")) {
                    this.log(`YIELD ${when} -> ${waitfor}`);
                    return waitfor;
                } else this.log(`YIELD SKIPPED ${when}`);
            } else this.log(`YIELD BYPASSED ${when}`);
            return undefined;
        }
    }
    if (!url1) url1 = window.location.href;
    const { domain: domain , origin: origin1  } = parseUrl(url1);
    if (!domain || !origin1) throw new Error("Invalid url");
    const obj1 = new ExtractContext(root || $, url1 || window.location.href, actions1, {
        params: {},
        log: [],
        errors: [],
        data: null,
        ...state1,
        url: url1,
        domain: domain,
        origin: origin1,
        debug: debug
    });
    try {
        await obj1.execute(obj1.actions, step1);
    } catch (err) {
        if (err instanceof ExtractError) obj1.state.errors.push(err);
        else obj1.error("unknown-error", err instanceof Error ? err.message : "Unknown error.");
    }
    return {
        ...obj1.state,
        ok: obj1.state.errors.length === 0,
        online: obj1.online,
        log: obj1.state.debug ? obj1.state.log.join("\n") : undefined,
        html: obj1.state.debug ? obj1.html() : undefined,
        data: !nodes1 ? unwrapValue(obj1.state.data) : obj1.state.data
    };
} //# sourceMappingURL=index.js.map


async function $4e435298af185d7b$var$onDevToolsMessage(message, port) {
    console.log("DEVTOOLS MESSAGE", message, port);
    if (message.key === "load") {
        const file = "jquery.slim.js";
        await $4e435298af185d7b$var$executeScriptFile(message.tabId, file);
        console.log(`injected ${file}`);
    }
}
function $4e435298af185d7b$var$executeScript(tabId, func, ...args) {
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
function $4e435298af185d7b$var$executeScriptFile(tabId, file) {
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
chrome.runtime.onConnect.addListener((port)=>{
    port.onMessage.addListener($4e435298af185d7b$var$onDevToolsMessage);
    port.onDisconnect.addListener(()=>port.onMessage.removeListener($4e435298af185d7b$var$onDevToolsMessage));
});
/*
//TEST #1 WORKING!
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("MESSAGE", message);
    if (message.key === "submit") {
        const { selector, script } = message;
        sendResponse({
            status: "OK",
            result: `*** ${selector} ***`
        });
        return false;
    }
    else {
        return false;
    }
});
*/ /*
//TEST #2 WORKING!
declare var $: any;
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("MESSAGE", message);
    if (message.key === "submit") {
        const { selector, script } = message;
        executeScript(message.tabId, test, script)
            .then(result => {
                console.log("MESSAGE", message, result);
                sendResponse({ status: "OK", result });
            });
        return true;
    }
    else {
        return false;
    }
    function test() {
        return $("h1").text();
    }    
});
*/ //TEST #3
chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    console.log("MESSAGE", message);
    if (message.key === "submit") {
        const { selector: selector , script: script  } = message;
        $4e435298af185d7b$var$executeScript(message.tabId, $c762165c71c37c57$export$f9380c9a627682d3, script).then((result)=>{
            console.log("MESSAGE", message, result);
            sendResponse({
                status: "OK",
                result: result
            });
        });
        return true;
    } else return false;
});

})();

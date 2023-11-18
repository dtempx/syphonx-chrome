import { Select, SelectQuery } from "syphonx-lib";
import { select } from "./select";
import * as jquery from "./jquery";
import { proxy } from "../lib";

export interface ActiveQueryResult {
    text: string | null;
    html?: string;
    linenums?: number[];
    nodes?: string[];
}

export async function runActiveQuery(query: SelectQuery): Promise<ActiveQueryResult[]> {
    const result: ActiveQueryResult[] = [];
    const q = deconstructQuery(query);
    const obj = await select(q.select);
    const outputs = Object.keys(obj).map(key => obj[key]);
    for (const output of outputs) {
        if (output) {
            const data: ActiveQueryResult = {
                text: null,
                nodes: output.nodes
            };
            if (output.nodes.length > 0) {
                if (output.value !== null)
                    data.text = Array.isArray(output.value) ? output.value.map(value => String(value)).join("\n") : String(output.value);
                const i = outputs.indexOf(output);
                const op = q.ops[i];
                // always populate html output for first op, and for any additional ops that are traversals which change the output html structure
                if (i === 0 || jquery.traversals.includes(op)) {
                    const selector = output.nodes.join(", ");
                    const slice = await sliceHtml(selector);
                    if (slice) {
                        data.html = slice.html;
                        data.linenums = slice.linenums;
                    }
                }
            }
            result.push(data);
        }
        else {
            result.push({ text: null });
        }
    }
    return result;
}

// deconstruct a syphonx query
// example
// ["h1:contains('Education')",["parents","section"],["find","ul > li"]]
// select:
// -> ["h1:contains('Education')"
// -> ["h1:contains('Education')",["parents","section"]
// -> ["h1:contains('Education')",["parents","section"],["find","ul > li"]]
// ops:
// -> ""
// -> "parents"
// -> "find"
function deconstructQuery(query: SelectQuery) {
    const select: Select[] = [];
    const ops: string[] = [];
    const n = query.length - 1;
    let i = 0;
    while (query.length > 0) {
        select.push({ name: `a${n - i++}`, query: [[...query]] });
        ops.push(query.length > 1 ? query.at(-1)![0] : ""); // last op of query example:  ["h1",["extract","/([0=9]+)/"]] --> "extract"   ["h1"] --> ""
        query = query.slice(0, -1) as SelectQuery;
    }
    select.reverse();
    ops.reverse();
    return { select, ops };
}

async function sliceHtml(selector: string) {
    const result = await proxy.sliceHtml({ selector, up: 6, down: 3 });
    //const result = await background.sliceHtml({ selector, up: 6, down: 3 });
    if (result)
        return {
            html: result.html.replace(/sx-select|sx-hover|sx-click/g, "").replace(/(\s+class='\s*')|(\s+class="\s*")/g, "") || "",
            linenums: result.linenums
        };
}

export async function deselectAll(): Promise<void> {
    await proxy.deselectElements("sx-select");
}

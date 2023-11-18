import { inspectedWindow } from "..";
import { queryHtml as _queryHtml } from "./queryHtml";

export async function queryHtml(selector = "html"): Promise<string> {
    const html = await inspectedWindow.call(_queryHtml, selector);
    return html;
}

import { inspectedWindow } from "..";
import { queryHtml as f } from "./queryHtml";

export async function queryHtml(selector = "html"): Promise<string> {
    const html = await inspectedWindow.call(f, selector);
    return html;
}

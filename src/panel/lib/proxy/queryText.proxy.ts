import { inspectedWindow } from "..";
import { queryText as f } from "./queryText";

export async function queryText(selector = "html"): Promise<string> {
    const text = await inspectedWindow.call(f, selector);
    return text;
}

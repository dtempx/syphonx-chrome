import { inspectedWindow } from "..";
import { sliceHtml as f, SliceHtmlOptions, SliceHtmlResult } from "./sliceHtml";

export async function sliceHtml(options: SliceHtmlOptions): Promise<SliceHtmlResult> {
    const result = await inspectedWindow.call(f, options);
    return result;
}

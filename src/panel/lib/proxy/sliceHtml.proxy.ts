import { inspectedWindow } from "..";
import { sliceHtml as _sliceHtml, SliceHtmlOptions, SliceHtmlResult } from "./sliceHtml";

export async function sliceHtml(options: SliceHtmlOptions): Promise<SliceHtmlResult> {
    const result = await inspectedWindow.call(_sliceHtml, options);
    return result;
}

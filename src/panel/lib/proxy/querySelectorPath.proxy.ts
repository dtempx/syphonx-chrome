import { inspectedWindow } from "..";
import { querySelectorPath as _querySelectorPath } from "./querySelectorPath";

export async function querySelectorPath(selector: string): Promise<string[]> {
    const result = await inspectedWindow.call(_querySelectorPath, selector);
    return result;
}

import { inspectedWindow } from "..";
import { querySelectorPath as f } from "./querySelectorPath";

export async function querySelectorPath(selector: string, fullpath = false): Promise<string[]> {
    const result = await inspectedWindow.call(f, selector, fullpath);
    return result;
}

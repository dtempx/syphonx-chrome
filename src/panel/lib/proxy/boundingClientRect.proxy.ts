import { inspectedWindow } from "..";
import { boundingClientRect as f, BoundingRect } from "./boundingClientRect";

export async function boundingClientRect(selector: string): Promise<BoundingRect[]> {
    const result = await inspectedWindow.call(f, selector);
    return result;
}

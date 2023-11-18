import { inspectedWindow } from "..";
import { boundingClientRect as _boundingClientRect, BoundingRect } from "./boundingClientRect";

export async function boundingClientRect(selector: string): Promise<BoundingRect[]> {
    const result = await inspectedWindow.call(_boundingClientRect, selector);
    return result;
}

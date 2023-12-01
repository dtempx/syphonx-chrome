import { inspectedWindow } from "..";
import { queryTracking as f, QueryTrackingOptions } from "./queryTracking";

export async function queryTracking(options: QueryTrackingOptions): Promise<string[]> {
    const result = await inspectedWindow.call(f, options);
    return result;
}

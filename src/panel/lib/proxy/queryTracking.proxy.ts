import { inspectedWindow } from "..";
import { queryTracking as _queryTracking, QueryTrackingOptions } from "./queryTracking";

export async function queryTracking(options: QueryTrackingOptions): Promise<string[]> {
    const result = await inspectedWindow.call(_queryTracking, options);
    return result;
}

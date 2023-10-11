import { inspectedWindow } from ".";
import { script, Select } from "syphonx-lib";

export interface SelectOptions {
    context?: string;
    url?: string;
    vars?: Record<string, unknown>;
}

export interface DataItem {
    key: string;
    value: unknown;
    nodes: string[];
}

export type SelectResult = Record<string, DataItem>;

export async function select(select: Select[], options?: SelectOptions): Promise<SelectResult> {
    const code = `${script}(${JSON.stringify({ select, ...options })})`;
    const { data } = await inspectedWindow.evaluate(code);
    return data;
}

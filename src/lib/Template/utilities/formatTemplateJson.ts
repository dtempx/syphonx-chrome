import { jsonCollapseArray } from "./jsonCollapseArray";

export function formatTemplateJson(text: string): string {
    text = jsonCollapseArray(text, "query");
    text = jsonCollapseArray(text, "snooze");
    return text;
}
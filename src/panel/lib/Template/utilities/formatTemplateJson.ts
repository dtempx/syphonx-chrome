import { jsonCollapseArrayAll } from "./jsonCollapseArrayAll";
import { jsonCollapseQueryAll } from "./jsonCollapseQueryAll";

export function formatTemplateJson(text: string): string {
    text = jsonCollapseQueryAll(text);
    text = jsonCollapseArrayAll(text, "snooze");
    return text;
}
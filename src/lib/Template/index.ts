import * as syphonx from "syphonx-lib";
import { createActionItems, findItem, findNextItem, TemplateItem } from "./TemplateItem";
import { matchBrace } from "./utilities";

export class Template {
    obj: Partial<syphonx.Template>;
    error?: string;
    actions: TemplateItem[];

    constructor(obj: string | syphonx.Template) {
        if (typeof obj === "string") {
            try {
                this.obj = syphonx.parseTemplate(obj);
            }
            catch (err) {
                this.error = err instanceof Error ? err.message : JSON.stringify(err);
                this.obj = {};
            }
        }
        else {
            this.obj = obj;
        }
        this.actions = this.obj.actions instanceof Array ? createActionItems(this.obj.actions) : [];
    }

    addAction(action: string, selected: string): string {
        if (!(this.obj.actions instanceof Array))
            this.obj.actions = [];
        const item = findItem(this.actions, selected);
        const actions = item?.type === "action" ? (item?.parent?.obj as any).actions : this.obj.actions;
        const obj = { [action]: {}} as syphonx.Action;
        actions.push(obj);
        return findNextItem(selected);
    }

    findItem(key: string): TemplateItem | undefined {
        return findItem(this.actions, key);
    }

    run(): Promise<syphonx.ExtractResult> {
        return new Promise<syphonx.ExtractResult>((resolve, reject) => {
            if (typeof chrome === "object" && chrome.devtools) {
                const message = {
                    key: "submit",
                    template: this.obj,
                    tabId: chrome.devtools.inspectedWindow.tabId
                };
                chrome.runtime.sendMessage(message, response => {
                    if (response) {
                        resolve(response.result);
                    }
                });    
            }
            else {
                resolve({ data: { title: "Example Domain", href: "https://www.example.com/" }} as syphonx.ExtractResult);
            }
        });
    }

    json(): string {
        let text = JSON.stringify(this.obj, null, 2) || "";
        let i = text.indexOf(`"$": [\n`);
        while (i >= 0) {
            i = text.indexOf("[", i);
            const j = matchBrace(text, i, "[]");
            if (j > i) {
                text = `${text.substring(0, i)}${text.substring(i, j).replace(/\s*\[/g, "[").replace(/\s*\]/g, "]").replace(/\[\s*"/g, `["`).replace(/",\s*"/g, `","`)}${text.substring(j)}`;
                i = text.indexOf(`"$": [\n`);
            }
            else {
                break;
            }
        }
        return text;    
    }
}

export default Template;
export { TemplateItem } from "./TemplateItem";
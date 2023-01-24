import * as syphonx from "syphonx-lib";
import { TemplateItem } from "./TemplateItem";
import { clone, omit } from "../utilities";
import { createActionItems, findItem, findParentActionCollection, matchBrace, ordinalName } from "./utilities";
import * as background from "../../background-proxy";

interface TemplateObj extends Partial<syphonx.Template> {
    selected?: string;
    file?: string;
}

/**
 * Adapts a template document, adding state and behavior for manipulation by a UI editor.
 */
export class Template {
    obj: TemplateObj;
    children: TemplateItem[];
    error?: string;

    constructor(obj?: string | Partial<syphonx.Template>, file?: string) {
        if (typeof obj === "string") {
            if (obj === "") { //todo: remove this check when lib updated
                this.obj = {};
            }
            else {
                try {
                    this.obj = syphonx.parseTemplate(obj);
                }
                catch (err) {
                    this.error = err instanceof Error ? err.message : JSON.stringify(err);
                    this.obj = {};
                }
            }
        }
        else if (typeof obj === "object") {
            this.obj = clone(obj);
        }
        else {
            this.obj = {};
        }

        this.children = createActionItems(this.obj.actions);
        if (file)
            this.obj.file = file;
    }

    addAction(type: TemplateAddItemType): void {
        if (!(this.obj.actions instanceof Array))
            this.obj.actions = []; // ensure actions is an array

        const item = this.selected();
        const actions = findParentActionCollection(item) || this.obj.actions;

        let action;
        if (type === "break")
            action = { break: {} };
        else if (type === "click")
            action = { click: {} };
        else if (type === "each")
            action = { each: { actions: [] } };
        else if (type === "error")
            action = { error: {} };
        else if (type === "repeat")
            action = { repeat: { actions: [] } };
        else if (type === "select")
            action = { select: [{}] };
        else if (type === "snooze")
            action = { snooze: [1, 2] };
        else if (type === "transform")
            action = { transform: [{}] };
        else if (type === "yield")
            action = { yield: {} };
        else if (type === "waitfor")
            action = { waitfor: {} };
        else
            return;

        actions.push(action);
        this.setSelected(action);
    }

    addSubAction(): void {
        const item = findItem(this.children, this.obj.selected);
        if (item) {
            if (item.type === "action" && item.name === "select") {
                const selectors = item.obj as syphonx.Select[];
                const name = ordinalName(selectors);
                selectors.push({ name });
            }
            else if (item.type === "select" && item.parent) {
                const selectors = item.parent.obj as syphonx.Select[];
                const name = ordinalName(selectors);
                selectors.push({ name });
            }
        }
    }

    canAddSubAction(): boolean {
        const item = findItem(this.children, this.obj.selected);
        if (item) {
            if (item.type === "action" && item.name === "select")
                return true;
            else if (item.type === "select" && item.parent)
                return true;
        }
        return false;
    }

    duplicateItem(item: TemplateItem): void {
        const unit = clone(item.unit);
        item.collection.splice(item.index + 1, 0, unit);
        this.setSelected(unit);
    }

    empty(): boolean {
        return this.children.length === 0;
    }

    file(): string | undefined {
        return this.obj.file;
    }

    findItem(key: string): TemplateItem | undefined {
        return findItem(this.children, key);
    }

    moveItemDown(item: TemplateItem): void {
        if (item.index < item.collection.length - 1) {
            item.collection.splice(item.index, 1);
            item.collection.splice(item.index + 1, 0, item.unit);
            this.setSelected(item.unit);
        }
    }

    moveItemUp(item: TemplateItem): void {
        if (item.index > 0) {
            item.collection.splice(item.index, 1);
            item.collection.splice(item.index - 1, 0, item.unit);
            this.setSelected(item.unit);
        }
    }

    removeItem(item: TemplateItem): void {
        debugger;
        if (item.index >= 0) {
            item.collection.splice(item.index, 1);
            if (item.collection.length > 1) {
                const index = item.index >= item.collection.length ? item.index - 1 : item.index;
                this.setSelected(item.collection[index]);
            }
            else if (item.collection.length === 1) {
                this.setSelected(item.collection[0]);
            }
            else {
                this.setSelected(undefined);
            }
        }
    }

    async run(): Promise<syphonx.ExtractResult> {
        if (background.active) {
            const result = await background.applyTemplate(this.obj as syphonx.Template);
            return result!;
        }
        else {
            return { data: { title: "Example Domain", href: "https://www.example.com/" }} as syphonx.ExtractResult;
        }
    }

    selected(): TemplateItem | undefined {
        const item = findItem(this.children, this.obj.selected);
        return item;
    }

    setSelected(key?: string | unknown): TemplateItem | undefined {
        if (key) {
            if (!(key instanceof TemplateItem))
                this.children = createActionItems(this.obj.actions);
            const item = findItem(this.children, key);
            if (item)
                this.obj.selected = item.key;
            return item;
        }
        else {
            this.obj.selected = undefined;
            return undefined;
        }
    }

    toString(format?: "file"): string {
        const obj = format === "file" ? omit(this.obj, "selected", "file") : this.obj;
        let text = JSON.stringify(obj, null, 2) || "";
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

export type TemplateAddItemType = "break" | "click" | "each" | "error" | "item" | "repeat" | "select" | "snooze" | "transform" | "waitfor" | "yield";
export * from "./TemplateItem";
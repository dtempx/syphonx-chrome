import * as syphonx from "syphonx-lib";
import { TemplateItem } from "./TemplateItem";
import { background, clone, omit } from "..";

import {
    findItem,
    findParentActionCollection,
    formatTemplateJson,
    ordinalName
} from "./utilities/index";

interface TemplateObj extends Partial<syphonx.Template> {
    selected?: string;
}

/**
 * Adapts a template document, adding state and behavior for manipulation by a UI editor.
 */
export class Template {
    obj: TemplateObj;
    children: TemplateItem[];
    error?: string;

    constructor(obj?: string | TemplateObj) {
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

        this.children = this.actions(this.obj.actions);
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
            action = { each: {} };
        else if (type === "error")
            action = { error: {} };
        else if (type === "repeat")
            action = { repeat: {} };
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

        if (item)
            actions.splice(item.index + 1, 0, action);
        else
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

    file(): string {
        const obj = omit(this.obj, "selected");
        let json = JSON.stringify(obj, null, 2) || "";
        json = formatTemplateJson(json);
        return json;
    }

    findItem(key: string): TemplateItem | undefined {
        return findItem(this.children, key);
    }

    json(): string {
        return JSON.stringify(this.obj, null, 2) || "";
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
            try {
                const result = await background.applyTemplate(this.obj as syphonx.Template);
                return result!;
            }
            catch (err) {
                return { errors: [{ message: err instanceof Error ? err.message : JSON.stringify(err) }]} as syphonx.ExtractResult;
            }
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
                this.children = this.actions(this.obj.actions);
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

    private actions(collection: syphonx.Action[] | undefined, parent?: TemplateItem): TemplateItem[] {
        if (collection) {
            const ordinals: Record<string, number> = {};
            return collection.map((action, index) => {
                const [name] = Object.keys(action);
                ordinals[name] = ordinals[name] ? ordinals[name] + 1 : 1;
                const ordinal = ordinals[name];
                const key = parent ? `${parent.key}.${name}.${ordinal}` : `${name}.${ordinal}`;
                const { [name]: obj } = action as Record<string, unknown>; // assign to `obj` the value within `action` with a key of `name`
                const item = new TemplateItem({
                    template: this,
                    key,
                    name,
                    type: "action",
                    icon: name,
                    parent,
                    collection,
                    unit: action,
                    obj,
                    index
                });
                if (name === "select" && obj instanceof Array)
                    item.children = this.selects(obj as syphonx.Select[], item);
                if (name === "each" && (obj as syphonx.Each).actions instanceof Array)
                    item.children = this.actions((obj as syphonx.Each).actions, item);
                if (name === "repeat" && (obj as syphonx.Repeat).actions instanceof Array)
                    item.children = this.actions((obj as syphonx.Repeat).actions, item);
                return item;
            });
        }
        else {
            return [];
        }
    }
    
    private pivot(obj: syphonx.SelectTarget, parent: TemplateItem): TemplateItem {
        const key = `${parent.key}.pivot`;
        const item = new TemplateItem({
            template: this,
            key,
            name: "pivot",
            type: "pivot",
            icon: "pivot",
            parent,
            collection: [],
            unit: obj,
            obj,
            index: 0
        });
        item.children = this.subselect(obj, item);
        return item;
    }
    
    private selects(collection: syphonx.Select[], parent: TemplateItem): TemplateItem[] {
        return collection.map((select, index) => {
            const key = `${parent.key}.${select.name || "?"}`;
            const item = new TemplateItem({
                template: this,
                key,
                name: select.name || "",
                type: "select",
                icon: select.type || "string",
                required: select.required,
                repeated: select.repeated,
                parent,
                collection,
                unit: select,
                obj: select,
                index
            });
            item.children = this.subselect(select, item);
            return item;
        });
    }
    
    private subselect(obj: syphonx.Select, parent: TemplateItem): TemplateItem[] | undefined {
        if (obj.select) {
            return this.selects(obj.select, parent);
        }
        else if (obj.union) {
            return this.union(obj.union, parent);
        }
        else if (obj.pivot) {
            return [this.pivot(obj.pivot, parent)];
        }
    }
    
    private union(collection: syphonx.SelectTarget[], parent: TemplateItem): TemplateItem[] {
        return collection.map((obj, index) => {
            const key = `${parent.key}.union.${index}`;
            const item = new TemplateItem({
                template: this,
                key,
                name: "union",
                type: "union",
                icon: "union",
                parent,
                collection,
                unit: obj,
                obj,
                index
            });
            item.children = this.subselect(obj, item);
            return item;
        });
    }
}

export type TemplateAddItemType = "break" | "click" | "each" | "error" | "item" | "repeat" | "select" | "snooze" | "transform" | "waitfor" | "yield";
export * from "./TemplateItem";
import * as syphonx from "syphonx-lib";
import { clone, omit } from "..";

import { TemplateItem } from "./TemplateItem";
import { Placeholder } from "./Placeholder";

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

        this.children = this.renderActions(this.obj.actions);
    }

    addItem(action?: TemplateAction): boolean {
        if (action) {
            this.addAction(action);
            return true;
        }
        else {
            const added = this.addSelected();
            return added;
        }
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

    selected(): TemplateItem | undefined {
        const item = findItem(this.children, this.obj.selected);
        return item;
    }

    setSelected(key?: string | unknown): TemplateItem | undefined {
        if (key) {
            if (!(key instanceof TemplateItem))
                this.children = this.renderActions(this.obj.actions);
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

    private addAction(type: TemplateAction): void {
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
            action = { select: [{ name: "value1", query: [["h1"]] }] };
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

    private addPlaceholder(placeholder: Placeholder): boolean {
        if (placeholder.parent?.type === "select") {
            const parentObj = placeholder.parent.obj as syphonx.Select;
            const select = { name: "value1" };
            parentObj.select = [select];
            this.setSelected(select);
            return true;
        }
        return false;
    }

    private addSelected(): boolean {
        const item = findItem(this.children, this.obj.selected);
        debugger;
        if (item) {
            if (item.type === "placeholder") {
                return this.addPlaceholder(item);
            }
            else if (item.type === "select" && item.collection) {
                const name = ordinalName(item.collection as Array<{ name: string }>, "value");
                const obj = { name };
                item.collection.push(obj);
                this.setSelected(obj);
                return true;
            }
        }
        return false;
    }

    private renderActions(collection: syphonx.Action[] | undefined, parent?: TemplateItem): TemplateItem[] {
        if (collection) {
            const ordinals: Record<string, number> = {};
            return collection.map((action, index) => {
                const [name] = Object.keys(action);
                ordinals[name] = ordinals[name] ? ordinals[name] + 1 : 1;
                const ordinal = ordinals[name];
                const key = parent ? `${parent.key}.${name}.${ordinal}` : `${name}.${ordinal}`;
                const { [name]: obj } = action as Record<string, unknown>; // assign to `obj` the value within `action` with a key of `name`
                const conditional = typeof obj === "object" && obj !== null ? obj.hasOwnProperty("when") : false;
                const item = new TemplateItem({
                    template: this,
                    key,
                    name,
                    type: "action",
                    icon: name,
                    conditional,
                    parent,
                    collection,
                    unit: action,
                    obj,
                    index
                });

                if (name === "break") {
                    const breakObj = obj as syphonx.Break;
                    item.conditional = !!breakObj.when;
                }
                else if (name === "click") {
                    const clickObj = obj as syphonx.Click;
                    if (!clickObj.query && !clickObj.waitfor)
                        item.alert = "query or waitfor required";
                    item.conditional = !!clickObj.when;
                }
                else if (name === "each") {
                    const eachObj = obj as syphonx.Each;
                    if (eachObj.actions instanceof Array && eachObj.actions.length > 0) {
                        item.children = this.renderActions(eachObj.actions, item);
                    }
                    else {
                        item.children = [new Placeholder(item)];
                        item.alert = "action required";
                    }
                    item.conditional = !!eachObj.when;
                }
                else if (name === "error") {
                    const errorObj = obj as syphonx.Error;
                    if (!errorObj.message) {
                        item.alert = "uninitialized";
                    }
                    item.conditional = !!errorObj.when;
                }
                else if (name === "repeat") {
                    const repeatObj = obj as syphonx.Repeat;
                    if (repeatObj.actions instanceof Array) {
                        item.children = this.renderActions(repeatObj.actions, item);
                    }
                    else {
                        item.children = [new Placeholder(item)];
                        item.alert = "action required";
                    }
                    // item.conditional = !!repeatObj.when; // todo
                }
                else if (name === "select") {
                    const selectObj = obj as syphonx.Select[];
                    if (selectObj instanceof Array && selectObj.length > 0)
                        item.children = this.renderSelect(selectObj as syphonx.Select[], item);
                    item.conditional = item.children ? item.children.some(child => child.conditional) : false;
                }
                else if (name === "snooze") {
                    // nothing to do
                }
                else if (name === "transform") {
                    const transformObj = obj as syphonx.Transform[];
                    // todo: implement transform adapters
                    //item.conditional = item.children ? item.children.some(child => child.conditional) : false;
                }
                else if (name === "waitfor") {
                    const waitforObj = obj as syphonx.WaitFor;
                    if (!waitforObj.query && !waitforObj.select)
                        item.alert = "query or select required";
                    item.conditional = !!waitforObj.when;
                }
                else if (name === "yield") {
                    const yieldObj = obj as syphonx.Yield;
                    item.conditional = !!yieldObj.when;
                }

                if (item.children && item.children.some(child => child.alert)) {
                    item.alert = "One or more child items has an alert.";
                }

                return item;
            });
        }
        else {
            return [];
        }
    }
    
    private renderPivot(obj: syphonx.SelectTarget, parent: TemplateItem): TemplateItem {
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
        item.children = this.renderSubselect(obj, item);
        return item;
    }

    private renderSelect(collection: syphonx.Select[], parent: TemplateItem): TemplateItem[] {
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

            item.children = this.renderSubselect(select, item);
            
            if (!select.query && !select.value && !select.union)
                item.alert = "query or value required";

            if (select.type === "object" && !select.select && !select.pivot && !select.union)
                item.alert = "object type requires additional initialization";

            return item;
        });
    }
    
    private renderSubselect(obj: syphonx.Select, parent: TemplateItem): TemplateItem[] | undefined {
        if (obj.pivot) {
            return [this.renderPivot(obj.pivot, parent)];
        }
        else if (obj.union) {
            return this.renderUnion(obj.union, parent);
        }
        else if (obj.select) {
            return this.renderSelect(obj.select, parent);
        }
        else {
            return undefined;
        }
    }
    
    private renderUnion(collection: syphonx.SelectTarget[], parent: TemplateItem): TemplateItem[] {
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
            item.children = this.renderSubselect(obj, item);
            return item;
        });
    }
}

export type TemplateAction =
    "break" |
    "click" |
    "each" |
    "error" |
    "item" |
    "repeat" |
    "select" |
    "snooze" |
    "transform" |
    "waitfor" |
    "yield";

export * from "./TemplateItem";
import * as syphonx from "syphonx-lib";
import { clone, omit } from "..";
import defaultTemplate from "./default-template.json";

import { TemplateItem } from "./TemplateItem";
import { Placeholder } from "./Placeholder";

import {
    findItem,
    findParentActionCollection,
    formatTemplateJson,
    ordinalName,
    parseTemplate
} from "./utilities/index";

interface TemplateTest {
    url: string;
}

interface AddSelectResult {
    ok: boolean;
    error?: string;
}

interface TemplateObj extends Partial<syphonx.Template> {
    selected?: string;
    tests?: TemplateTest[]
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
            if (obj === "") {
                this.obj = defaultTemplate as TemplateObj;
            }
            else {
                try {
                    this.obj = parseTemplate(obj);
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

    addSelect(select: syphonx.Select): AddSelectResult {
        const item = this.selected();
        let collection: syphonx.Select[] | undefined = undefined;
        if (item?.type === "action" && item?.name === "select") {
            collection = item.obj as syphonx.Select[];
        }
        else if (item?.type === "select") {
            collection = item.collection as syphonx.Select[];
        }

        if (collection) {
            if (!select.name && collection.some(obj => !obj.name))
                return { ok: false, error: "Another unnamed item already exists." };

            if (collection.some(obj => obj.name === select.name))
                return { ok: false, error: `Another item named "${select.name}" already exists.` };

            collection.push(select);
            this.setSelected(select);
            return { ok: true };
        }
        else {
            return { ok: false, error: "Invalid selection." };
        }
    }

    addTest({ url }: { url: string }): boolean {
        if (!(this.obj.tests instanceof Array))
            this.obj.tests = [];
        const test = this.obj.tests.find(obj => obj.url === url);
        if (!test) {
            this.obj.tests.push({ url });
            this.obj.tests.sort((a, b) => a.url.localeCompare(b.url));
        }
        return !test;
    }

    duplicateItem(item: TemplateItem): void {
        if (item.collection && item.index !== undefined) {
            const unit = clone(item.unit);
            item.collection.splice(item.index + 1, 0, unit);
            this.setSelected(unit);
        }
    }

    empty(): boolean {
        return this.children.length === 0;
    }

    file(): string {
        const manifest = chrome.runtime.getManifest();
        const obj = {
            ...omit(this.obj, "selected"),
            toolVersion: manifest.version
        };
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
        if (item.collection && item.index !== undefined && item.index < item.collection.length - 1) {
            item.collection.splice(item.index, 1);
            item.collection.splice(item.index + 1, 0, item.unit);
            this.setSelected(item.unit);
        }
    }

    moveItemUp(item: TemplateItem): void {
        if (item.collection && item.index !== undefined && item.index > 0) {
            item.collection.splice(item.index, 1);
            item.collection.splice(item.index - 1, 0, item.unit);
            this.setSelected(item.unit);
        }
    }

    removeItem(item: TemplateItem): void {
        if (item.collection && item.index !== undefined && item.collection.length > 1 && item.index >= 0) {
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

    removeTest(url: string): boolean {
        if (this.obj.tests instanceof Array) {
            const i = this.obj.tests.findIndex(obj => obj.url === url);
            if (i >= 0)
                this.obj.tests.splice(i, 1);
        }
        return false;
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

    simple(): boolean {
        return this.children.length === 0
            || (this.children.length === 1 && this.children[0].name === "select");
    }

    tests(): TemplateTest[] {
        return this.obj.tests instanceof Array ? this.obj.tests : [];
    }

    private addAction(action: TemplateAction): void {
        if (!(this.obj.actions instanceof Array))
            this.obj.actions = []; // ensure actions is an array

        const item = this.selected();
        const actions = findParentActionCollection(item) || this.obj.actions;

        let obj;
        if (action === "break")
            obj = { break: {} };
        else if (action === "click")
            obj = { click: {} };
        else if (action === "each")
            obj = { each: { actions: [{ select: [{ name: "value1", query: [["h1"]] }]}] } };
        else if (action === "error")
            obj = { error: {} };
        else if (action === "repeat")
            obj = { repeat: { actions: [{ select: [{ name: "value1", query: [["h1"]] }]}] } };
        else if (action === "scroll")
            obj = { scroll: {} };
        else if (action === "select")
            obj = { select: [{ name: "value1", query: [["h1"]] }] };
        else if (action === "snooze")
            obj = { snooze: [1, 2] };
        else if (action === "transform")
            obj = { transform: [{}] };
        else if (action === "yield")
            obj = { yield: {} };
        else if (action === "waitfor")
            obj = { waitfor: {} };
        else
            return;

        if (item && item.index !== undefined)
            actions.splice(item.index + 1, 0, obj);
        else
            actions.push(obj);

        this.setSelected(obj);
    }

    private addPlaceholder(placeholder: Placeholder): boolean {
        const type = placeholder.parent?.type;
        if (type === "select" || type === "union") {
            const parentObj = placeholder.parent!.obj as syphonx.SelectTarget;
            const select = { name: "value1" };
            parentObj.select = [select];
            this.setSelected(select);
            return true;
        }
        return false;
    }

    private addSelected(): boolean {
        const item = findItem(this.children, this.obj.selected);
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
            else if (["transform", "union"].includes(item.type) && item.collection) {
                const obj = {};
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
                    step: parent ? `${parent.step}.${index + 1}` : `${index + 1}`,
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
                    item.active = breakObj.active;
                }
                else if (name === "click") {
                    const clickObj = obj as syphonx.Click;
                    item.children = clickObj.waitfor ? [this.renderClickWaitfor(clickObj.waitfor, item)] : [];
                    if (!clickObj.query && !clickObj.waitfor)
                        item.alert = "query or waitfor required";
                    item.conditional = !!clickObj.when;
                    item.active = clickObj.active;
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
                    if (!eachObj.query)
                        item.alert = "query required";
                    item.conditional = !!eachObj.when;
                    item.active = eachObj.active;
                }
                else if (name === "error") {
                    const errorObj = obj as syphonx.Error;
                    if (!errorObj.message) {
                        item.alert = "uninitialized";
                    }
                    item.conditional = !!errorObj.when;
                    item.active = errorObj.active;
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
                    //item.conditional = !!repeatObj.when; // todo
                    //item.active = repeatObj.active; // todo
                }
                else if (name === "scroll") {
                    const scrollObj = obj as syphonx.Scroll;
                    if (!scrollObj.target && !scrollObj.query) {
                        item.alert = "query required";
                    }
                    item.conditional = !!scrollObj.when;
                }
                else if (name === "select") {
                    const selectObj = obj as syphonx.Select[];
                    item.children = this.renderSelect(selectObj, item);
                    item.conditional = item.children ? item.children.some(child => child.conditional) : false;
                }
                else if (name === "snooze") {
                    // nothing to do
                }
                else if (name === "transform") {
                    const transformObj = obj as syphonx.Transform[];
                    item.children = this.renderTransform(transformObj, item);
                    item.conditional = item.children ? item.children.some(child => child.conditional) : false;
                }
                else if (name === "waitfor") {
                    const waitforObj = obj as syphonx.WaitFor;
                    item.children = this.renderSelect(waitforObj.select as syphonx.Select[], item);
                    if (!waitforObj.query && !waitforObj.select)
                        item.alert = "query or select required";
                    item.conditional = !!waitforObj.when;
                    item.active = waitforObj.active;
                }
                else if (name === "yield") {
                    const yieldObj = obj as syphonx.Yield;
                    item.conditional = !!yieldObj.when;
                    item.active = yieldObj.active;
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

    private renderClickWaitfor(waitfor: syphonx.WaitFor, parent: TemplateItem): TemplateItem {
        const item = new TemplateItem({
            template: this,
            key: `${parent.key}.waitfor`,
            name: "waitfor",
            type: "action",
            icon: "waitfor",
            parent,
            obj: waitfor
        });
        item.children = this.renderSelect(waitfor.select, item);
        return item;
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
        if (!item.children) {
            const parentObj = item.parent?.obj as syphonx.Select;
            if (parentObj?.type === "object") {
                item.children = [new Placeholder(item)];
                item.alert = "select required";
            }
        }

        if (item.children && item.children.some(child => child.alert))
            item.alert = "One or more child items has an alert.";

        return item;
    }

    private renderSelect(collection: syphonx.Select[] | undefined, parent: TemplateItem): TemplateItem[] {
        if (collection instanceof Array)
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
                    index,
                    active: select.active
                });

                item.children = this.renderSubselect(select, item);

                if (!select.name && item.collection!.length > 1)
                    item.alert = "unnamed item must be exclusive";

                if (!select.query && !select.value && !select.union && select.type !== "object")
                    item.alert = "query or value required";

                if (select.type === "object" && !select.select && !select.pivot && !select.union)
                    item.alert = "object type requires additional initialization";

                if (item.children && item.children.some(child => child.alert))
                    item.alert = "One or more child items has an alert.";

                return item;
            });
        else
            return [];
    }
    
    private renderSubselect(obj: syphonx.Select, item: TemplateItem): TemplateItem[] | undefined {
        if (obj.pivot) {
            return [this.renderPivot(obj.pivot, item)];
        }
        else if (obj.union) {
            return this.renderUnion(obj.union, item);
        }
        else if (obj.select) {
            return this.renderSelect(obj.select, item);
        }
        else {
            return undefined;
        }
    }

    private renderTransform(collection: syphonx.Transform[] | undefined, parent: TemplateItem): TemplateItem[] {
        if (collection instanceof Array)
            return collection.map((transform, index) => {
                const key = `${parent.key}.${index}`;
                const item = new TemplateItem({
                    template: this,
                    key,
                    name: "transform",
                    type: "transform",
                    icon: "transform",
                    parent,
                    collection,
                    unit: transform,
                    obj: transform,
                    index,
                    num: index + 1,
                    active: transform.active
                });

                if (!transform.query)
                    item.alert = "query required";

                if (item.children && item.children.some(child => child.alert))
                    item.alert = "One or more child items has an alert.";

                return item;
            });
        else
            return [];
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
                index,
                num: index + 1,
                active: obj.active
            });

            item.children = this.renderSubselect(obj, item);
            if (!item.children) {
                const parentObj = item.parent?.obj as syphonx.Select;
                if (parentObj?.type === "object") {
                    item.children = [new Placeholder(item)];
                    item.alert = "select required";
                }
            }

            if (item.children && item.children.some(child => child.alert))
                item.alert = "One or more child items has an alert.";

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
    "scroll" |
    "snooze" |
    "transform" |
    "waitfor" |
    "yield";

export * from "./TemplateItem";
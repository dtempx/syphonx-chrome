import * as syphonx from "syphonx-lib";
import { clone, evaluateFormula, isFormula, omit } from "..";
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
    tests?: TemplateTest[];
    error?: string;
}

/**
 * Adapts a template document, adding state and behavior for manipulation by a UI editor.
 */
export class Template {
    obj: TemplateObj;
    children: TemplateItem[];

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
                    this.obj = {
                        error: err instanceof Error ? err.message : JSON.stringify(err)
                    };
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

    addItem(action?: TemplateAction, defaultValue = true): boolean {
        if (action) {
            this.addAction(action, defaultValue);
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

    async expandUrl(): Promise<string | undefined> {
        try {
            let url = this.obj.url;
            if (isFormula(url)) {
                const params = this.obj.params || {};
                url = await evaluateFormula(url!.slice(1, -1).trim(), { params });
            }
            return url;
        }
        catch (err) {
            if (err instanceof Error)
                this.obj.error = err.message;
            else if (typeof err === "object" && err !== null && err.hasOwnProperty("value"))
                this.obj.error = (err as { value: string }).value;
            else
                this.obj.error = JSON.stringify(err);
        }
    }

    file(): string {
        const manifest = chrome.runtime.getManifest();
        const obj = {
            ...omit(this.obj, "selected", "error"),
            toolVersion: undefined,
            editorVersion: manifest.version
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

    private addAction(action: TemplateAction, defaultValue = true): void {
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
            obj = { each: { actions: [{ select: [{ name: "value1", query: [["h1"]] }] }] } };
        else if (action === "error")
            obj = { error: {} };
        else if (action === "goback")
            obj = { goback: {} };
        else if (action === "locator")
            obj = { locator: [{}] };
        else if (action === "navigate")
            obj = { navigate: {} };
        else if (action === "reload")
            obj = { reload: {} };
        else if (action === "repeat")
            obj = { repeat: { actions: [{ select: [{ name: "value1", query: [["h1"]] }] }] } };
        else if (action === "screenshot")
            obj = { screenshot: {} };
        else if (action === "scroll")
            obj = { scroll: {} };
        else if (action === "select")
            obj = !defaultValue ? { select: [] } : { select: [{ name: "value1", query: [["h1"]] }] };
        else if (action === "snooze")
            obj = { snooze: [1, 2] };
        else if (action === "switch")
            obj = { switch: [{ actions: [{ select: [{ name: "value1", query: [["h1"]] }] }] }] };
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
            else if (item.type === "case" && item.collection) {
                const obj = { actions: [{ select: [{ name: "value1", query: [["h1"]] }] }] };
                item.collection.push(obj);
                this.setSelected(obj);
                return true;
            }
            else if (["locator", "transform", "union"].includes(item.type) && item.collection) {
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
                }
                else if (name === "click") {
                    const clickObj = obj as syphonx.Click;
                    item.children = clickObj.waitfor ? [this.renderClickWaitfor(clickObj.waitfor, item)] : [];
                    if (!clickObj.query && !clickObj.waitfor)
                        item.alert = "A query or waitfor must be specified.";
                    item.conditional = !!clickObj.when;
                }
                else if (name === "each") {
                    const eachObj = obj as syphonx.Each;
                    if (eachObj.actions instanceof Array && eachObj.actions.length > 0) {
                        item.children = this.renderActions(eachObj.actions, item);
                    }
                    else {
                        item.children = [new Placeholder(item)];
                        item.alert = "At lest one action must be specified.";
                    }
                    if (!eachObj.query)
                        item.alert = "A query must be specified.";
                    item.conditional = !!eachObj.when;
                }
                else if (name === "error") {
                    const errorObj = obj as syphonx.Error;
                    if (!errorObj.message)
                        item.alert = "A message must be specified.";
                    item.conditional = !!errorObj.when;
                }
                else if (name === "goback") {
                    const gobackObj = obj as syphonx.GoBack;
                    item.conditional = !!gobackObj.when;
                }
                else if (name === "locator") {
                    const locatorObj = obj as syphonx.Locator[];
                    item.children = this.renderLocator(locatorObj, item);
                    item.conditional = item.children ? item.children.some(child => child.conditional) : false;
                }
                else if (name === "navigate") {
                    const navigateObj = obj as syphonx.Navigate;
                    if (!navigateObj.url)
                        item.alert = "A url must be specified.";
                    item.conditional = !!navigateObj.when;
                }
                else if (name === "reload") {
                    const reloadObj = obj as syphonx.Reload;
                    item.conditional = !!reloadObj.when;
                }
                else if (name === "repeat") {
                    const repeatObj = obj as syphonx.Repeat;
                    if (repeatObj.actions instanceof Array) {
                        item.children = this.renderActions(repeatObj.actions, item);
                    }
                    else {
                        item.children = [new Placeholder(item)];
                        item.alert = "At least one action must be specified.";
                    }
                    //item.conditional = !!repeatObj.when; // todo
                    //item.active = repeatObj.active; // todo
                }
                else if (name === "scroll") {
                    const scrollObj = obj as syphonx.Scroll;
                    if (!scrollObj.target && !scrollObj.query) {
                        item.alert = "A query must be specified.";
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
                else if (name === "switch") {
                    const switchObj = obj as syphonx.Switch[];
                    item.children = this.renderSwitch(switchObj, item);
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
                        item.alert = "A query or select must be specified.";
                    item.conditional = !!waitforObj.when;
                }
                else if (name === "yield") {
                    const yieldObj = obj as syphonx.Yield;
                    item.conditional = !!yieldObj.when;
                }

                if (item.children && item.children.some(child => child.alert)) {
                    item.alert = "There is a problem with one or more subordinate items. Expand this item to find and resolve the problem.";
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

    private renderLocator(collection: syphonx.Locator[] | undefined, parent: TemplateItem): TemplateItem[] {
        if (collection instanceof Array)
            return collection.map((locator, index) => {
                const key = `${parent.key}.${index}`;
                const item = new TemplateItem({
                    template: this,
                    key,
                    name: "locator",
                    type: "locator",
                    icon: "locator",
                    parent,
                    collection,
                    unit: locator,
                    obj: locator,
                    index,
                    num: index + 1
                });

                if (!locator.name)
                    item.alert = "A name must be specified.";
                else if (!locator.selector)
                    item.alert = "A selector must be specified.";
                else if (!locator.method)
                    item.alert = "A method must be specified.";

                return item;
            });
        else
            return [];
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
                item.alert = "A sub-select must be specified.";
            }
        }

        if (item.children && item.children.some(child => child.alert))
            item.alert = "There is a problem with one or more subordinate items. Expand this item to find and resolve the problem.";

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
                    index
                });

                item.children = this.renderSubselect(select, item);

                if (!select.name && item.collection!.length > 1)
                    item.alert = "An unnamed item must be the only item within the group. Either remove this item or remove all of the other items.";

                if (!select.query && !select.value && !select.union && select.type !== "object")
                    item.alert = "A query or value must be specified.";

                if (select.type === "object" && !select.select && !select.pivot && !select.union)
                    item.alert = "Choose whether to create a sub-select or a union.";

                if (item.children && item.children.some(child => child.alert))
                    item.alert = "There is a problem with one or more subordinate items. Expand this item to find and resolve the problem.";

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

    private renderSwitch(collection: syphonx.Switch[] | undefined, parent: TemplateItem): TemplateItem[] {
        if (collection instanceof Array)
            return collection.map((switchObj, index) => {
                const key = `${parent.key}.${index}`;
                const item = new TemplateItem({
                    template: this,
                    key,
                    name: "case",
                    type: "case",
                    icon: "case",
                    step: parent ? `${parent.step}.${index + 1}` : `${index + 1}`,
                    parent,
                    collection,
                    unit: switchObj,
                    obj: switchObj,
                    index,
                    num: index + 1
                });

                if (switchObj.actions instanceof Array) {
                    item.children = this.renderActions(switchObj.actions, item);
                }
                else {
                    item.children = [new Placeholder(item)];
                    item.alert = "At least one action must be specified.";
                }

                //if (!obj.query && (collection.length === 1 || collection.indexOf(obj) !== collection.length - 1))
                    //item.alert = "A query must be specified.";

                if (item.children && item.children.some(child => child.alert))
                    item.alert = "One or more child items has an alert.";

                return item;
            });
        else
            return [];
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
                    num: index + 1
                });

                if (!transform.query)
                    item.alert = "A query must be specified.";

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
                num: index + 1
            });

            item.children = this.renderSubselect(obj, item);
            if (!item.children) {
                const parentObj = item.parent?.obj as syphonx.Select;
                if (parentObj?.type === "object") {
                    item.children = [new Placeholder(item)];
                    item.alert = "A sub-select must be specified.";
                }
            }

            if (item.children && item.children.some(child => child.alert))
                item.alert = "There is a problem with one or more subordinate items. Expand this item to find and resolve the problem.";

            return item;
        });
    }
}

export type TemplateAction =
      "break"
    | "click"
    | "each"
    | "error"
    | "goback"
    | "item"
    | "locator"
    | "navigate"
    | "reload"
    | "repeat"
    | "screenshot"
    | "scroll"
    | "select"
    | "snooze"
    | "switch"
    | "transform"
    | "waitfor"
    | "yield";

export * from "./TemplateItem";
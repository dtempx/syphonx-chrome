import * as syphonx from "syphonx-lib";
import { TemplateItem } from "./TemplateItem";
import { clone } from "../utilities";
import { createActionItems, findItem, firstObj, matchBrace, newName } from "./utilities";
import * as background from "../../background-proxy";

export class Template {
    obj: Partial<syphonx.Template>;
    error?: string;
    children: TemplateItem[];
    selected: string;
    file?: string;

    constructor(obj?: string | Partial<syphonx.Template>, selected?: string, file?: string) {
        if (typeof obj === "string") {
            try {
                this.obj = syphonx.parseTemplate(obj);
            }
            catch (err) {
                this.error = err instanceof Error ? err.message : JSON.stringify(err);
                this.obj = {};
            }
        }
        else if (typeof obj === "object") {
            this.obj = obj;
        }
        else {
            this.obj = {};
        }
        if (!(this.obj.actions instanceof Array))
            this.obj.actions = []; // ensure actions is an array
        this.selected = selected || "";
        this.file = file;
        this.children = this.actions();
    }

    actions(): TemplateItem[] {
        return this.obj.actions instanceof Array ? createActionItems(this.obj.actions) : [];
    }

    addAction(type: TemplateAddItemType): void {
        const item = findItem(this.children, this.selected);
        const actions = this.findItemActions(item);
        if (type === "break") {
            actions.push({ break: {} });
        }
        else if (type === "click") {
            const click = {} as syphonx.Click;
            actions.push({ click });
        }
        else if (type === "each") {
            const each = {} as syphonx.Each;
            each.actions = [];
            actions.push({ each });
        }
        else if (type === "error") {
            const error = {} as syphonx.Error;
            actions.push({ error });
        }
        else if (type === "repeat") {
            const repeat = { actions: [] } as syphonx.Repeat;
            actions.push({ repeat });
        }
        else if (type === "select") {
            const select = [{}] as syphonx.Select[];
            actions.push({ select });
        }
        else if (type === "snooze") {
            const snooze = [1, 2] as syphonx.Snooze;
            actions.push({ snooze });
        }
        else if (type === "transform") {
            const transform = [{}] as syphonx.Transform[];
            actions.push({ transform });
        }
        else if (type === "yield") {
            actions.push({ yield: {} });
        }
        else if (type === "waitfor") {
            actions.push({ waitfor: {} });
        }
        //this.selected = this.findObj(obj) || "";
    }

    addSubAction(): void {
        const item = findItem(this.children, this.selected);
        if (item) {
            if (item.type === "action" && item.name === "select") {
                const selectors = item.obj as syphonx.Select[];
                const name = newName(selectors);
                selectors.push({ name });
            }
            else if (item.type === "select" && item.parent) {
                const selectors = item.parent.obj as syphonx.Select[];
                const name = newName(selectors);
                selectors.push({ name });
            }
        }
    }

    canAddSubAction(): boolean {
        const item = findItem(this.children, this.selected);
        if (item) {
            if (item.type === "action" && item.name === "select")
                return true;
            else if (item.type === "select" && item.parent)
                return true;
        }
        return false;
    }

    clone(): Template {
        return new Template(clone(this.obj), this.selected, this.file);
    }

    empty(): boolean {
        return this.children.length === 0;
    }

    findItem(key: string): TemplateItem | undefined {
        return findItem(this.children, key);
    }

    private findItemActions(item: TemplateItem | undefined): syphonx.Action[] {
        if (!item) {
            return this.obj.actions!;
        }
        else if (item.type === "action" && item.name === "repeat") {
            const repeat = item.obj as syphonx.Repeat;
            if (!(repeat.actions instanceof Array))
                repeat.actions = [];
            return repeat.actions;
        }
        else if (item.type === "action" && item.name === "each") {
            const each = item.obj as syphonx.Each;
            if (!(each.actions instanceof Array))
                each.actions = [];
            return each.actions;
        }
        else {
            return this.obj.actions!;
        }
    }

    private findObj(obj: unknown): string | undefined {
        const actions = this.actions();
        const item = findItem(actions, obj);
        return item?.key;
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

    moveItemDown(item: TemplateItem): Template {
        debugger;
        const i = item.collection.findIndex(subitem => firstObj(subitem) === item.obj || (subitem as Record<string, string>).name === item.name); // todo
        if (i < item.collection.length - 1) {
            item.collection.splice(i, 1);
            item.collection.splice(i + 1, 0, item);
        }
        return this;
    }

    moveItemUp(item: TemplateItem): Template {
        debugger;
        const i = item.collection.findIndex(subitem => firstObj(subitem) === item.obj || (subitem as Record<string, string>).name === item.name); // todo
        if (i > 0) {
            item.collection.splice(i, 1);
            item.collection.splice(i - 1, 0, item);
        }
        return this;
    }

    removeItem(item: TemplateItem): Template {
        debugger;
        const i = item.collection.findIndex(subitem => firstObj(subitem) === item.obj || (subitem as Record<string, string>).name === item.name); // todo
        if (i >= 0) {
            item.collection.splice(i, 1);
            const obj = firstObj(item.collection[i] || item.collection[0]);
            this.selected = this.findObj(obj) || "";
        }
        return this;
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

    selectedItem(): TemplateItem | undefined {
        return findItem(this.children, this.selected);
    }
}

export type TemplateAddItemType = "break" | "click" | "each" | "error" | "item" | "repeat" | "select" | "snooze" | "transform" | "waitfor" | "yield";
export * from "./TemplateItem";
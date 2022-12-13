import * as syphonx from "syphonx-lib";
import { TemplateItem } from "./TemplateItem";

export function clone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

export function createActionItems(actions: syphonx.Action[], parent?: TemplateItem): TemplateItem[] {
    const n: Record<string, number> = {};
    return actions.map(action => {
        const [name] = Object.keys(action);
        n[name] = n[name] ? n[name] + 1 : 1;
        const key = parent ? `${parent.key}.${name}.${n[name]}` : `${name}.${n[name]}`;
        const { [name]: obj } = action as Record<string, unknown>;
        const item: TemplateItem = {
            key,
            name,
            type: "action",
            icon: name,
            obj,
            parent,
            collection: actions
        };
        if (name === "select" && obj instanceof Array)
            item.children = createSelectItems(obj as syphonx.Select[], item);
        return item;
    });
}

function createSelectItems(obj: syphonx.Select[], parent: TemplateItem): TemplateItem[] {
    return obj.map(select => {
        const key = `${parent.key}.${select.name}`;
        return {
            key,
            name: select.name || "",
            type: "select",
            icon: select.type || "string",
            required: select.required,
            repeated: select.repeated,
            obj: select,
            parent,
            collection: obj
        };
    });
}

export function findItem(items: TemplateItem[], key: string | unknown): TemplateItem | undefined {
    for (const item of items) {
        if (item.key === key || item.obj === key)
            return item;
        if (item.children) {
            const subitem = findItem(item.children, key);
            if (subitem)
                return subitem;
        }
    }
}

export function findNextItem(key: string): string {
    const i = key.lastIndexOf(".");
    const n = parseInt(key.slice(i + 1));
    return `${key.slice(0, i)}${n}`;
}

export function firstObj(obj: unknown): unknown {
    if (typeof obj === "object" && obj !== null) {
        const [key] = Object.keys(obj);
        return (obj as Record<string, unknown>)[key];
    }
}

export function matchBrace(text: string, i: number, token: string): number {
    let n = 0;
    while (i++ < text.length) {
        if (text[i] === token[1] && --n < 0) {
            return i + 1;
        }
        else if (text[i] === token[0]) {
            n += 1;
        }
    }
    return -1;
}
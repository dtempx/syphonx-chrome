import * as syphonx from "syphonx-lib";
import { TemplateItem } from "./TemplateItem";

export function createActionItems(actions: syphonx.Action[] | undefined, parent?: TemplateItem): TemplateItem[] {
    if (actions) {
        const ordinals: Record<string, number> = {};
        return actions.map((action, index) => {
            const [name] = Object.keys(action);
            ordinals[name] = ordinals[name] ? ordinals[name] + 1 : 1;
            const ordinal = ordinals[name];
            const key = parent ? `${parent.key}.${name}.${ordinal}` : `${name}.${ordinal}`;
            const { [name]: obj } = action as Record<string, unknown>; // assign to `obj` the value within `action` with a key of `name`
            const item = new TemplateItem({
                key,
                name,
                type: "action",
                icon: name,
                parent,
                collection: actions,
                unit: action,
                obj,
                index
            });
            if (name === "select" && obj instanceof Array)
                item.children = createSelectItems(obj as syphonx.Select[], item);
            return item;
        });
    }
    else {
        return [];
    }
}

function createSelectItems(obj: syphonx.Select[], parent: TemplateItem): TemplateItem[] {
    return obj.map((select, index) => {
        const key = `${parent.key}.${select.name}`;
        return new TemplateItem({
            key,
            name: select.name || "",
            type: "select",
            icon: select.type || "string",
            required: select.required,
            repeated: select.repeated,
            parent,
            collection: obj,
            unit: select,
            obj: select,
            index
        });
    });
}

export function findItem(items: TemplateItem[], key: string | TemplateItem | unknown): TemplateItem | undefined {
    for (const item of items) {
        if (item === key || item.key === key || item.unit === key || item.obj === key)
            return item;
        if (item.children) {
            const subitem = findItem(item.children, key);
            if (subitem)
                return subitem;
        }
    }
}

export function findParentActionCollection(item: TemplateItem | undefined): unknown[] | undefined {
    if (item?.type === "action")
        return item.collection;
    else if (item?.parent)
        return findParentActionCollection(item.parent);
    else
        return undefined;
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

export function ordinalName(list: Array<{ name?: string }>, basename = "new") {
    for (let n = 1; n <= 100; ++n) {
        const name = `${basename}${n}`;
        if (!list.some(obj => obj.name === name))
            return name;
    }
    return "";
}
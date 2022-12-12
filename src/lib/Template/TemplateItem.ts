import * as syphonx from "syphonx-lib";

export interface TemplateItem {
    key: string;
    name: string;
    type: string;
    icon: string;
    required?: boolean;
    repeated?: boolean;
    obj: unknown;
    parent?: TemplateItem;
    children?: TemplateItem[];
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
            parent
        };
        if (name === "select")
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
            parent
        };
    });
}

export function findItem(items: TemplateItem[], key: string): TemplateItem | undefined {
    for (const item of items) {
        if (item.key === key)
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
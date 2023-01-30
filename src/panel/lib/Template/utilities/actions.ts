import * as syphonx from "syphonx-lib";
import { TemplateItem } from "../TemplateItem";

export function actions(actions: syphonx.Action[] | undefined, parent?: TemplateItem): TemplateItem[] {
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
                item.children = selects(obj as syphonx.Select[], item);
            return item;
        });
    }
    else {
        return [];
    }
}

function pivot(obj: syphonx.SelectTarget, parent: TemplateItem): TemplateItem {
    const key = `${parent.key}.pivot`;
    const item = new TemplateItem({
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
    item.children = subselect(obj, item);
    return item;
}

function selects(obj: syphonx.Select[], parent: TemplateItem): TemplateItem[] {
    return obj.map((select, index) => {
        const key = `${parent.key}.${select.name || "?"}`;
        const item = new TemplateItem({
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
        item.children = subselect(select, item);
        return item;
    });
}

function subselect(obj: syphonx.Select, parent: TemplateItem): TemplateItem[] | undefined {
    if (obj.select) {
        return selects(obj.select, parent);
    }
    else if (obj.union) {
        return union(obj.union, parent);
    }
    else if (obj.pivot) {
        return [pivot(obj.pivot, parent)];
    }
}

function union(union: syphonx.SelectTarget[], parent: TemplateItem): TemplateItem[] {
    return union.map((obj, index) => {
        const key = `${parent.key}.union.${index}`;
        const item = new TemplateItem({
            key,
            name: "union",
            type: "union",
            icon: "union",
            parent,
            collection: union,
            unit: obj,
            obj,
            index
        });
        item.children = subselect(obj, item);
        return item;
    });
}
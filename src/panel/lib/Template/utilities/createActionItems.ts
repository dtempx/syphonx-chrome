import * as syphonx from "syphonx-lib";
import { TemplateItem } from "../TemplateItem";

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
        const key = `${parent.key}.${select.name || "?"}`;
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
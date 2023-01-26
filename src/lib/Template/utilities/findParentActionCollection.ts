import { TemplateItem } from "../TemplateItem";

export function findParentActionCollection(item: TemplateItem | undefined): unknown[] | undefined {
    if (item?.type === "action")
        return item.collection;
    else if (item?.parent)
        return findParentActionCollection(item.parent);
    else
        return undefined;
}
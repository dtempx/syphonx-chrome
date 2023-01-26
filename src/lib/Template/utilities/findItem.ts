import { TemplateItem } from "../TemplateItem";

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
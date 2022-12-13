export type TemplateItemType = "action" | "click" | "select" | "waitfor";

export interface TemplateItem {
    key: string;
    name: string;
    type: TemplateItemType;
    icon: string;
    required?: boolean;
    repeated?: boolean;
    obj: unknown;
    parent?: TemplateItem;
    children?: TemplateItem[];
    collection: unknown[];
}
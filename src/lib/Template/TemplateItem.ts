export type TemplateItemType = "action" | "select";

export interface TemplateItem {
    key: string;
    name: string;
    type: TemplateItemType;
    icon: string;
    index: number;
    required?: boolean;
    repeated?: boolean;
    obj: unknown;
    parent?: TemplateItem;
    children?: TemplateItem[];
    collection: unknown[];
}
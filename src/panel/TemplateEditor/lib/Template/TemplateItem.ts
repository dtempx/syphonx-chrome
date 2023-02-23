import { Template } from "./Template";

export type TemplateItemType = "action" | "pivot" | "select" | "union" | "placeholder";

/**
 * Adapts an item within a template document, adding state and behavior for manipulation by a UI editor.
 */
export class TemplateItem {
    /**
     * A reference to the template wrapper that contains this template item wrapper.
     */
    template: Template;
  
    /**
     * A unique identifier for a template object within the template document.
     */
    key: string;

    /**
     * Determines the type of the adapter item.
     */
    type: TemplateItemType;

    /**
      * Display name for the object in the UI editor.
      * 
      * @description
      * In the case of an `action` type this is an action name like `select`, `click`, `waitfor`, etc.
      * In the case of a `select` type this is the name assigned by the user for the selector.
      *
    */
    name: string;

    /**
     * Display icon for this object in the UI editor.
     */
    icon: string;

    /**
     * Step number of an action within a collection.
     */
    step?: string;

    /**
     * Number of a union or transform item within a collection.
     */
    num?: number;

    /**
     * Indicates whether item specifies a when condition.
     */    
    conditional?: boolean;

    /**
     * Indicates if item is in an invalid state.
     */
    alert?: string;

    /**
     * Indicates whether item is required, used only in the case of a `select` type.
     */
    required?: boolean;

    /**
     * Indicates whether item is repeated, used only in the case of a `select` type.
     */
    repeated?: boolean;

    /**
     * Reference to the parent adapter item for the object.
     */
    parent?: TemplateItem;

    /**
     * A list of editable adapter items that are subordinate to this adapter item.
     */
    children?: TemplateItem[];

    /**
     * A collection contains set of unit.
     * 
     * @description
     * An action collection contains a set of action units like `{"actions": [{"select": [...]},{"click",{...}}, ...]}`.
     * A selector collection contains a set of selector units like `{"select": [{"query":{...}}, ...]}`.
     */
    collection?: unknown[];

    /**
     * A unit is an object within an collection.
     * 
     * @description
     * An action unit within an action collection like `{"select": [...]}` or `{"click": {...}}` or `{"waitfor": {...}}`.
     * A selector unit within a selector collection.
     */
    unit?: unknown;

    /**
     * An obj is a reference to the inner object of the unit, for example the [...] in {"select":[...]} or the {...} in {"click":{...}}.
     * 
     * @description
     * In the case of an action unit, `unit` refers to `{"click":{...}}` and `obj` refers to `{...}`.
     * In the case of a selector `unit` and `obj` refer to the same object.
     */
    obj?: unknown;

    /**
     * Index of the unit within a collection.
     */
    index?: number;

    /**
     * Indicates whether the item is active or disabled.
     */
    active?: boolean;

    constructor(item: TemplateItem) {
        this.template = item.template;
        this.key = item.key;
        this.type = item.type;
        this.name = item.name;
        this.icon = item.icon;
        this.alert = item.alert;
        this.required = item.required;
        this.repeated = item.repeated;
        this.parent = item.parent;
        this.children = item.children;
        this.collection = item.collection;
        this.unit = item.unit;
        this.obj = item.obj;
        this.index = item.index;
        this.step = item.step;
        this.num = item.num;
        this.active = item.active;
    }
}
import { TemplateItem } from "./Template";

export class Placeholder extends TemplateItem {
    constructor(parent: TemplateItem) {
        super({
            template: parent.template,
            key: `${parent.key}.?`,
            name: "(add sub-item)",
            type: "placeholder",
            icon: "placeholder",
            parent,
            collection: [],
            unit: undefined,
            obj: undefined,
            index: 0    
        });
    }
}
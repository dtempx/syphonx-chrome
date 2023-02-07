import { TemplateItem } from "./Template";

export class Placeholder extends TemplateItem {
    constructor(parent: TemplateItem) {
        super({
            template: parent.template,
            key: `${parent.key}.?`,
            name: `(add ${parent.name} action)`,
            type: "placeholder",
            icon: "placeholder",
            parent,
            collection: undefined,
            unit: undefined,
            obj: undefined,
            index: 0    
        });
    }
}
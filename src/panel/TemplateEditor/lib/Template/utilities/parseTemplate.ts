import * as syphonx from "syphonx-lib";

export function parseTemplate(text: string): syphonx.Template {
    const template = syphonx.parseTemplate(text);
    traverseObject(template, (value, key) => {
        if (key === "query" && JSON.stringify(value) === "[[]]")
            return undefined;
        else
            return value;
    });
    return template;
}

function traverseObject(obj: any, replacer: (value: any, key: string) => any): void {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = replacer(obj[key], key);
            if (value !== obj[key])
                obj[key] = value;
            if (typeof value === "object" && value !== null && !(value instanceof Date))
                traverseObject(value, replacer);
        }
    }
}

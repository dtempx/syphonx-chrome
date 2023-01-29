import { jsonMatchClosingBraceAt } from "./jsonMatchClosingBraceAt";

export function jsonCollapseArrayAll(json: string, key: string): string {
    let i = json.indexOf(`"${key}": [\n`);
    while (i >= 0) {
        i = json.indexOf("[", i);
        const j = jsonMatchClosingBraceAt(json, i, "[]");
        if (j > i) {
            json = `${json.substring(0, i)}${JSON.stringify(JSON.parse(json.substring(i, j)))}${json.substring(j)}`;
            i = json.indexOf(`"${key}": [\n`, j);
        }
        else {
            break;
        }
    }
    return json;
}
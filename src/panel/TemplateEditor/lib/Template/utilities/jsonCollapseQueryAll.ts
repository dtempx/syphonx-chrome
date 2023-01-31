import { jsonMatchClosingBraceAt } from "./jsonMatchClosingBraceAt";
import { jsonWhitespaceAt } from "./jsonWhitespaceAt";

export function jsonCollapseQueryAll(json: string): string {
    let i = json.indexOf(`"query": [\n`);
    while (i >= 0) {
        i = json.indexOf("[", i);
        const j = jsonMatchClosingBraceAt(json, i, "[]");
        if (j > i) {
            const array: unknown[] = JSON.parse(json.substring(i, j));
            let replace;
            if (array.length < 2) {
                replace = JSON.stringify(array);
            }
            else {
                const whitespace = jsonWhitespaceAt(json, i);
                replace = "[\n" + array.map(obj => whitespace + "  " + JSON.stringify(obj)).join(",\n") + "\n" + whitespace + "]";
            }
            json = `${json.substring(0, i)}${replace}${json.substring(j)}`;
            i = json.indexOf(`"query": [\n`, i + replace.length);
        }
        else {
            break;
        }
    }
    return json;
}
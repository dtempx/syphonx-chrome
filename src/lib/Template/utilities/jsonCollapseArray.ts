import { matchBrace } from "./matchBrace";

export function jsonCollapseArray(text: string, key: string): string {
    let i = text.indexOf(`"${key}": [\n`);
    while (i >= 0) {
        i = text.indexOf("[", i);
        const j = matchBrace(text, i, "[]");
        if (j > i) {
            text = `${text.substring(0, i)}${JSON.stringify(JSON.parse(text.substring(i, j)))}${text.substring(j)}`;
            i = text.indexOf(`"${key}": [\n`, j);
        }
        else {
            break;
        }
    }
    return text;
}
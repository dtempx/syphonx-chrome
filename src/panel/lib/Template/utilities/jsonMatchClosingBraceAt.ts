import { jsonMatchClosingQuoteAt } from "./jsonMatchClosingQuoteAt";

export function jsonMatchClosingBraceAt(json: string, i: number, token: string): number {
    if (i >= 0 && i < json.length && json[i] === token[0]) {
        let n = 0;
        while (i >= 0 && i++ < json.length) {
            if (json[i] === token[1] && --n < 0) {
                return i + 1;
            }
            else if (json[i] === token[0]) {
                n += 1;
            }
            else if (json[i] === `"`) {
                i = jsonMatchClosingQuoteAt(json, i);
            }
        }
    }
    return -1;
}
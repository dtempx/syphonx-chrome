export function jsonMatchClosingQuoteAt(json: string, i: number): number {
    if (i >= 0 && i < json.length && json[i] === `"`) {
        while (i++ < json.length) {
            if (json[i] === `"`) {
                return i + 1;
            }
            else if (json[i] === "\\") {
                i += 1;
            }
        }
    }
    return -1;
}
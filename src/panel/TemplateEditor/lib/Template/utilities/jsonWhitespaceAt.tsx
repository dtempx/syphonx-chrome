export function jsonWhitespaceAt(json: string, i: number): string {
    let m = -1;
    let n = -1;
    while (--i >= 0) {
        if (json[i] === " ") {
            n = n === -1 ? i + 1 : n;
        }
        else if (json[i] === "\n") {
            m = i + 1;
            break;
        }
        else if (n !== -1) {
            n = -1;
        }
    }
    return m >= 0 && n > m ? json.substring(m, n) : "";
}
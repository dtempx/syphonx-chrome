export function matchBrace(text: string, i: number, token: string): number {
    let n = 0;
    while (i++ < text.length) {
        if (text[i] === token[1] && --n < 0) {
            return i + 1;
        }
        else if (text[i] === token[0]) {
            n += 1;
        }
    }
    return -1;
}
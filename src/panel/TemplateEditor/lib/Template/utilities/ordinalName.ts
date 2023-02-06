export function ordinalName(list: Array<{ name?: string }>, basename: string): string {
    for (let n = 1; n <= 100; ++n) {
        const name = `${basename}${n}`;
        if (!list.some(obj => obj.name === name))
            return name;
    }
    return "";
}
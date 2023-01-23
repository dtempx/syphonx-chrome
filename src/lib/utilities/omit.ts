export function omit(obj: {}, ...keys: string[]): {} {
    const output: Record<string, unknown> = {};
    for (const key of Object.keys(obj).filter(key => !keys.includes(key)))
        output[key] = (obj as Record<string, unknown>)[key];
    return output;
}
export function resolve(...segments: string[]): string {
    let result = segments[0];
    for (const segment of segments.slice(1)) {
        if (result.endsWith("/") && segment.startsWith("/"))
            result += segment.slice(1);
        else if (result.endsWith("/") || segment.startsWith("/"))
            result += segment;
        else
            result += "/" + segment;
    }
    return result;
}
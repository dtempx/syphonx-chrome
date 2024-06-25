export function parseDomain(url: string): string {
    try {
        const hostname = new URL(url).hostname;
        return hostname.replace(/^www\./, "");
    }
    catch (err) {
        return "";
    }
}

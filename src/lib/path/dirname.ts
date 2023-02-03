export function dirname(path: string): string {
    if (!path) {
        return "";
    }
    else {
        const i = path.lastIndexOf("/");
        return i >= 0 ? path.slice(0, i + 1) : "";    
    }
}
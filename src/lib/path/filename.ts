export function filename(path: string): string {
    if (!path) {
        return "";
    }
    else if (path.endsWith("/")) {
        return path.slice(path.slice(0, -1).lastIndexOf("/") + 1, -1);
    }
    else {
        const i = path.lastIndexOf("/");
        return i >= 0 ? path.slice(i + 1) : path;
    }
}
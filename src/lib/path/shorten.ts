/**
 * Shortens a file path for display such that the length does not exceed a specified maximum.
 * @param name The input file path.
 * @returns The shortened file path.
 * @example shorten("/very/long/path/to/file.txt", 20) -> "/very/…/to/file.txt"
 * @description
 * Substitues an "…" into middle part of a path, attempting to smartly break on "/" boundaries.
 * For display purposes only, returned result may not be a valid path.
 */
export function shorten(filepath: string, maxLength = 40): string {
    if (filepath.length <= maxLength)
        return filepath;

    const parts = filepath.split("/");

    let result = filepath;
    if (result.length > maxLength) {
        const i = Math.floor(parts.length / 2);
        if (i > 1 && i < parts.length - 1) {
            parts.splice(i, 1, "…"); // replace the middle part with "…"
            result = parts.join("/");
        }
    }

    while (result.length > maxLength) {
        const i = parts.indexOf("…");
        if (i > 2) { // don't remove the first part
            parts.splice(i - 1, 1);
            result = parts.join("/");
        }
        else if (i < parts.length - 2) { // don't remove the last part
            parts.splice(i + 1, 1);
            result = parts.join("/");
        }
        else {
            break;
        }
    }

    if (result.length > maxLength)
        result = parts.pop()!; // drop down to just the filename

    if (result.length > maxLength)
        result = `${result.slice(0, maxLength - 1)}…`; // shorten the filename to fit

    return result;
}
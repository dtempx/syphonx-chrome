import * as request from "./request";

export { setServiceUrl } from "./request";

export interface File {
    name: string;
    timestamp: Date;
    type: "folder" | "file";
    size: number;
    hash: string;
}

export type LogDataType = "error";

export interface LogData extends Record<string, unknown> {
    key: LogDataType;
}

export async function directory(): Promise<File[]> {
    const files = await request.json("templates") as File[];
    files.forEach(file => file.timestamp = new Date(file.timestamp));
    return files;
}

export async function autoselect(html: string, context = ""): Promise<string> {
    const result = await request.json("autoselect") as { selector: string };
    return result.selector;
}

export async function log(data: LogData): Promise<boolean> {
    try {
        await request.post("log", data);
        return true;
    }
    catch (err) {
        return false;
    }
}

export async function read(file: string): Promise<string> {
    if (file.startsWith("/"))
        file = file.slice(1);

    const { url } = await request.json(`template/${file}`) as { url: string };
    const response = await fetch(url);
    if (!response.ok)
        throw new Error(`Unable to read template $/${file}. GET ${url} returned status ${response.status}.`);
    const content = await response.text();
    return content;
}

export async function write(file: string, content: string): Promise<void> {
    if (file.startsWith("/"))
        file = file.slice(1);

    const { url } = await request.json(`template/${file}?write`) as { url: string };
    const response = await fetch(url, { method: "PUT", body: content, headers: { "Content-Type": "application/json" } });
    if (!response.ok)
        throw new Error(`Unable to update template $/${file}. PUT ${url} returned status ${response.status}.`);

    const result = await response.text();
    console.log(result);
}

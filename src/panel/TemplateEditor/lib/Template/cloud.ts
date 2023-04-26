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
        await request.postJson("log", data);
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
    const content = await request.text(url);
    return content;
}

export interface TemplateFileInfo {
    template: string;
    contract?: string;
}

export async function getTemplate(file: string): Promise<TemplateFileInfo> {
    if (file.startsWith("/"))
        file = file.slice(1);

    const data = await request.json(`template/${file}`) as any;
    const { url, contract } = data;
    const template = await request.text(url);
    return {
        template,
        contract
    };
}

export async function write(file: string, content: string): Promise<void> {
    if (file.startsWith("/"))
        file = file.slice(1);

    const { url } = await request.json(`template/${file}?write`) as { url: string };
    await request.putJson(url, content);
}

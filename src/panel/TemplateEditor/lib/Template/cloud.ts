const serviceUrl = "https://syphonx-35w5m5egbq-uc.a.run.app";

export interface File {
    name: string;
    timestamp: Date;
    type: "folder" | "file";
    size: number;
    hash: string;
}

export async function directory(): Promise<File[]> {
    const response = await fetch(`${serviceUrl}/templates/`);
    const files = await response.json() as File[];
    files.forEach(file => file.timestamp = new Date(file.timestamp));
    return files;
}

export type LogDataType = "error";

export interface LogData extends Record<string, unknown> {
    key: LogDataType
}

export async function log(data: LogData): Promise<boolean> {
    const body = JSON.stringify(data);
    const response = await fetch(`${serviceUrl}/log`, { method: "POST", body, headers: { "Content-Type": "application/json" } });
    return response.ok;
}

export async function read(file: string): Promise<string> {
    if (file.startsWith("/"))
        file = file.slice(1);
    const apiUrl = `${serviceUrl}/template/${file}?mode=read`;
    const response1 = await fetch(apiUrl);
    if (!response1.ok)
        throw new Error(`Unable to read template $/${file}. GET ${apiUrl} returned status ${response1.status}.`);

    const { url } = await response1.json() as { url: string };
    const response2 = await fetch(url);
    if (!response2.ok)
        throw new Error(`Unable to read template $/${file}. GET ${url} returned status ${response2.status}.`);
    const content = await response2.text();
    return content;
}

export async function write(file: string, content: string): Promise<void> {
    if (file.startsWith("/"))
        file = file.slice(1);

    const apiUrl = `${serviceUrl}/template/${file}?write`;
    const response1 = await fetch(apiUrl);
    if (!response1.ok)
        throw new Error(`Unable to update template $/${file}. PUT ${apiUrl} returned status ${response1.status}.`);

    const { url } = await response1.json() as { url: string };
    const response2 = await fetch(url, { method: "PUT", body: content, headers: { "Content-Type": "application/json" } });
    if (!response2.ok)
        throw new Error(`Unable to update template $/${file}. PUT ${url} returned status ${response2.status}.`);

    const result = await response2.text();
    console.log(result);
}

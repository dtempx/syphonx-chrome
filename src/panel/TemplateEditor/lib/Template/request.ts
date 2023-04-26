const defaultUrl = "https://syphonx-35w5m5egbq-uc.a.run.app";
let serviceUrl = defaultUrl;

export interface JsonRequest {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    headers?: Record<string, string>;
    obj?: unknown;
}

export async function json<T = any>(path: string, { method = "GET", headers = {}, obj }: JsonRequest = {}): Promise<T> {
    headers["Content-Type"] = "application/json";
    const body = formatBody(obj);
    const url = formatUrl(path, serviceUrl);
    const response = await fetch(url, { method, body, headers });
    if (!response.ok)
        throw new Error(`${method} ${url} failed with status=${response.status} ${response.statusText}`);
    const result = await response.json();
    return result;
}

export async function postJson(path: string, obj: unknown): Promise<void> {
    const url = formatUrl(path, serviceUrl);
    const body = formatBody(obj);
    const response = await fetch(url, { method: "POST", body, headers: { "Content-Type": "application/json" } });
    if (!response.ok)
        throw new Error(`POST ${url} failed with status=${response.status} ${response.statusText}`);
}

export async function putJson(path: string, obj: unknown): Promise<void> {
    const url = formatUrl(path, serviceUrl);
    const body = formatBody(obj);
    const response = await fetch(url, { method: "PUT", body, headers: { "Content-Type": "application/json" } });
    if (!response.ok)
        throw new Error(`PUT ${url} failed with status=${response.status} ${response.statusText}`);
}

export function setServiceUrl(url: string): void {
    serviceUrl = url || defaultUrl;
}

export async function text(path: string): Promise<string> {
    const url = formatUrl(path, serviceUrl);
    const response = await fetch(url);
    if (!response.ok)
        throw new Error(`GET ${url} failed with status=${response.status} ${response.statusText}`);
    const result = await response.text();
    return result;
}

function combineUrl(url: string, path: string): string {
    if (url && path)
        return `${rtrim(url, "/")}/${ltrim(path, "/")}`;
    else if (url)
        return url;
    else if (path)
        return path;
    else
        return "";
}

function formatBody(obj: unknown): string | undefined {
    if (typeof obj === "object")
        return JSON.stringify(obj);
    else if (typeof obj === "string")
        return obj;
    else
        return undefined;
}

function formatUrl(path: string, baseUrl: string): string {
    if (isAbsoluteUrl(path))
        return path;
    else
        return combineUrl(baseUrl, path);
}

function isAbsoluteUrl(url: string): boolean {
    return url.startsWith("http://") || url.startsWith("https://");
}

function ltrim(text: string, pattern: string): string {
    while (text.startsWith(pattern))
        text = text.slice(pattern.length);
    return text;
}

function rtrim(text: string, pattern: string): string {
    while (text.endsWith(pattern))
        text = text.slice(0, -1 * pattern.length)
    return text;
}

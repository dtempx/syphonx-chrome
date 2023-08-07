const defaultUrl = "https://api.syphonx.io";

export interface RequestOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    headers?: Record<string, string>;
    obj?: unknown;
}

export interface BasicOptions {
    headers?: Record<string, string>;
}

export async function json<T = any>(path: string, { method = "GET", headers = {}, obj }: RequestOptions = {}): Promise<T> {
    const url = `${(global as any).serviceUrl || defaultUrl}${path}`;
    const body = formatBody(obj);
    headers["Content-Type"] = "application/json";
    const response = await fetch(url, { method, body, headers });
    if (!response.ok)
        throw new Error(`${method} ${url} failed with status=${response.status} ${response.statusText}`);
    const result = await response.json();
    return result;
}

export async function postJson<T = any>(path: string, obj: unknown, { headers = {} }: BasicOptions = {}): Promise<T> {
    const url = `${(global as any).serviceUrl || defaultUrl}${path}`;
    const body = formatBody(obj);
    headers["Content-Type"] = "application/json";
    const response = await fetch(url, { method: "POST", body, headers });
    if (!response.ok)
        throw new Error(`POST ${url} failed with status=${response.status} ${response.statusText}`);
    const result = await response.json();
    return result;
}

export async function putJson(path: string, obj: unknown, { headers = {} }: BasicOptions): Promise<void> {
    const url = `${(global as any).serviceUrl || defaultUrl}${path}`;
    const body = formatBody(obj);
    headers["Content-Type"] = "application/json";
    const response = await fetch(url, { method: "PUT", body, headers });
    if (!response.ok)
        throw new Error(`PUT ${url} failed with status=${response.status} ${response.statusText}`);
}

export async function text(path: string, { method = "GET", headers = {}, obj }: RequestOptions = {}): Promise<string> {
    const url = `${(global as any).serviceUrl || defaultUrl}${path}`;
    const body = formatBody(obj);
    const response = await fetch(url, { method, body, headers });
    if (!response.ok)
        throw new Error(`GET ${url} failed with status=${response.status} ${response.statusText}`);
    const result = await response.text();
    return result;
}

export { _delete as delete };
async function _delete(path: string, { headers = {} }: BasicOptions): Promise<void> {
    const url = `${(global as any).serviceUrl || defaultUrl}${path}`;
    const response = await fetch(url, { method: "DELETE", headers });
    if (!response.ok)
        throw new Error(`DELETE ${url} failed with status=${response.status} ${response.statusText}`);
}

function formatBody(obj: unknown): string | undefined {
    if (typeof obj === "object")
        return JSON.stringify(obj);
    else if (typeof obj === "string")
        return obj;
    else
        return undefined;
}

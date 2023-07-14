export interface RequestOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    headers?: Record<string, string>;
    obj?: unknown;
}

export interface BasicOptions {
    headers?: Record<string, string>;
}

export async function json<T = any>(url: string, { method = "GET", headers = {}, obj }: RequestOptions = {}): Promise<T> {
    headers["Content-Type"] = "application/json";
    const body = formatBody(obj);
    const response = await fetch(url, { method, body, headers });
    if (!response.ok)
        throw new Error(`${method} ${url} failed with status=${response.status} ${response.statusText}`);
    const result = await response.json();
    return result;
}

export async function postJson<T = any>(url: string, obj: unknown, { headers = {} }: BasicOptions): Promise<T> {
    headers["Content-Type"] = "application/json";
    const body = formatBody(obj);
    const response = await fetch(url, { method: "POST", body, headers });
    if (!response.ok)
        throw new Error(`POST ${url} failed with status=${response.status} ${response.statusText}`);
    const result = await response.json();
    return result;
}

export async function putJson(url: string, obj: unknown, { headers = {} }: BasicOptions): Promise<void> {
    headers["Content-Type"] = "application/json";
    const body = formatBody(obj);
    const response = await fetch(url, { method: "PUT", body, headers });
    if (!response.ok)
        throw new Error(`PUT ${url} failed with status=${response.status} ${response.statusText}`);
}

export async function text(url: string, { method = "GET", headers = {}, obj }: RequestOptions = {}): Promise<string> {
    const body = formatBody(obj);
    const response = await fetch(url, { method, body, headers });
    if (!response.ok)
        throw new Error(`GET ${url} failed with status=${response.status} ${response.statusText}`);
    const result = await response.text();
    return result;
}

export { _delete as delete };
async function _delete(url: string, { headers = {} }: BasicOptions): Promise<void> {
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

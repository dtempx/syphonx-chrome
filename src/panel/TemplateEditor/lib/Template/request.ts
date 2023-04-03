const defaultUrl = "https://syphonx-35w5m5egbq-uc.a.run.app";
let serviceUrl = defaultUrl;

export interface JsonRequest {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    headers?: Record<string, string>;
    obj?: unknown;
}

export async function json<T = any>(path: string, { method = "GET", headers = {}, obj }: JsonRequest = {}): Promise<T> {
    headers["Content-Type"] = "application/json";
    const body = obj ? JSON.stringify(obj) : undefined;
    const url = `${serviceUrl}/${path}`;
    const response = await fetch(url, { method, body, headers });
    if (!response.ok)
        throw new Error(`${method} ${url} failed with status=${response.status} ${response.statusText}`);
    const result = await response.json();
    return result;
}

export async function post<T = any>(path: string, obj: unknown): Promise<T> {
    const result = await json(path, { method: "POST", obj });
    return result as T;
}

export function setServiceUrl(url: string): void {
    serviceUrl = url || defaultUrl;
}

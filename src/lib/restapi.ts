export interface RequestOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    headers?: Record<string, string>;
    obj?: unknown;
}

export interface BasicOptions {
    headers?: Record<string, string>;
}

export class RestApi {
    url: string;

    constructor(url: string) {
        this.url = url;
    }

    async json<T = any>(path: string, { method = "GET", headers = {}, obj }: RequestOptions = {}): Promise<T> {
        const url = combineUrl(this.url, path);
        const body = formatBody(obj);
        headers["Content-Type"] = "application/json";
        const response = await fetch(url, { method, body, headers });
        if (!response.ok)
            throw new Error(`${method} ${url} failed with status=${response.status} ${response.statusText}`);
        const result = await response.json();
        return result;
    }

    async postJson<T = any>(path: string, obj: unknown, { headers = {} }: BasicOptions = {}): Promise<T> {
        const url = combineUrl(this.url, path);
        const body = formatBody(obj);
        const method = "POST";
        headers["Content-Type"] = "application/json";
        const response = await fetch(url, { method, body, headers });
        if (!response.ok)
            throw new Error(`${method} ${url} failed with status=${response.status} ${response.statusText}`);
        const result = await response.json();
        return result;
    }

    async putJson(path: string, obj: unknown, { headers = {} }: BasicOptions): Promise<void> {
        const url = combineUrl(this.url, path);
        const body = formatBody(obj);
        const method = "PUT";
        headers["Content-Type"] = "application/json";
        const response = await fetch(url, { method, body, headers });
        if (!response.ok)
            throw new Error(`${method} ${url} failed with status=${response.status} ${response.statusText}`);
    }

    async text(path: string, { method = "GET", headers = {}, obj }: RequestOptions = {}): Promise<string> {
        const url = combineUrl(this.url, path);
        const body = formatBody(obj);
        const response = await fetch(url, { method, body, headers });
        if (!response.ok)
            throw new Error(`${method} ${url} failed with status=${response.status} ${response.statusText}`);
        const result = await response.text();
        return result;
    }

    async delete(path: string, { headers = {} }: BasicOptions): Promise<void> {
        const url = combineUrl(this.url, path);
        const method = "DELETE";
        const response = await fetch(url, { method, headers });
        if (!response.ok)
            throw new Error(`${method} ${url} failed with status=${response.status} ${response.statusText}`);
    }
}

function combineUrl(url: string, path: string) {
    if (url.endsWith("/"))
        url = url.slice(0, -1);
    if (path.startsWith("/"))
        path = path.slice(1);
    return `${url}/${path}`;
}

function formatBody(obj: unknown): string | undefined {
    if (typeof obj === "object")
        return JSON.stringify(obj);
    else if (typeof obj === "string")
        return obj;
    else
        return undefined;
}

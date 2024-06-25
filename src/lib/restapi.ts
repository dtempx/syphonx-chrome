export interface RequestOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    headers?: Record<string, string>;
    params?: string;
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

    async json<T = any>(path: string, { method = "GET", headers = {}, params }: RequestOptions = {}): Promise<T> {
        const url = combineUrl(this.url, params ? `${path}${params}` : path);
        headers["Content-Type"] = "application/json";
        try {
            const response = await fetch(url, { method, headers });
            if (!response.ok)
                throw new Error(`${method} ${url} failed with status=${response.status} ${response.statusText}`);
            const result = await response.json();
            return result;
        }
        catch (err) {
            throw new Error(`${method} ${url} failed with error ${err instanceof Error ? `"${err.message}"` : JSON.stringify(err)}`);
        }
    }

    async postJson<T = any>(path: string, obj: unknown, { headers = {} }: BasicOptions = {}): Promise<T> {
        const url = combineUrl(this.url, path);
        const body = formatBody(obj);
        const method = "POST";
        headers["Content-Type"] = "application/json";
        try {
            const response = await fetch(url, { method, body, headers });
            if (!response.ok)
                throw new Error(`${method} ${url} failed with status=${response.status} ${response.statusText}`);
            const result = await response.json();
            return result;
        }
        catch (err) {
            throw new Error(`${method} ${url} failed with error ${err instanceof Error ? `"${err.message}"` : JSON.stringify(err)}`);            
        }
    }

    async putJson(path: string, obj: unknown, { headers = {} }: BasicOptions): Promise<void> {
        const url = combineUrl(this.url, path);
        const body = formatBody(obj);
        const method = "PUT";
        headers["Content-Type"] = "application/json";
        try {
            const response = await fetch(url, { method, body, headers });
            if (!response.ok)
                throw new Error(`${method} ${url} failed with status=${response.status} ${response.statusText}`);
        }
        catch (err) {
            throw new Error(`${method} ${url} failed with error ${err instanceof Error ? `"${err.message}"` : JSON.stringify(err)}`);            
        }
    }

    async text(path: string, { method = "GET", headers = {} }: RequestOptions = {}): Promise<string> {
        const url = combineUrl(this.url, path);
        try {
            const response = await fetch(url, { method, headers });
            if (!response.ok)
                throw new Error(`${method} ${url} failed with status=${response.status} ${response.statusText}`);
            const result = await response.text();
            return result;
        }
        catch (err) {
            throw new Error(`${method} ${url} failed with error ${err instanceof Error ? `"${err.message}"` : JSON.stringify(err)}`);            
        }
    }

    async delete(path: string, { headers = {} }: BasicOptions): Promise<void> {
        const url = combineUrl(this.url, path);
        const method = "DELETE";
        try {
            const response = await fetch(url, { method, headers });
            if (!response.ok)
                throw new Error(`${method} ${url} failed with status=${response.status} ${response.statusText}`);
        }
        catch (err) {
            throw new Error(`${method} ${url} failed with error ${err instanceof Error ? `"${err.message}"` : JSON.stringify(err)}`);            
        }
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

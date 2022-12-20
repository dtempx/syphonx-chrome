const serviceUrl = "https://syphonx-35w5m5egbq-uc.a.run.app";

const headers = {
    "Content-Type": "application/octet-stream"
};

export interface File {
    name: string;
    timestamp: Date;
    type: "folder" | "file";
    size: number;
    hash: string;
}

export async function cloudFetchTemplateDirectory(): Promise<File[]> {
    const response = await fetch(`${serviceUrl}/templates/`);
    const files = await response.json() as File[];
    files.forEach(file => {
        file.name = "/" + file.name;
        file.timestamp = new Date(file.timestamp);
    });
    return files;
}

export async function cloudReadTemplateFile(file: string): Promise<string> {
    if (file.startsWith("/"))
        file = file.slice(1);
    const response1 = await fetch(`${serviceUrl}/template/${file}?mode=read`);
    const { url } = await response1.json() as { url: string };
    const response2 = await fetch(url);
    const content = await response2.text();
    return content;
}

export async function cloudCreateTemplateFile(file: string, content: string): Promise<void> {
    if (file.startsWith("/"))
        file = file.slice(1);
    const response1 = await fetch(`${serviceUrl}/template/${file}?mode=create`);
    const { url } = await response1.json() as { url: string };
    const response2 = await fetch(url, {
        method: "PUT",
        headers,
        body: content
    });
    const result = await response2.text();
    console.log(result);
}

export async function cloudUpdateTemplateFile(file: string, content: string): Promise<void> {
    if (file.startsWith("/"))
        file = file.slice(1);
    const response1 = await fetch(`${serviceUrl}/template/${file}?mode=update`);
    const { url } = await response1.json() as { url: string };
    const response2 = await fetch(url, {
        method: "PUT",
        headers,
        body: content
    });
    const result = await response2.text();
    console.log(result);
}

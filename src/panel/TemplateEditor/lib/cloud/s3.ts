
export async function uploadScreenshot(params: { url: string; data: string; }): Promise<{ url: string; size: number; } | undefined> {
    try {
        const data = Buffer.from(params.data.split(",")[1], "base64");
        const size = new Blob([data]).size;
        await fetch(params.url, {
            method: "PUT",
            headers: {
                "Content-Length": String(size),
                "Content-Type": "image/png"
            },
            body: data,
        });

        return { url: params.url.split("?")?.[0], size };
    } catch (e) {
        console.error(e);
    }
}


export async function uploadScreenshot(params: { url: string; data: string; }): Promise<boolean> {
    try {
        const data = Buffer.from(params.data.split(",")[1], "base64");
        const size = new Blob([data]).size;
        const response = await fetch(params.url, {
            method: "PUT",
            headers: {
                "Content-Length": String(size),
                "Content-Type": "image/png"
            },
            body: data,
        });

        return response.ok;
    } catch (e) {
        console.error(e);
        return false;
    }
}

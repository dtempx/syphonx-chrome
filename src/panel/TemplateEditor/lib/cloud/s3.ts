
export async function uploadScreenshot(url: string, data: string): Promise<boolean> {
    try {
        const size = new Blob([data]).size;
        const response = await fetch(url, {
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

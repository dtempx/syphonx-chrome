export function evaluateFormula<T = any>(formula: string, params: Record<string, unknown> = {}): Promise<T> {
    return new Promise((resolve, reject) => {
        const iframe = document.getElementById("sandbox") as HTMLIFrameElement;
        window.addEventListener("message", listener);
        iframe.contentWindow!.postMessage({ formula, params }, "*");
        function listener(event: MessageEvent) {
            if (event.data.error)
                reject(event.data.error);
            else
                resolve(event.data.result);
            window.removeEventListener("message", listener);
        }            
    });
}

export function isFormula(formula: unknown): boolean {
    return typeof formula === "string" && formula.startsWith("{") && formula.endsWith("}");
}

export function validateFormula(formula: string): boolean {
    return true; // todo
}

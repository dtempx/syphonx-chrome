declare global {
    interface Window {
        syphonx: Record<string, unknown>
    }
}

export function highlightElements(selector: string) {
    if (window.syphonx?.selector)
        document.querySelectorAll(window.syphonx.selector as string)
            .forEach(element => (element as HTMLElement).style.boxShadow = "");
    if (selector)
        document.querySelectorAll(selector)
            .forEach(element => (element as HTMLElement).style.boxShadow = "4px 4px 2px yellow, -4px -4px 2px yellow");
    window.syphonx = { ...window.syphonx, selector };
}
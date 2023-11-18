export function queryHtml(selector: string): string {
    const elements = document.querySelectorAll(selector);
    const html = Array.from(elements).map(element => element.outerHTML).join("\n");
    return html;
}

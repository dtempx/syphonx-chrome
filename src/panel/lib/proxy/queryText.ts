export function queryText(selector: string): string {
    const elements = document.querySelectorAll(selector);
    const html = Array.from(elements).map(element => element.textContent).join("\n");
    return html;
}

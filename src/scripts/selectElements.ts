export function selectElements(selectors: string[]): Array<string | null> {
    document.querySelectorAll(".sx-hover, .sx-select").forEach(element =>
        element.classList.remove("sx-hover", "sx-select"));

    const result: Array<string | null> = [];
    for (const selector of selectors)
        document.querySelectorAll(selector).forEach(element => {
            element.classList.add("sx-select");
            result.push(element.textContent);
        });
    return result;
}
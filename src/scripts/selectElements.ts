export function selectElements(selectors: string[], limit = 100): Array<string | null> {
    document.querySelectorAll(".sx-select").forEach(element =>
        element.classList.remove("sx-select"));

    const result: Array<string | null> = [];
    for (const selector of selectors)
        if (selector && result.length <= limit)
            document.querySelectorAll(selector).forEach(element => {
                element.classList.add("sx-select");
                result.push(element.textContent);
            });
    return result;
}
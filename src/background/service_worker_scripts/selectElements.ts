export interface SelectElementsOptions {
    selectors: string[];
    className: string;
    limit?: number;
}

export function selectElements({ selectors, className, limit = 100 } : SelectElementsOptions): Array<string | null> {
    document.querySelectorAll(`.${className}`).forEach(element =>
        element.classList.remove(className));

    const result: Array<string | null> = [];
    for (const selector of selectors)
        if (selector && result.length <= limit)
            document.querySelectorAll(selector).forEach(element => {
                element.classList.add(className);
                result.push(element.textContent);
            });
    return result;
}
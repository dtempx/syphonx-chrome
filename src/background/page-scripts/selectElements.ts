export interface SelectElementsOptions {
    /**
     * An array of CSS selectors that target the elements to select.
     */
    selectors: string[];
    /**
     * A class name that designates elements to appear as selected.
     */
    className: string;
    /**
     * The maximum number of elements to select.
     */
    limit?: number;
    /**
     * Whether to scroll the first selected element into view. Defaults to true.
     */
    scrollIntoView?: boolean;
}

/**
 * Adds the specified class to elements in the DOM that match a set of selectors.
 * @param options
 * @returns An array of strings containing the text content of the selected elements, or null if the element is not a text node.
 */
export function selectElements({ selectors, className, limit = 100, scrollIntoView = true } : SelectElementsOptions): Array<string | null> {
    document.querySelectorAll(`.${className}`).forEach(element =>
        element.classList.remove(className));

    const result: Array<string | null> = [];
    for (const selector of selectors)
        if (selector && result.length <= limit)
            document.querySelectorAll(selector).forEach(element => {
                if (scrollIntoView) {
                    setTimeout(() => {
                        element.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                            inline: "center"
                        });    
                    }, 500);
                    scrollIntoView = false;
                }
                element.classList.add(className);
                result.push(element.textContent);
            });
    
    return result;
}
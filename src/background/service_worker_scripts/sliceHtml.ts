export interface SliceHtmlOptions {
    /**
     * A CSS selector that targets the element for the HTML slice.
     */
    selector: string;
    /**
     * The number of parent elements to include in the slice.
     */
    up?: number;
    /**
     * The number of child elements to include in the slice.
     */
    down?: number;
}

/**
 * Slices the HTML document to include the specified element and its ancestors and descendants.
 * @param options The options for the HTML slice.
 * @returns A string containing the HTML slice.
 */
export function sliceHtml({ selector, up = 3, down = 3 }: SliceHtmlOptions): string {
    const elements = mark();
    const output: string[] = [];
    render(document.documentElement);
    unmark();
    return output.join("\n");

    function mark(): Element[] {
        const elements = Array.from(document.querySelectorAll(selector));
        for (const element of elements) {
            element.setAttribute("marked", "");
            traverseUp(element);
            if (element.parentElement)
                traverseDown(element.parentElement);
        }
        return elements;
    }

    function unmark(): void {
        document.querySelectorAll("[marked]").forEach(element => element.removeAttribute("marked"));
    }

    function traverseUp(element: Element, n = 0): void {
        if (element.parentElement && n <= up) {
            element.parentElement.setAttribute("marked", "");
            traverseUp(element.parentElement, n + 1);
        }            
    }
    
    function traverseDown(element: Element, level = Infinity, n = 0): void {
        if (--level >= 0 && n <= down) {
            for (const child of element.children) {
                child.setAttribute("marked", "");
                traverseDown(child, level, n + 1);
            }
        }
    }

    function render(element: Element): void {
        const tag = element.tagName.toLowerCase();
        const exclude = ["noscript", "script", "style", "svg"];
        const container = !["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"].includes(tag);
        const attributes = renderAttributes(element.attributes);
        const marked = element.hasAttribute("marked");
        if (elements.includes(element) && marked) {
            output.push(`<!---->`);
        }
        if (!container && marked) {
            output.push(`<${tag}${attributes}>`);
        }
        else if (element.children.length > 0) {
            if (marked)
                output.push(`<${tag}${attributes}>`);
            const children = Array.from(element.children)
                .filter(child => !exclude.includes(child.tagName.toLocaleLowerCase()));
            for (const child of children)
                render(child);
            if (marked)
                output.push(`</${tag}>`);
        }
        else if (element.textContent !== null && element.textContent.trim().length > 0 && marked) {
            const text = trunc(element.textContent.trim().replace(/\s+/gm, " "));
            output.push(`<${tag}${attributes}>${text}</${tag}>`);
        }
        else if (marked) {
            output.push(`<${tag}${attributes}></${tag}>`);
        }
    
        function renderAttributes(attributes: NamedNodeMap): string {
            const text = Array.from(element.attributes)
                .filter(attr => attr.value && attr.name !== "marked" && !attr.name.startsWith("sx-"))
                .map(attr => `${attr.name}="${trunc(attr.value.replace(/"/g,'\"'))}"`)
                .join(" ");
            return text ? " " + text : "";
        }
    
        function trunc(text: string, max = 80): string {
            if (text.length > max) {
                const k = Math.floor(max / 2);
                const i = Math.max(text.slice(0, k).lastIndexOf(" "), k);
                const j = Math.max(k - text.slice(-k).indexOf(" "), k);
                text = text.slice(0, i) + " … " + text.slice(-j);
            }
            return text;
        }
    }
}
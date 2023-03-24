export function sliceHtml(upLimit = 3, downLimit = 3): string {
    const elements = mark();
    const output: string[] = [];
    render(document.documentElement);
    unmark();
    return output.join("\n");

    function mark(): Element[] {
        const elements = Array.from(document.querySelectorAll(".sx-click"));
        removeAllTrackingClasses();
        for (const element of elements) {
            element.setAttribute("marked", "");
            traverseUp(element);
            if (element.parentElement)
                traverseDown(element.parentElement);
        }
        return elements;
    }

    function removeAllTrackingClasses(): void {
        removeTrackingClass("sx-click");
        removeTrackingClass("sx-hover");
        removeTrackingClass("sx-select");
    }

    function removeTrackingClass(className: string): void {
        document.querySelectorAll(`.${className}`).forEach(element => {
            element.classList.remove(className);
            if (element.classList.length === 0)
                element.removeAttribute("class");
        });
    }

    function unmark(): void {
        document.querySelectorAll("[marked]").forEach(element => element.removeAttribute("marked"));
    }

    function traverseUp(element: Element, n = 0): void {
        if (element.parentElement && n <= upLimit) {
            element.parentElement.setAttribute("marked", "");
            traverseUp(element.parentElement, n + 1);
        }            
    }
    
    function traverseDown(element: Element, level = Infinity, n = 0): void {
        if (--level >= 0 && n <= downLimit) {
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
            output.push(`<!-- SELECT THE FOLLOWING ELEMENT -->`);
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
            const text = truncateText(element.textContent.trim().replace(/\s+/gm, " "));
            output.push(`<${tag}${attributes}>${text}</${tag}>`);
        }
        else if (marked) {
            output.push(`<${tag}${attributes}></${tag}>`);
        }
    
        function renderAttributes(attributes: NamedNodeMap): string {
            const text = Array.from(element.attributes)
                .filter(attr => attr.value && attr.name !== "marked")
                .map(attr => `${attr.name}="${attr.value.replace(/"/g,'\"')}"`)
                .join(" ");
            return text ? " " + text : "";
        }
    
        function truncateText(text: string, max = 80): string {
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
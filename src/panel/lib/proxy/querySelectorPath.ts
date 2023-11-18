export function querySelectorPath(selector: string): string[] {
    const selectors: string[] = [];
    const elements = Array.from(document.querySelectorAll(selector));

    for (const element of elements)
        selectors.push(traverseUp(element));
    return selectors;

    function traverseUp(element: Element | null): string {
        const path = [];
        while (element) {
            const tag = element.tagName?.toLowerCase();
            if (!element.parentElement) {
                path.push(tag);
                break;
            }

            if (tag === "body") {
                path.push(tag);
            }
            else {
                const id = element.id || "";
                const [className] = element.className?.split(" ").filter(name => selector.startsWith(".") ? name !== selector.slice(1) : true) || [];
                const n = Array.from(element.parentElement.children).indexOf(element) + 1;
        
                const uniqueId = /^[A-Za-z0-9_-]+$/.test(id) ? document.querySelectorAll(`#${id}`).length === 1 : false;
                const uniqueClassName = tag && /^[A-Za-z0-9_-]+$/.test(className) ? document.querySelectorAll(`${tag}.${className}`).length === 1 : false;
                const onlyTag = element.parentElement.querySelectorAll(tag).length === 1;
                const onlyClassName = tag && /^[A-Za-z0-9_-]+$/.test(className) ? element.parentElement.querySelectorAll(`${tag}.${className}`).length === 1 : false;
        
                if (uniqueId)
                    path.push(`${tag}#${id}`);
                else if (uniqueClassName)
                    path.push(`${tag}.${className}`);
                else if (onlyTag)
                    path.push(tag);
                else if (onlyClassName)
                    path.push(`${tag}.${className}`);
                else
                    path.push(`${tag}:nth-child(${n})`);
            }

            element = element.parentElement;
        }

        return path.reverse().join(" > ");
    }
}
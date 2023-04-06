export interface QueryTrackingOptions {
    /**
     * The class name of the element to target for which to find selectors.
     */
    className: string;
    /**
     * The maximum number of consecutive nth-of-type or first-of-type selectors allowed in a selector.
     */
    nthOfTypeRunLimit?: number;
}

/**
 * Finds an array of selectors that uniquely identify the element targeted by the specified className.
 * @param options The options for the query tracking.
 * @returns An array of selectors that uniquely identify the target element.
 */
export function queryTracking({ className, nthOfTypeRunLimit = 3 }: QueryTrackingOptions): string[] {
    const result: string[] = [];
    const targetElement = document.querySelector(`.${className}`);
    if (targetElement) {
        const closed: string[] = [];
        let open: string[] = [];
        let element: Element | null = targetElement;
        while (element && element.tagName !== "BODY") {
            const next = new Set<string>();

            const tag = element.tagName.toLowerCase();
            append(tag);

            const id = element.getAttribute("id");
            if (id)
                append(`#${id}`);

            const classes = element.getAttribute("class") ?
                element.getAttribute("class")!.split(" ")
                    .filter(name => name !== className) // filter out target class name
                    .filter(name => /-?[_a-z]+[_a-z0-9-]*/i.test(name)) // filter out invalid class names
                : [];
            classes.forEach(name => append(`.${name}`));

            const attributes = Array.from(element.attributes)
                .filter(attr => !["id", "class", "style", "src", "href", "title", "lang"].includes(attr.name))
                .map(attr => ({ name: attr.name, value: attr.value }));
            attributes.forEach(attr => append(`[${attr.name}${attr.value ? `='${attr.value.replace(/'/g, "\\'")}'` : ""}]`));

            if (next.size === 0)
                 break; // no more open paths so nothing left to do (shouldn't ever happen)

            open = Array.from(next);
            element = element.parentElement; // climb up the tree

            // adds target to either closed or nextı
            function append(target: string): void {
                const paths = open.length > 0 ? open : [""];
                for (const path of paths) {
                    const selector = path ? `${target} > ${path}` : target;
                    const elements = Array.from(document.querySelectorAll(selector)) as Element[];
                    // if selector is unique within the document and it matches the target element, then we are done
                    if (elements.length === 1 && elements[0].isEqualNode(targetElement)) {
                        // add selector to closed set
                        closed.push(selector);
                        // remove closed path from open set
                        const i = open.indexOf(path);
                        open.splice(i, 1);
                    }
                    // if target is a tag then add decorated node with nth-of-type to path
                    else if (element?.parentElement && /^[a-z]+$/.test(target)) {
                        const i = Array.from(element.parentElement.children)
                            .filter(child => child.tagName.toLowerCase() === target)
                            .findIndex(child => child.isEqualNode(element));
                        if (i === 0)
                            next.add(`${target}:first-of-type${path ? ` > ${path}` : ""}`);
                        else if (i > 0)
                            next.add(`${target}:nth-of-type(${i + 1})${path ? ` > ${path}` : ""}`);
                    }
                    // for all other selectors that are not a tag, we need to check if it matches the target element
                    else if (element?.parentElement) {
                        const elements = element.parentElement.querySelectorAll(selector);
                        if (elements.length === 1 && elements[0].isEqualNode(targetElement))
                            next.add(selector);
                    }
                }
            }        
        }

        // attempt to reduce nth-of-type runs
        const selectors = Array.from(new Set([...closed, ...open]));
        for (let i = selectors.length - 1; i >= 0; --i) {
            const selector1 = selectors[i];
            if (/ > [a-z]+:(?:first-of-type|nth-of-type\(\d+\)) > /.test(selector1)) {
                const elements1 = document.querySelectorAll(selector1);
                const selector2 = selector1.replace(/( > [a-z]+:(?:first-of-type|nth-of-type\(\d+\)))+ > /g, " ");
                const elements2 = document.querySelectorAll(selector2);
                if (elements1.length === elements2.length && elements1[0].isEqualNode(elements2[0])) {
                    selectors.splice(i, 1, selector2);
                }
                else if (selectors.length > 1) {
                    const hits = Array.from(selector1.matchAll(/( > [a-z]+:(?:first-of-type|nth-of-type\(\d+\)))/g));
                    if (hits.length - 1 > nthOfTypeRunLimit)
                        selectors.splice(i, 1); // remove if run length exceeds limit, but don't remove the last selector
                }
            }
        }

        result.push(
            ...Array.from(new Set(selectors))
            .sort((a, b) =>
                (a.match(/:nth-/g) || []).length - (b.match(/:nth-/g) || []).length ||
                (a.match(/>/g) || []).length - (b.match(/>/g) || []).length ||
                a.length - b.length ||
                a.localeCompare(b)
            )
        );
    }

    return result;
}

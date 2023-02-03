export function disableTracking() {
    syphonx.tracking = false;

    document.querySelectorAll(".sx-hover").forEach(element => {
        element.classList.remove("sx-hover");
        if (element.classList.length === 0)
            element.removeAttribute("class");
    });

    document.querySelectorAll(".sx-click").forEach(element => {
        element.classList.remove("sx-click");
        if (element.classList.length === 0)
            element.removeAttribute("class");
    });
}

export function enableTracking() {
    syphonx.tracking = true;

    window.addEventListener("beforeunload", event => {
        if (syphonx.tracking) {
            event.preventDefault();
            event.stopPropagation();
            return "";
        }
    });

    document.addEventListener("mousemove", event => {
        document.querySelectorAll(".sx-hover").forEach(element => {
            element.classList.remove("sx-hover");
            if (element.classList.length === 0)
                element.removeAttribute("class");
        });

        if (syphonx.tracking)
            if (event.target instanceof HTMLElement)
                event.target.classList.add("sx-hover");
    });

    document.addEventListener("click", onClick);
    document.addEventListener("auxclick", onClick);

    function onClick(event: MouseEvent) {
        document.querySelectorAll(".sx-click").forEach(element => {
            element.classList.remove("sx-click");
            if (element.classList.length === 0)
                element.removeAttribute("class");
        });

        document.querySelectorAll(".sx-hover").forEach(element => {
            element.classList.remove("sx-hover");
            if (element.classList.length === 0)
                element.removeAttribute("class");
        });

        if (syphonx.tracking) {
            if (event.target instanceof HTMLElement)
                event.target.classList.add("sx-click");
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
    }
}

export function queryTracking(): string[] {
    const element = document.querySelector(".sx-click");
    if (element) {
        element.classList.remove("sx-click");
        if (element.classList.length === 0)
            element.removeAttribute("class");
        return singleSelector(element);
    }
    else {
        return [];
    }

    function semantic(name: string | null | undefined): boolean {
        if (!name)
            return false;

        name = name
            .replace(/[^a-z0-9_-]/gi, "") // remove any characters that aren't letters, digits, dashes, or underscores
            .replace(/^[-_]+|[-_]+$/g, "") // trim "-" or "_" from beginning or end of a string
            .replace(/_/g, "-") // replace all "_" with "-"
            .replace(/-{2,}/g, "-") // dedup "-"
            .replace(/([a-z])([A-Z])/g, '$1-$2') // convert from camel-case
            .toLowerCase();

        // reject if any digits are present in the name
        if (/\d/.test(name))
            return false;
        
        // split words by "-" including only word lengths greater than 3 
        const words = name.split("-").filter(word => word.length > 3);
        // reject if any word of length greater than 3 is not in the English dictionary
        return words.length > 0 && words.every(word => syphonx.dictionary.has(word));
    }

    function singleSelector(element: Element | null): string[] {
        let open: string[] = [];
        const closed: string[] = [];
        while (element && element.tagName !== "BODY") {
            const tag = element.tagName.toLowerCase();
            const paths = open.length > 0 ? open : [""];
            const next = [];

            function append(target: string): void {
                for (const path of paths) {
                    const selector = path ? `${target} > ${path}` : target;
                    if (document.querySelectorAll(selector).length === 1) {
                        closed.push(selector);
                    }
                    else if (element!.parentElement) {
                        const n = element!.parentElement.querySelectorAll(tag).length;
                        if (n === 1)
                            next.push(selector);
                    }
                }
            }

            const id = element.getAttribute("id");
            if (semantic(id))
                append(`#${id}`);

            // find class-names that don't start with "sx-" and appear to have semantic meaning
            (element.getAttribute("class") || "").split(' ')
                .filter(className => !className.startsWith("sx-") && semantic(className))
                .forEach(className =>
                    append(`.${className}`));

            // find attributes with exceptions
            Array.from(element.attributes)
                .filter(attr => !["id", "class", "style", "src", "href", "title", "lang"].includes(attr.name))
                .forEach(attr =>
                    append(`[${attr.name}${semantic(attr.value) ? `='${attr.value.replace(/'/g, "\\'")}'` : ""}]`));

            for (const path of paths) {
                let selector = path ? `${tag} > ${path}` : tag;
                if (document.querySelectorAll(selector).length === 1) {
                    closed.push(selector);
                }
                if (element!.parentElement) {
                    const n = element!.parentElement.querySelectorAll(tag).length;
                    if (n > 1) {
                        const i = Array.from(element.parentElement.children)
                            .filter(child => child.tagName.toLowerCase() === tag)
                            .findIndex(child => child === element);
                        selector = `${tag}:nth-of-type(${i + 1})${path ? ` > ${path}` : ""}`;
                    }
                    next.push(selector);
                }
            }

            if (next.length === 0)
                break; // no more open paths so nothing left to do (shouldn't ever happen)

            open = next;
            element = element.parentElement;
        }

        return [...closed, ...open].sort((a, b) =>
            (a.match(/:nth-/g) || []).length - (b.match(/:nth-/g) || []).length ||
            (a.match(/>/g) || []).length - (b.match(/>/g) || []).length ||
            a.length - b.length ||
            a.localeCompare(b)
        );
    }
}
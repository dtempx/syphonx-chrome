export function disableTracking(): void {
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

    if (syphonx.reset) {
        syphonx.reset();
        syphonx.reset = undefined;
    }
}

export function enableTracking(): void {
    syphonx.tracking = true;

    syphonx.reset = () => {
        document.removeEventListener("click", onClick);
        document.removeEventListener("auxclick", onClick);
        document.removeEventListener("contextmenu", onContext);
        document.removeEventListener("mousemove", onMouseMove);
    };

    document.addEventListener("click", onClick);
    document.addEventListener("auxclick", onClick);
    document.addEventListener("contextmenu", onContext);
    document.addEventListener("mousemove", onMouseMove);

    function onClick(event: MouseEvent): void {
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
            if (event.target instanceof HTMLElement) {
                event.target.classList.add("sx-click");
                chrome.runtime.sendMessage({ click: {
                    altKey: event.altKey,
                    button: event.button,
                    ctrlKey: event.ctrlKey,
                    shiftKey: event.shiftKey,
                    x: event.x,
                    y: event.y
                } });
            }
            event.preventDefault();
            event.stopPropagation();
        }
    }

    function onContext(event: MouseEvent): void {
        event.preventDefault();
    }

    function onMouseMove(event: MouseEvent): void {
        document.querySelectorAll(".sx-hover").forEach(element => {
            element.classList.remove("sx-hover");
            if (element.classList.length === 0)
                element.removeAttribute("class");
        });

        if (syphonx.tracking)
            if (event.target instanceof HTMLElement)
                event.target.classList.add("sx-hover");
    }
}

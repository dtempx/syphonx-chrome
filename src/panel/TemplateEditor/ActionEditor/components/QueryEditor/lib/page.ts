import { background } from ".";

export interface SelectResult {
    html: string;
    output: Array<string | null>;
    targets: number[];
}

export async function select(selector: string): Promise<SelectResult> {
    const output = await background.selectElements({
        selectors: [selector],
        className: "sx-select"
    });

    let { html, targets } = await background.sliceHtml({
        selector: ".sx-select",
        up: 6,
        down: 3
    });
    html = html.replace(/sx-select|sx-hover|sx-click/g, "").replace(/(\s+class='\s*')|(\s+class="\s*")/g, "");;

    return { output, html, targets };
}

export async function deselect(): Promise<void> {
    background.selectElements({
        selectors: [],
        className: "sx-select"
    });
}

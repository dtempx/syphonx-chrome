import { background } from ".";
import { TemplateItem } from ".";
import * as syphonx from "syphonx-lib";

export async function hiliteElements(selectors: string[], autoScroll = true): Promise<void> {
    await background.selectElements({
        selectors,
        className: "sx-select",
        scrollIntoView: autoScroll
    });
}

export async function hiliteItem(item?: TemplateItem, autoScroll = true): Promise<void> {
    if (item?.type === "select") {
        const obj = item?.obj as syphonx.Select;
        if (obj.query) {
            const selector = obj.query[0][0];
            await hiliteElements([selector], autoScroll);
        }
    }
}

import { inspectedWindow } from "..";
import {
    deselectElements as _deselectElements,
    selectElements as _selectElements,
    SelectElementsOptions
} from "./selectElements";

export async function selectElements(options: SelectElementsOptions): Promise<Array<string | null>> {
    const result = await inspectedWindow.call(_selectElements, options);
    return result;
}

export async function deselectElements(className: string): Promise<void> {
    await inspectedWindow.call(_deselectElements, className);
}

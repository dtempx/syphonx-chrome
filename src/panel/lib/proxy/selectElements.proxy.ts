import { inspectedWindow } from "..";
import { selectElements as _selectElements, SelectElementsOptions } from "./selectElements";

export async function selectElements(options: SelectElementsOptions): Promise<Array<string | null>> {
    const result = await inspectedWindow.call(_selectElements, options);
    return result;
}

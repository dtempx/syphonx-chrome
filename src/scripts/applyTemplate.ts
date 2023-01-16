import { Template, ExtractResult } from "syphonx-lib";

export async function applyTemplate(template: Template): Promise<ExtractResult | undefined> {
    const result = await syphonx.extract(template);
    return result;
}
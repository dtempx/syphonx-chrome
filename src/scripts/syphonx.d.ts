import * as syphonx from "syphonx-lib";

export interface SyphonX {
    extract: (template: syphonx.Template) => Promise<syphonx.ExtractResult | undefined>;
    dictionary: Set<string>;
    tracking: boolean;
}

declare global {
    interface Window { syphonx: SyphonX }
    const syphonx: SyphonX;
}
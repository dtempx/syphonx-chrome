import * as syphonx from "syphonx-lib";

export interface SyphonX {
    extract: (template: syphonx.Template) => Promise<syphonx.ExtractResult | undefined>;
    tracking: boolean;
    reset?: () => void;
}

declare global {
    interface Window { syphonx: SyphonX }
    const syphonx: SyphonX;
}
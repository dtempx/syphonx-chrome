import React from "react";
import * as syphonx from "syphonx-lib";
import { Template } from "../../lib/Template";

export interface TemplateState {
    template: Template | undefined;
    text: string;
    selected: string;
    result: syphonx.ExtractResult | undefined;
    setText: React.Dispatch<React.SetStateAction<string>>;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
    updateTemplate: () => void;
}
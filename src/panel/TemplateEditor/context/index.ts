import { useContext } from "react";

import { DataContext, DataState } from "./DataContext";
import { PageContext, PageState } from "./PageContext";
import { TemplateContext, TemplateState } from "./TemplateContext";

export type ComposedTemplateState = DataState & PageState & TemplateState;

export function useTemplate(): ComposedTemplateState {
    const context = {
        ...useContext(DataContext),
        ...useContext(PageContext),
        ...useContext(TemplateContext)
    };
    return context;
}

export { default as TemplateProvider } from "./UnionContext";
export * from "../../context";

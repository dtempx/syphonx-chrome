import { useContext } from "react";

import { ContractContext, ContractState } from "./ContractContext";
import { DataContext, DataState } from "./DataContext";
import { DebugContext, DebugState } from "./DebugContext";
import { PageContext, PageState } from "./PageContext";
import { TemplateContext, TemplateState } from "./TemplateContext";

export type ComposedTemplateState = ContractState & DataState & DebugState & PageState & TemplateState;

export function useTemplate(): ComposedTemplateState {
    const context = {
        ...useContext(ContractContext),
        ...useContext(DataContext),
        ...useContext(DebugContext),
        ...useContext(PageContext),
        ...useContext(TemplateContext)
    };
    return context;
}

export { default as TemplateProvider } from "./UnionContext";
export * from "../../context";

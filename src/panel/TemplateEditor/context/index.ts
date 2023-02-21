import { useContext } from "react";

import { ContractContext, ContractState } from "./ContractContext";
import { TemplateContext, TemplateState } from "./TemplateContext";
import { DataContext, DataState } from "./DataContext";

export type ComposedTemplateState = ContractState & TemplateState & DataState;

export function useTemplate(): ComposedTemplateState {
    const context = {
        ...useContext(ContractContext),
        ...useContext(TemplateContext),
        ...useContext(DataContext)    
    };
    return context;
}

export { default as TemplateProvider } from "./UnionContext";
export * from "../../context";

import { useContext } from "react";
import { addListeners } from "./listeners";

import { DataContext, DataState } from "./DataContext";
import { PageContext, PageState } from "./PageContext";
import { PortalContext, PortalState } from "./PortalContext";
import { QueryBuilderContext, QueryBuilderState } from "./QueryBuilderContext";
import { TemplateContext, TemplateState } from "./TemplateContext";
import { UserContext, UserState } from "./UserContext";

export type ComposedTemplateState = DataState & /*PageState &*/ PortalState & TemplateState & UserState;

export function useTemplate(): ComposedTemplateState {
    addListeners();
    const context = {
        ...useContext(DataContext),
        ...useContext(PortalContext),
        ...useContext(TemplateContext),
        ...useContext(UserContext)
    };
    return context;
}

export function usePage(): PageState {
    return useContext(PageContext);
}

export function useQueryBuilder(): QueryBuilderState {
    return useContext(QueryBuilderContext);
}

export { default as TemplateProvider } from "./UnionContext";
export * from "../../context";

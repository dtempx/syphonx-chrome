import { useContext } from "react";
import { addListeners } from "./listeners";

import { DataContext, DataState } from "./DataContext";
import { PageContext, PageState } from "./PageContext";
import { TemplateContext, TemplateState } from "./TemplateContext";
import { UserContext, UserState } from "./UserContext";

export type ComposedTemplateState = DataState & PageState & TemplateState & UserState;

export function useTemplate(): ComposedTemplateState {
    addListeners();
    const context = {
        ...useContext(DataContext),
        ...useContext(PageContext),
        ...useContext(TemplateContext),
        ...useContext(UserContext)
    };
    return context;
}

export { default as TemplateProvider } from "./UnionContext";
export { useUser } from "./UserContext";
export * from "../../context";

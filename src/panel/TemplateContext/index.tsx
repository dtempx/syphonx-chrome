import React from "react";
import { TemplateContext } from "./TemplateContext";

export { TemplateProvider } from "./TemplateProvider";
export { Template, TemplateItem } from "../../lib";

export function useTemplate() {
    return React.useContext(TemplateContext);
}
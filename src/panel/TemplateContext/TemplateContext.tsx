import React from "react";
import { TemplateState } from "./TemplateState";

export const TemplateContext = React.createContext<TemplateState>({} as TemplateState);
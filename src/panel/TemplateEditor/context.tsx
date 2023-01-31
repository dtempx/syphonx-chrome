import React, { useContext } from "react";
import { useState } from "react";

export interface TemplateState {
    template: string;
    setTemplate: React.Dispatch<React.SetStateAction<string>>;
}

const TemplateContext = React.createContext<TemplateState>({
    template: "",
    setTemplate: () => {},
});

export function TemplateProvider({ children }: { children: JSX.Element }) {
    const [template, setTemplate] = useState("");

    const value = {
        template,
        setTemplate,
    };

    return (
        <TemplateContext.Provider value={value}>
            {children}
        </TemplateContext.Provider>
    );
}

export function useTemplate() {
    return useContext(TemplateContext);
}

export * from "../context";
import React, { useContext, useState } from "react";

export interface TemplateState {
    template: string;
    setTemplate: React.Dispatch<React.SetStateAction<string>>;
    file: string;
    setFile: React.Dispatch<React.SetStateAction<string>>;
}

const TemplateContext = React.createContext<TemplateState>({
    template: "",
    setTemplate: () => {},
    file: "",
    setFile: () => {}
});

export function TemplateProvider({ children }: { children: JSX.Element }) {
    const [template, setTemplate] = useState("");
    const [file, setFile] = useState("");

    const value = {
        template,
        setTemplate,
        file,
        setFile
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
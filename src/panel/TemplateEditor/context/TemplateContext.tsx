import React, { useState } from "react";

export interface TemplateState {
    template: string;
    setTemplate: React.Dispatch<React.SetStateAction<string>>;
    templateFile: string;
    setTemplateFile: React.Dispatch<React.SetStateAction<string>>;
    contract: string;
    setContract: React.Dispatch<React.SetStateAction<string>>;
}

export const TemplateContext = React.createContext<TemplateState>({
    template: "",
    setTemplate: () => {},
    templateFile: "",
    setTemplateFile: () => {},
    contract: "",
    setContract: () => {}
});

export function TemplateProvider({ children }: { children?: JSX.Element }) {
    const [template, setTemplate] = useState("");
    const [templateFile, setTemplateFile] = useState("");
    const [contract, setContract] = useState("");

    const value = {
        template,
        setTemplate,
        templateFile,
        setTemplateFile,
        contract,
        setContract
    };

    return (
        <TemplateContext.Provider value={value}>
            {children}
        </TemplateContext.Provider>
    );
}

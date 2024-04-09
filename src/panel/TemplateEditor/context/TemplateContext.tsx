import React, { useState } from "react";

export interface TemplateState {
    template: string;
    setTemplate: React.Dispatch<React.SetStateAction<string>>;
    templateFile: string;
    setTemplateFile: React.Dispatch<React.SetStateAction<string>>;
    contract: string;
    setContract: React.Dispatch<React.SetStateAction<string>>;
    closeTemplate: () => void;
}

export const TemplateContext = React.createContext<TemplateState>({
    template: "",
    setTemplate: () => {},
    templateFile: "",
    setTemplateFile: () => {},
    contract: "",
    setContract: () => {},
    closeTemplate: () => {}
});

export function TemplateProvider({ children }: { children?: JSX.Element }) {
    const [template, setTemplate] = useState("");
    const [templateFile, setTemplateFile] = useState("");
    const [contract, setContract] = useState("");

    function closeTemplate() {
        setTemplate("");
        setTemplateFile("");
        setContract("");
    }

    const value = {
        template,
        setTemplate,
        templateFile,
        setTemplateFile,
        contract,
        setContract,
        closeTemplate
    };

    return (
        <TemplateContext.Provider value={value}>
            {children}
        </TemplateContext.Provider>
    );
}

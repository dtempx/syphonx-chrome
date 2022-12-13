import React from "react";
import { useEffect, useState } from "react";
import * as syphonx from "syphonx-lib";
import { Template } from "../lib";

export interface TemplateState {
    template: Template;
    setTemplate: React.Dispatch<React.SetStateAction<Template>>;
    result: syphonx.ExtractResult | undefined;
}

const TemplateContext = React.createContext<TemplateState>({
    template: new Template(),
    setTemplate: () => {},
    result: undefined
});

export function TemplateProvider({ children }: { children: JSX.Element }) {
    const [template, setTemplate] = useState<Template>(new Template());
    const [result, setResult] = useState<syphonx.ExtractResult | undefined>();

    useEffect(() => {
        template.run()
            .then(result => setResult(result));
    }, [template]);

    const value = {
        template,
        setTemplate,
        result
    };

    return (
        <TemplateContext.Provider value={value}>
            {children}
        </TemplateContext.Provider>
    );
}

export function useTemplate() {
    return React.useContext(TemplateContext);
}
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import * as syphonx from "syphonx-lib";
import { Template } from "../../lib";

export interface TemplateState {
    template: Template;
    setTemplate: React.Dispatch<React.SetStateAction<Template>>;
    result: syphonx.ExtractResult | undefined;
    advanced: boolean;
    setAdvanced: React.Dispatch<React.SetStateAction<boolean>>;
}

const TemplateContext = React.createContext<TemplateState>({
    template: new Template(),
    setTemplate: () => {},
    result: undefined,
    advanced: false,
    setAdvanced: () => {}
});

export function TemplateProvider({ children }: { children: JSX.Element }) {
    const [template, setTemplate] = useState<Template>(new Template());
    const [result, setResult] = useState<syphonx.ExtractResult | undefined>();
    const [advanced, setAdvanced] = useState(false);

    useEffect(() => {
        //debugger;
        template.run()
            .then(result => setResult(result));
    }, [template]);

    const value = {
        template,
        setTemplate,
        result,
        advanced,
        setAdvanced
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
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import * as syphonx from "syphonx-lib";
import { Template } from "../lib";

export interface TemplateState {
    template: string;
    setTemplate: React.Dispatch<React.SetStateAction<string>>;
    result: syphonx.ExtractResult | undefined;
}

const TemplateContext = React.createContext<TemplateState>({
    template: "",
    setTemplate: () => {},
    result: undefined
});

export function TemplateProvider({ children }: { children: JSX.Element }) {
    const [template, setTemplate] = useState("");
    const [result, setResult] = useState<syphonx.ExtractResult | undefined>();

    useEffect(() => {
        //debugger;
        const obj = new Template(template);
        obj.run()
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
    return useContext(TemplateContext);
}
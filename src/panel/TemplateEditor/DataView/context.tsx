import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useApp, useTemplate } from "../context";
import { Template } from "../lib";
import * as syphonx from "syphonx-lib";

export interface TemplateDataState {
    result: syphonx.ExtractResult | undefined;
    setResult: React.Dispatch<React.SetStateAction<syphonx.ExtractResult | undefined>>;
}

export function TemplateDataProvider({ children }: { children: JSX.Element }) {
    const [result, setResult] = useState<syphonx.ExtractResult | undefined>();
    const { autoRefresh } = useApp();
    const { template: json } = useTemplate();

    useEffect(() => {
        debugger;
        if (autoRefresh) {
            const obj = new Template(json);
            obj.run()
                .then(result => setResult(result));
        }
    }, [json, autoRefresh]);
 
    const value = {
        result,
        setResult
    };

    return (
        <TemplateDataContext.Provider value={value}>
            {children}
        </TemplateDataContext.Provider>
    );
}

export function useTemplateData() {
    return useContext(TemplateDataContext);
}

export const TemplateDataContext = React.createContext<TemplateDataState>({
    result: undefined,
    setResult: () => {}
});

export * from "../context";
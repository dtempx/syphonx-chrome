import React, { useContext, useEffect, useState } from "react";
import { useApp, useContract, useTemplate } from "../context";
import { Template } from "../lib";
import { applyTemplate } from "./applyTemplate";
import * as syphonx from "syphonx-lib";

export interface TemplateDataState {
    result: syphonx.ExtractResult | undefined;
    setResult: React.Dispatch<React.SetStateAction<syphonx.ExtractResult | undefined>>;
    refresh: () => Promise<void>;
}

export function TemplateDataProvider({ children }: { children: JSX.Element }) {
    const { autoRefresh } = useApp();
    const { contract } = useContract();
    const { template: json } = useTemplate();
    const [result, setResult] = useState<syphonx.ExtractResult | undefined>();

    useEffect(() => {
        if (autoRefresh) {
            const template = new Template(json);
            // only auto refresh if there is a single select action
            if (template.children.length === 1 && template.children[0].name === "select")
                refresh();
        }
    }, [json, autoRefresh]);

    async function refresh() {
        const template = new Template(json);
        if (template.obj.actions instanceof Array && template.obj.actions.length > 0) {
            const result = await applyTemplate(template, contract);
            setResult(result);
        }
        else {
            setResult(undefined);
        }
    }
 
    const value = {
        result,
        setResult,
        refresh
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
    setResult: () => {},
    refresh: async () => {}
});

export * from "../context";
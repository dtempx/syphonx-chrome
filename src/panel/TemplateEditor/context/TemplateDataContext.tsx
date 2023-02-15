import React, { useContext, useEffect, useState } from "react";
import { useApp, useContract, useTemplate } from "../context";
import { background, Template } from "../lib";
import { applyTemplate } from "./applyTemplate";
import * as syphonx from "syphonx-lib";

export interface TemplateDataState {
    result: syphonx.ExtractResult | undefined;
    setResult: React.Dispatch<React.SetStateAction<syphonx.ExtractResult | undefined>>;
    refresh: () => Promise<void>;
    refreshing: boolean;
    simple: boolean;
}

export function TemplateDataProvider({ children }: { children: JSX.Element }) {
    const { autoRefresh } = useApp();
    const { contract } = useContract();
    const { template: json } = useTemplate();
    const [result, setResult] = useState<syphonx.ExtractResult | undefined>();
    const [refreshing, setRefreshing] = useState(false);
    const [simple, setSimple] = useState(true);

    useEffect(() => {
        const template = new Template(json);
        const simple = template.children.length === 0 || (template.children.length === 1 && template.children[0].name === "select");
        setSimple(simple);
        if (autoRefresh && simple) // only auto refresh if there is a single select action
            refresh();
    }, [json, autoRefresh]);

    async function refresh() {
        setResult(undefined);
        const template = new Template(json);
        if (template.obj.actions instanceof Array && template.obj.actions.length > 0) {
            setRefreshing(true);
            if (!refreshing)
                await background.inspectedWindow.reload();
            const result = await applyTemplate(template, contract);
            setResult(result);
        }
        setRefreshing(false);
    }
 
    const value = {
        result,
        setResult,
        refresh,
        refreshing,
        simple
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
    refresh: async () => {},
    refreshing: false,
    simple: true
});
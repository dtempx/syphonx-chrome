import React, { useContext, useEffect, useState } from "react";
import { useApp, useContract, useTemplate } from "../context";
import { background, Template } from "../lib";
import { applyTemplate } from "./applyTemplate";
import * as syphonx from "syphonx-lib";

export interface TemplateDataState {
    extract: syphonx.ExtractResult | undefined;
    setExtract: React.Dispatch<React.SetStateAction<syphonx.ExtractResult | undefined>>;
    refresh: (reload: boolean) => Promise<void>;
    refreshing: boolean;
}

export function TemplateDataProvider({ children }: { children: JSX.Element }) {
    const { autoRefresh } = useApp();
    const { contract } = useContract();
    const { template: json } = useTemplate();
    const [extract, setExtract] = useState<syphonx.ExtractResult | undefined>();
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const template = new Template(json);
        const simple = template.simple();
        if (autoRefresh && simple) // only auto refresh if there is a single select action
            refresh(false);
    }, [json, autoRefresh]);

    async function refresh(reload: boolean) {
        setExtract(undefined);
        const template = new Template(json);
        if (template.obj.actions instanceof Array && template.obj.actions.length > 0) {
            setRefreshing(true);
            if (reload)
                await background.inspectedWindow.reload();
            const result = await applyTemplate(template, contract);
            setExtract(result);
        }
        setRefreshing(false);
    }
 
    const value = {
        extract,
        setExtract,
        refresh,
        refreshing
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
    extract: undefined,
    setExtract: () => {},
    refresh: async () => {},
    refreshing: false
});
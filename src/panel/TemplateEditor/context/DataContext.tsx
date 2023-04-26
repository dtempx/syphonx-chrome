import React, { useEffect, useState } from "react";
import { useApp, useTemplate } from "../context";
import { background, tryParseJson, Template } from "../lib";
import { applyTemplate } from "./applyTemplate";
import { Schema } from "jsonschema";
import * as syphonx from "syphonx-lib";

export interface DataState {
    extract: syphonx.ExtractResult | undefined;
    setExtract: React.Dispatch<React.SetStateAction<syphonx.ExtractResult | undefined>>;
    refresh: (reload: boolean) => Promise<void>;
    refreshing: boolean;
}

export const DataContext = React.createContext<DataState>({
    extract: undefined,
    setExtract: () => {},
    refresh: async () => {},
    refreshing: false
});

export function DataProvider({ children }: { children: JSX.Element }) {
    const { autoRefresh } = useApp();
    const { template: json, contract: contractJson } = useTemplate();
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

            const url = await background.inspectedWindow.url();
            const contract = tryParseJson(contractJson) as Schema | undefined;
            const result = await applyTemplate({ template, contract, url, debug: true });
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
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
}

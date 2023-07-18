import React, { useEffect, useState } from "react";
import { useApp, useTemplate } from "../context";
import { inspectedWindow, tryParseJson, Template } from "../lib";
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
    const { autoRefresh, inspectedWindowUrl } = useApp();
    const { template: json, contract: contractJson } = useTemplate();
    const [extract, setExtract] = useState<syphonx.ExtractResult | undefined>();
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        // message is sent from the content script that forwards the message from the DOM window
        chrome.runtime.onMessage.addListener(listener);
        return () => chrome.runtime.onMessage.removeListener(listener);

        function listener(message: any): void {
            if (message.syphonx)
                setExtract(message.syphonx);
        }
    }, []);

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
                await inspectedWindow.reload();

            const contract = tryParseJson(contractJson) as Schema | undefined;
            applyTemplate(template, contract, inspectedWindowUrl);
        }
        setRefreshing(false);
    }

    async function applyTemplate(template: Template, contract: Schema | undefined, url: string): Promise<void> {
        const script = `(async () => {
            const result = await ${syphonx.script}(${JSON.stringify({ ...template.obj, url, debug: true })})
            window.postMessage({ direction: "syphonx", message: result });
        })()`;

        await inspectedWindow.evaluate(script);
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

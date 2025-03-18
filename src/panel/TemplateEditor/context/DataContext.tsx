import React, { useEffect, useRef, useState } from "react";
import { useApp, useTemplate } from "../context";
import { inspectedWindow, sleep, tryParseJson, validateContract, Template } from "../lib";
import { Schema } from "jsonschema";
import * as syphonx from "syphonx-lib";
import { evaluateFormula } from "syphonx-lib"; //todo: remove this import and uncomment the following import on next syphonx-lib update
//import { expandTemplateUrl } from "syphonx-lib";

export interface DataState {
    extractState: syphonx.ExtractState | undefined;
    extractStatus: syphonx.ExtractStatus | undefined;
    refresh: (reload: boolean) => Promise<void>;
    refreshing: boolean;
    runTemplate: (template: syphonx.Template | syphonx.ExtractState, url?: string) => Promise<void>;
    resetExtractStatus: () => void;
}

export const DataContext = React.createContext<DataState>({
    extractState: undefined,
    extractStatus: undefined,
    refresh: async () => {},
    refreshing: false,
    runTemplate: async () => {},
    resetExtractStatus: () => {}
});

export function DataProvider({ children }: { children: JSX.Element }) {
    const { autoRefresh } = useApp();
    const { template: json, contract: contractJson } = useTemplate();
    const [extractState, setExtractState] = useState<syphonx.ExtractState | undefined>();
    const [extractStatus, setExtractStatus] = useState<syphonx.ExtractStatus | undefined>();
    const [refreshing, setRefreshing] = useState(false);
    const contractJsonRef = useRef(contractJson);

    useEffect(() => {
        contractJsonRef.current = contractJson; // update the ref each time contractJson changes
    }, [contractJson]);

    useEffect(() => {
        // message is sent from backgroud service_worker script which forwards the message from the DOM window
        chrome.runtime.onMessage.addListener(listener);
        return () => chrome.runtime.onMessage.removeListener(listener);

        function listener(message: any): void {
            if (message.syphonx) {
                if (message.syphonx.key === "extract-status") {
                    setExtractStatus(message.syphonx);
                }
                else if (message.syphonx.key === "extract-state") {
                    setExtractState(message.syphonx);
                    onUpdateExtract(message.syphonx);
                }
            }
        }
    }, []);

    useEffect(() => {
        const template = new Template(json);
        const simple = template.simple();
        if (autoRefresh && simple) // only auto refresh if there is a single select action
            refresh(false);
    }, [json, autoRefresh]);

    async function runTemplate(template: syphonx.Template | syphonx.ExtractState, url?: string) {
        if (!url && template.url)
            url = template.url;
        else if (!url)
            return;        

        if (url && url?.includes('<search_phrase>'))
            url = url.replace('<search_phrase>', String(template?.params?.search));

        if (url && url?.includes('$params.search'))
            url = url.replace('$params.search', String(template?.params?.search));
        
        url = expandTemplateUrl(url, template.params);
        await inspectedWindow.navigate(url);
        await onBeginExtract(template, false);
    }

    async function refresh(reload: boolean) {
        try {
            const template = new Template(json); // loads a default template if no json
            if (template.obj.actions instanceof Array && template.obj.actions.length > 0)
                await onBeginExtract(template.obj as syphonx.Template, reload);
        }
        catch (err) {
            console.error(err);
        }
    }

    function resetExtractStatus() {
        setExtractState(undefined);
        setExtractStatus(undefined);
        setRefreshing(false);        
    }

    async function onBeginExtract(template: syphonx.Template | syphonx.ExtractState, reload: boolean): Promise<void> {
        setExtractState(undefined);
        setExtractStatus(undefined);

        // make sure there's a url otherwise it will hang because the listener won't have been added in the service_worker
        const tab = await inspectedWindow.tab();
        const url = tab.url;
        if (!url)
            return; // todo set extract status 

        setRefreshing(true);
        if (reload)
            await inspectedWindow.reload();

        const script = `${syphonx.script}(${JSON.stringify({ ...template, url, debug: true })})`;
        await inspectedWindow.evaluate(script);
    }

    async function onUpdateExtract(state: syphonx.ExtractState): Promise<void> {
        if (state.yield) {
            const params: Record<string, any> = state.yield.params || {};
            if (params.goback) {
                //todo consider how to implement timeout, waitUntil
                await inspectedWindow.goBack();
            }
            else if (params.locators) {
                //todo consider how to implement locators
                const locator = params.locator;
                if (locator?.name?.startsWith("_") && locator.selector && locator.method) {
                    let value: any = "";
                    if (locator.method?.startsWith("all"))
                        value = [];
                    state.vars._value = value;
                }
            }
            else if (params.navigate) {
                //todo consider how to implement timeout, waitUntil
                await inspectedWindow.navigate(params.navigate.url);
            }
            else if (params.reload) {
                //todo consider how to implement timeout, waitUntil
                await inspectedWindow.reload();
            }
            else {
                // todo consider how to implement waitUntil
                await sleep(1000);
                if (params.action === "locator") {
                    let value: any = "";
                    if (params.method?.startsWith("all"))
                        value = [];
                    state.vars._value = value;
                }
            }
            const script = `${syphonx.script}(${JSON.stringify({ ...state, debug: true })})`;
            await inspectedWindow.evaluate(script);
        }
        else {
            const contract = tryParseJson(contractJsonRef.current) as Schema | undefined;
            if (contract) {
                const obj = { ...state };
                validateContract(contract, obj);
                setExtractState(obj);
            }
            setRefreshing(false);
        }
    }

    const value = {
        extractState,
        extractStatus,
        refresh,
        refreshing,
        runTemplate,
        resetExtractStatus
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

//todo: remove this function on next syphonx-lib update
function isFormula(value: unknown): boolean {
    return typeof value === "string" && value.startsWith("{") && value.endsWith("}");
}

//todo: remove this function on next syphonx-lib update
function expandTemplateUrl(url: string, params?: Record<string, unknown>): string {
    if (isFormula(url))
        url = encodeURI(evaluateFormula(url.slice(1, -1), { params }) as string);
    return url;
}

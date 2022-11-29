import React, { useEffect, useMemo, useState } from "react";
import { formatTemplate, runTemplate, tryParseTemplate } from "./common";
import * as syphonx from "syphonx-lib";

export interface Template {
    actions: syphonx.Action[];
}

export interface TemplateState {
    template: Template | undefined;
    text: string;
    selected: string;
    selectedObj: syphonx.Select | undefined;
    result: syphonx.ExtractResult | undefined;
    error: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
    setSelectedObj: (obj: Record<string, unknown>) => void;
    setError: React.Dispatch<React.SetStateAction<string>>;
    updateTemplate: () => void;
}

const TemplateContext = React.createContext<TemplateState>({} as TemplateState);

export function useTemplate() {
    return React.useContext(TemplateContext);
}

export function TemplateProvider({ children }: { children: JSX.Element }) {
    const [text, setText] = useState("");
    const [selected, setSelected] = useState("");
    const [error, setError] = useState("");
    const [result, setResult] = useState<syphonx.ExtractResult | undefined>();

    const template = useMemo(() => {
        const result = tryParseTemplate(text);
        if (result.template) {
            setError("");
            return result.template;
        }
        else {
            setError(result.err instanceof Error ? result.err.message : JSON.stringify(result.err));
        }
    }, [text]);

    const selectedObj = useMemo(() => {
        if (template) {
            const key = selected.split(".").at(-1);
            const target = (template.actions.find(action => !!(action as syphonx.SelectAction).select) as syphonx.SelectAction | undefined)?.select?.find(obj => obj.name === key);
            return target;
        }
    }, [template, selected]);

    useEffect(() => {
        runTemplate(template)
            .then(result => setResult(result))
            .catch(err => setError(err instanceof Error ? err.message: JSON.stringify(err)));
    }, [template]);

    function setSelectedObj(obj: Record<string, unknown>): void {
        for (const key of Object.keys(obj)) {
            (selectedObj as Record<string, unknown>)[key] = obj[key];
        }
        setText(formatTemplate(template));
    }

    function updateTemplate() {
        setText(formatTemplate(template));
    }

    const value = {
        template,
        text,
        selected,
        selectedObj,
        result,
        error,
        setText,
        setSelected,
        setSelectedObj,
        setError,
        updateTemplate
    };

    return (
        <TemplateContext.Provider value={value}>
            {children}
        </TemplateContext.Provider>
    );
}
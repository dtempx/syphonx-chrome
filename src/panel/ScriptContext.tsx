import React, { useEffect, useMemo, useState } from "react";
import { formatScript, runScript, tryParseJSON } from "./common";
import * as syphonx from "syphonx-core";

const defaultScript = formatScript({
    "actions": [
        {
            "select": [
                {
                    "name": "title",
                    "type": "string",
                    "$": [["h1"]]
                },
                {
                    "name": "href",
                    "type": "string",
                    "$": [["a",["attr","href"]]]
                }
            ]
        }
    ]
} as Script);

export interface Script {
    actions: syphonx.Action[];
}

export interface ScriptState {
    script: Script | undefined;
    text: string;
    selected: string;
    selectedObj: syphonx.Select | undefined;
    result: syphonx.ExtractResult | undefined;
    setText: React.Dispatch<React.SetStateAction<string>>;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
    setSelectedObj: (obj: Record<string, unknown>) => void;
    updateScript: () => void;
}

const ScriptContext = React.createContext<ScriptState>({} as ScriptState);

export function useScript() {
    return React.useContext(ScriptContext);
}

export function ScriptProvider({ children }: { children: JSX.Element }) {
    const [text, setText] = useState(defaultScript);
    const [selected, setSelected] = useState("");
    const [result, setResult] = useState<syphonx.ExtractResult | undefined>();

    const script = useMemo(() => {
        return tryParseJSON(text) as Script || undefined;
    }, [text]);

    const selectedObj = useMemo(() => {
        if (script) {
            const key = selected.split(".").at(-1);
            const target = (script.actions.find(action => !!(action as syphonx.SelectAction).select) as syphonx.SelectAction | undefined)?.select?.find(obj => obj.name === key);
            return target;
        }
    }, [script, selected]);

    useEffect(() => {
        runScript(script).then(result => setResult(result));
    }, [script]);

    function setSelectedObj(obj: Record<string, unknown>): void {
        for (const key of Object.keys(obj)) {
            (selectedObj as Record<string, unknown>)[key] = obj[key];
        }
        setText(formatScript(script));
    }

    function updateScript() {
        setText(formatScript(script));
    }

    const value = {
        script,
        text,
        selected,
        selectedObj,
        result,
        setText,
        setSelected,
        setSelectedObj,
        updateScript
    };

    return (
        <ScriptContext.Provider value={value}>
            {children}
        </ScriptContext.Provider>
    );
}
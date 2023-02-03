import React, { useContext, useEffect, useState } from "react";
import { Validator } from "jsonschema";
import { useApp, useContract, useTemplate } from "../context";
import { removeDOMRefs, snakeify, Template } from "../lib";
import * as syphonx from "syphonx-lib";

export interface TemplateDataState {
    result: syphonx.ExtractResult | undefined;
    setResult: React.Dispatch<React.SetStateAction<syphonx.ExtractResult | undefined>>;
}

export function TemplateDataProvider({ children }: { children: JSX.Element }) {
    const { autoRefresh } = useApp();
    const { contract } = useContract();
    const { template: json } = useTemplate();
    const [result, setResult] = useState<syphonx.ExtractResult | undefined>();

    useEffect(() => {
        if (autoRefresh) {
            const template = new Template(json);
            if (template.obj.actions instanceof Array) {
                template.run()
                .then(result => {
                    if (result?.data && contract) {
                        const validator = new Validator();
                        const data = removeDOMRefs(result.data);
                        const { errors } = validator.validate(data, contract);
                        for (const error of errors) {
                            const code = `contract-${snakeify(error.name)}` as syphonx.ExtractErrorCode;
                            const message = error.stack.replace(/^(instance\b)/, "Object");
                            result.errors.push({ code, message, level: 1 });
                        }
                    }
                    setResult(result);
                });
            }
            else {
                setResult(undefined);
            }
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
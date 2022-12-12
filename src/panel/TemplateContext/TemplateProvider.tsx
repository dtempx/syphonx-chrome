import React from "react";
import { useEffect, useMemo, useState } from "react";
import * as syphonx from "syphonx-lib";
import { Template } from "../../lib";
import { TemplateContext } from "./TemplateContext";
import { defaultTemplate } from "./defaultTemplate";

export function TemplateProvider({ children }: { children: JSX.Element }) {
    const [text, setText] = useState(defaultTemplate);
    const [selected, setSelected] = useState("");
    const [result, setResult] = useState<syphonx.ExtractResult | undefined>();

    const template = useMemo(() => (new Template(text)), [text]);

    useEffect(() => {
        if (template)
            template.run()
                .then(result => setResult(result));
        else
            setResult(undefined);
    }, [template]);

    function updateTemplate() {
        if (template)
            setText(template.json());
    }

    const value = {
        template,
        text,
        selected,
        result,
        setText,
        setSelected,
        updateTemplate
    };

    return (
        <TemplateContext.Provider value={value}>
            {children}
        </TemplateContext.Provider>
    );
}
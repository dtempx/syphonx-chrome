import React, { useMemo } from "react";
import { useApp, useTemplate } from "../../../context";
import { formatTemplateJson, Template } from "../../lib";

export default () => {
    const { template: json } = useTemplate();
    const { debug } = useApp();

    const code = useMemo(() => {
        const template = new Template(json);
        const item = template.selected();
        if (item) {
            const code = JSON.stringify(item, (key, value) => key === "parent" ? value?.key : key === "children" ? value?.length : value, 2);
            return formatTemplateJson(code);
        }
    }, [json]);

    return code && debug ? (
        <pre
            style={{
                fontFamily: "monospace",
                fontSize: "small",
                lineHeight: "12px",
                backgroundColor: "#eee",
                overflow: "scroll"
            }}
        >{code}</pre>
    ) : null;
};
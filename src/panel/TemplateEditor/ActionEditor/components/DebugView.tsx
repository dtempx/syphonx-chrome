import React, { useMemo } from "react";
import { useApp, useTemplate } from "../../../context";
import { Template } from "../../lib";

export default () => {
    const { template: json } = useTemplate();
    const { debug } = useApp();

    const item = useMemo(() => {
        const template = new Template(json);
        const item = template.selected();
        return item;
    }, [json]);

    return item && debug ? (
        <pre
            style={{
                fontFamily: "monospace",
                fontSize: "small",
                lineHeight: "12px",
                backgroundColor: "#eee",
                overflow: "scroll"
            }}
        >
            {JSON.stringify(item, (key, value) => key === "parent" ? value?.key : key === "children" ? value?.length : value, 2)}
        </pre>
    ) : null;
};
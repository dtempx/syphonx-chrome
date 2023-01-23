import React from "react";
import { useTemplate } from "../../context";
import { Template } from "../../../lib";

export default () => {
    const { template: obj } = useTemplate();
    const template = new Template(obj);
    const item = template.selected();

    return item ? (
        <pre style={{
            fontFamily: "monospace",
            fontSize: "small",
            lineHeight: "12px",
            height: 200,
            backgroundColor: "#eee",
            overflow: "scroll"
        }}>
            {JSON.stringify(item, (key, value) => key === "parent" ? value?.key : key === "children" ? value?.length : value, 2)}
        </pre>
    ) : null;
};
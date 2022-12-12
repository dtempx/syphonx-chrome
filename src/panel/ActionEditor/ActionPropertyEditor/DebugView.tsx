import React from "react";
import { TemplateItem } from '../../TemplateContext/index';

export interface Props {
    item?: TemplateItem;
}

export default ({ item }: Props) => (
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
);
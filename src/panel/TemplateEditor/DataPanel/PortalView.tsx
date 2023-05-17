import React from "react";
import { useApp, useTemplate } from "../context";
import { Template } from "../lib";

export default () => {
    const { portal } = useApp();
    const { template: json, templateFile } = useTemplate();
    const template = new Template(json);
    const params = new URLSearchParams({ ...template.obj.params, template: templateFile }).toString();
    const url = `${portal?.views?.panel}?${params}`;

    return (
        <iframe src={url} width="100%" height="100%" />
    );
}
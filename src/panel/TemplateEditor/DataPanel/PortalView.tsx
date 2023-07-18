import React from "react";
import { useApp, useTemplate } from "../context";
import { Template } from "../lib";
import { Box, Typography } from "@mui/material";

export default () => {
    const { portal, debug, inspectedWindowUrl } = useApp();
    const { template: json, templateFile } = useTemplate();
    const template = new Template(json);
    const obj = portal?.views?.panel ? Object.fromEntries(new URL(portal.views.panel).searchParams) : undefined;
    const params = new URLSearchParams({
        ...obj,
        ...template.obj.params,
        template: templateFile,
        url: inspectedWindowUrl
    }).toString();
    const url = `${portal?.views?.panel}?${params}`;

    return (
        <Box>
            <iframe src={url} width="100%" height="600px" />
            {debug && <Typography variant="caption" fontSize="small">{url}</Typography>}
        </Box>
    );
}
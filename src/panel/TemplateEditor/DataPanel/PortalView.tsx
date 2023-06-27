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
    // const url = `${portal?.views?.panel}?${params}`;
    
    const seller_id = !!template?.obj?.params?.seller_id ? String(template?.obj?.params?.seller_id) : '';
    const look_id = templateFile?.match('product_search') ? '1459' : '1458'; // 1458 = product_page, 1459 = product_search
    const url = `${portal?.views?.panel}&hide_filter=Retailer+ID`.replace('look_id', look_id).replace('seller_id', seller_id);

    return (
        <Box>
            <iframe src={url} width="100%" height="600px" />
            {debug && <Typography variant="caption" fontSize="small">{url}</Typography>}
        </Box>
    );
}
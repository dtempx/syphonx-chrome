import React, { useEffect, useState } from "react";
import { useApp, useTemplate, useUser } from "../context";
import { Template } from "../lib";
import { Box, Typography } from "@mui/material";
import { load } from "../lib/cloud/looker";

export default () => {
    const { debug, inspectedWindowUrl } = useApp();
    const { portal } = useUser();
    const { template: json, templateFile } = useTemplate();
    const template = new Template(json);
    const obj = portal?.views?.panel ? Object.fromEntries(new URL(portal.views.panel).searchParams) : undefined;
    const params = new URLSearchParams({
        ...obj,
        ...template.obj.params,
        template: templateFile,
        url: inspectedWindowUrl
    }).toString();
    const [ embedUrl, setEmbedUrl ] = useState<string>();

    useEffect(() => {
        (async () => {
            try {
                const lookId = portal?.looks?.panel;
                if (lookId) {
                    const seller_id = !!template?.obj?.params?.seller_id ? String(template?.obj?.params?.seller_id) : "";
                    const filters = seller_id ? { "Retailer ID": seller_id, "Seller ID": seller_id } : undefined;
                    const url = await load(lookId, filters);
                    if (url)
                        setEmbedUrl(url);
                } else {
                    const url = /looker/.test(portal?.views?.panel || "") ? portal?.views?.panel : `${portal?.views?.panel}?${params}`;
                    setEmbedUrl(url);
                }
            } catch (e) {
            }
        })()
    }, [templateFile]);

    return (
        <Box>
            <iframe src={embedUrl} width="100%" height="800px" />
            {debug && <Typography variant="caption" fontSize="small">{embedUrl}</Typography>}
        </Box>
    );
}
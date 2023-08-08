import React, { useEffect, useState } from "react";
import { useApp, useTemplate, useUser } from "../context";
import { Template } from "../lib";
import { load } from "../lib/cloud/looker";

import {
    TitleBar,
    TransitionUp
} from "../components";

import {
    Dialog,
    DialogContent,
    DialogTitle,
    Typography
} from "@mui/material";

export interface Props {
    open: boolean;
    onClose: (event: React.SyntheticEvent) => void;
}

export default ({ open, onClose }: Props) => {
    const { debug, inspectedWindowUrl } = useApp();
    const { template: json, templateFile } = useTemplate();
    const { portal } = useUser();
    const template = new Template(json);
    const obj = portal?.views?.full ? Object.fromEntries(new URL(portal.views.full).searchParams) : undefined;
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
                const lookId = portal?.looks?.full;
                if (lookId) {
                    const url = await load(lookId);
                    if (url)
                        setEmbedUrl(url);
                } else {
                    const url = /looker/.test(portal?.views?.full || "") ? portal?.views?.full : `${portal?.views?.full}?${params}`;
                    setEmbedUrl(url);
                }
            } catch (e) {
            }
        })()
    }, []);

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            TransitionComponent={TransitionUp}
        >
            <DialogTitle sx={{ p: 0 }}>
                <TitleBar title="Portal" onClose={onClose} />
            </DialogTitle>

            <DialogContent>
                {embedUrl &&
                    <>
                        <iframe src={embedUrl} width="100%" height="100%" />
                        {debug && <Typography variant="caption" fontSize="small">{embedUrl}</Typography>}
                    </>
                }
            </DialogContent>
        </Dialog>
    );
};
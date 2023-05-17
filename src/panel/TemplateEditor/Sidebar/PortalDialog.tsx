import React from "react";
import { useApp, useTemplate } from "../context";
import { Template } from "../lib";

import {
    TitleBar,
    TransitionUp
} from "../components";

import {
    Dialog,
    DialogContent,
    DialogTitle
} from "@mui/material";

export interface Props {
    open: boolean;
    onClose: (event: React.SyntheticEvent) => void;
}

export default ({ open, onClose }: Props) => {
    const { portal } = useApp();
    const { template: json, templateFile } = useTemplate();
    const template = new Template(json);
    const params = new URLSearchParams({ ...template.obj.params, template: templateFile }).toString();
    const url = `${portal?.views?.full}?${params}`;

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
                <iframe src={url} width="100%" height="100%" />
            </DialogContent>
        </Dialog>
    );
};
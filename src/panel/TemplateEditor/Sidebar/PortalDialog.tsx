import React from "react";
import { useApp, useTemplate } from "../context";

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
    const { debug } = useApp();
    const { dialogUrl } = useTemplate();

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
                <iframe src={dialogUrl} width="100%" height="100%" />
                {debug && <Typography variant="caption" fontSize="small">{dialogUrl}</Typography>}
            </DialogContent>
        </Dialog>
    );
};
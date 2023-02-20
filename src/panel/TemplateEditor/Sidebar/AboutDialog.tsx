import React from "react";
import { TitleBar, TransitionUp } from "../components";

import {
    Dialog,
    DialogContent,
    DialogTitle,
    Link,
    Typography
} from "@mui/material";

export interface Props {
    open: boolean;
    onClose: (event: React.SyntheticEvent) => void;
}

export default ({ open, onClose }: Props) => {
    const manifest = chrome.runtime.getManifest();
    return (
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            TransitionComponent={TransitionUp}
        >
            <DialogTitle sx={{ p: 0 }}>
                <TitleBar title="SyphonX" onClose={onClose} />
            </DialogTitle>

            <DialogContent sx={{ mt: 4 }}>
                <Typography>Version {manifest.version}</Typography>
                <Link href="https://github.com/dtempx/syphonx-chrome" target="_blank">https://github.com/dtempx/syphonx-chrome</Link>
            </DialogContent>
        </Dialog>
    );
};
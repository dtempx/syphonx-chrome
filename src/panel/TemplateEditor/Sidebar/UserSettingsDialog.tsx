import React from "react";
import { TitleBar, TransitionUp } from "../components";

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from "@mui/material";


export interface Props {
    open: boolean;
    onClose: (event: React.SyntheticEvent) => void;
}

export default ({ open, onClose }: Props) => {
    return (
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            TransitionComponent={TransitionUp}
        >
            <DialogTitle sx={{ p: 0 }}>
                <TitleBar title="User Settings" onClose={onClose} />
            </DialogTitle>

            <DialogContent sx={{ p: 0 }}>
            </DialogContent>

            <DialogActions>
            </DialogActions>
        </Dialog>
    );
};
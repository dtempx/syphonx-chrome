import React from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from "@mui/material";

interface Props {
    title: JSX.Element | string;
    message: JSX.Element | string;
    open: boolean;
    onClose: (event: {}, confirmed: boolean) => void;
}

export default ({ title, message, open, onClose }: Props) => (
    <Dialog
        open={open}
        onClose={event => onClose(event, false)}
    >
        <DialogTitle color="primary">{title}</DialogTitle>
        <DialogContent>{message}</DialogContent>
        <DialogActions>
            <Button onClick={event => onClose(event, true)} autoFocus>Yes</Button>
            <Button onClick={event => onClose(event, false)}>No</Button>
        </DialogActions>
    </Dialog>
);

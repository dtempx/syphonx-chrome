import React from "react";
import { Alert, Collapse, IconButton, SxProps, Theme } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

export interface Props {
    message: JSX.Element | string;
    open?: boolean;
    onClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    sx?: SxProps<Theme>;
}

export default ({ message, open = !!message, onClose, sx }: Props) => (
    <Collapse in={open} sx={sx}>
        <Alert
            severity="error"
            sx={{ w: 1 }}
            action={
                <IconButton
                    color="inherit"
                    size="small"
                    onClick={onClose}
                >
                    <CloseIcon fontSize="inherit" />
                </IconButton>
            }
        >
            {message}
        </Alert>
    </Collapse>
);
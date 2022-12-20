import React from "react";
import { AppBar, IconButton, SxProps, Theme, Toolbar, Typography } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

export interface Props {
    title: JSX.Element | string;
    onClose: (event: React.SyntheticEvent) => void;
    sx?: SxProps<Theme>;
}

export default ({ title, onClose, sx }: Props) => (
    <AppBar sx={{ ...sx, position: "relative" }}>
        <Toolbar>
            <IconButton
                edge="start"
                color="inherit"
                onClick={onClose}
                aria-label="close"
            >
                <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }}>
                {title}
            </Typography>
        </Toolbar>
    </AppBar>
);
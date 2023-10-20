import React from "react";

import {
    AppBar,
    IconButton,
    SxProps,
    Theme,
    Toolbar,
    Typography
} from "@mui/material";

import {
    Close as CloseIcon,
    Menu as MenuIcon
} from "@mui/icons-material";

export interface Props {
    title: JSX.Element | string;
    menu?: MenuItem[];
    onClose: (event: React.SyntheticEvent) => void;
    sx?: SxProps<Theme>;
}

export interface MenuItem {
    name: JSX.Element | string;
    onClick: (event: React.SyntheticEvent) => void;
}

export default ({ title, menu, onClose, sx }: Props) => (
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
            {menu && menu.length > 0 &&
                <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                >
                    <MenuIcon />
                </IconButton>
            }
        </Toolbar>
    </AppBar>
);
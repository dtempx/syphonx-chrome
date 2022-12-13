import React from "react";
import { AppBar, Dialog, IconButton, List, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material";
import { TransitionUp } from "../../components";
import * as Icons from "@mui/icons-material";

export interface Props {
    open: boolean;
    onClose: (event: React.KeyboardEvent | React.MouseEvent | {}) => void
}

export default ({ open, onClose }: Props) => (
    <Dialog
        fullScreen
        open={open}
        onClose={onClose}
        TransitionComponent={TransitionUp}
    >
        <AppBar sx={{ position: "relative" }}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={event => onClose(event)}
                    aria-label="close"
                >
                    <Icons.Close />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                    Open File
                </Typography>
            </Toolbar>
        </AppBar>
        <List>
            <ListItemButton>
                <ListItemText primary="example1" />
            </ListItemButton>
            <ListItemButton>
                <ListItemText primary="example2" />
            </ListItemButton>
            <ListItemButton>
                <ListItemText primary="example3" />
            </ListItemButton>
        </List>
    </Dialog>
);
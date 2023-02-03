import React, { useState } from "react";
import { useTemplate } from "../context";
import { Template, TemplateItem } from "../lib";

import {
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem
} from "@mui/material";

import {
    Menu as MenuIcon,
    ArrowUpward as MoveUpIcon,
    ArrowDownward as MoveDownIcon,
    ContentCopy as DuplicateIcon,
    DeleteOutlined as DeleteIcon
}
from "@mui/icons-material";

export interface Props {
    item: TemplateItem;
}

export default ({ item }: Props) => {
    const [anchor, setAnchor] = useState<HTMLElement | undefined>();
    const { template: json, setTemplate } = useTemplate();
    const template = new Template(json);
    const open = !!anchor;

    return (
        <>
            <IconButton
                size="small"
                onClick={event => setAnchor(event.currentTarget)}
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
            >
                <MenuIcon fontSize="small" sx={{ color: "primary.light" }} />
            </IconButton>
            <Menu
                anchorEl={anchor}
                open={open}
                onClose={() => setAnchor(undefined)}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
            >
                <MenuItem onClick={() => {
                    template.moveItemUp(item);
                    setTemplate(template.json());
                    setAnchor(undefined);
                }}>
                    <ListItemIcon><MoveUpIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>Move Up</ListItemText>
                </MenuItem>

                <MenuItem onClick={() => {
                    template.moveItemDown(item);
                    setTemplate(template.json());
                    setAnchor(undefined);
                }}>
                    <ListItemIcon><MoveDownIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>Move Down</ListItemText>
                </MenuItem>

                <MenuItem onClick={() => {
                    template.duplicateItem(item);
                    setTemplate(template.json());
                    setAnchor(undefined);
                }}>
                    <ListItemIcon><DuplicateIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>Duplicate</ListItemText>
                </MenuItem>

                <MenuItem onClick={() => {
                    template.removeItem(item);
                    setTemplate(template.json());
                    setAnchor(undefined);
                }}>
                    <ListItemIcon><DeleteIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
};
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
    const open = !!anchor;

    const { template: json, setTemplate } = useTemplate();
    const template = new Template(json);

    function handleMoveUp() {
        template.moveItemUp(item);
        setTemplate(template.toString());
        setAnchor(undefined);
    }

    function handleMoveDown() {
        template.moveItemDown(item);
        setTemplate(template.toString());
        setAnchor(undefined);
    }

    function handleDuplicate() {
        template.duplicateItem(item);
        setTemplate(template.toString());
        setAnchor(undefined);
    }

    function handleDelete() {
        template.removeItem(item);
        setTemplate(template.toString());
        setAnchor(undefined);
    }

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
                <MenuItem onClick={handleMoveUp}>
                    <ListItemIcon><MoveUpIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>Move Up</ListItemText>
                </MenuItem>

                <MenuItem onClick={handleMoveDown}>
                    <ListItemIcon><MoveDownIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>Move Down</ListItemText>
                </MenuItem>

                <MenuItem onClick={handleDuplicate}>
                    <ListItemIcon><DuplicateIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>Duplicate</ListItemText>
                </MenuItem>

                <MenuItem onClick={handleDelete}>
                    <ListItemIcon><DeleteIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
};
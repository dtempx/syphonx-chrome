import React, { useState } from "react";
import { Divider, Fab, Menu, MenuItem, SxProps, Theme, Tooltip, Typography } from "@mui/material";
import { Add as AddIcon, KeyboardDoubleArrowRight as ExpandIcon, KeyboardDoubleArrowLeft as CollapseIcon } from "@mui/icons-material";
import { useTemplate } from "../../context";
import { TemplateAddItemType } from "../../../lib";
import ActionIcon from "../ActionIcon";
import types from "./types.json";

export interface Props {
    sx?: SxProps<Theme>;
}

export default (props?: Props) => {
    const { template, setTemplate } = useTemplate();
    const [open, setOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [anchor, setAnchor] = useState<Element | undefined>();

    const item = template.selectedItem();
    const addSubItem = item?.type === "action" && item?.name === "select";

    function handleAddButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        setAnchor(event.currentTarget);
        setOpen(true);
    }

    function addAction(type: TemplateAddItemType) {
        if (template) {
            debugger;
            template.addAction(type);
            setTemplate(template.clone());
            setOpen(false);
        }
    }

    function addSelector() {
        if (template) {
            debugger;
            template.addSelector();
            setTemplate(template.clone());
            setOpen(false);
        }
    }

    return (<>
        <Fab
            {...props}
            size="small"
            color="secondary"
            onClick={handleAddButtonClick}
        >
            <AddIcon />
        </Fab>
        <Menu
            anchorEl={anchor}
            open={open}
            onClose={() => setOpen(false)}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
        >
            {types
                .filter(type => expanded || !type.advanced)
                .map(type => (
                    <Tooltip title={type.help} arrow placement="right">
                        <MenuItem onClick={() => addAction(type.name as TemplateAddItemType)}><ActionIcon name={type.name} fontSize="small" /><Typography sx={{ ml: 1 }}>{type.name}</Typography></MenuItem>
                    </Tooltip>
            ))}
            <Divider />
            {addSubItem ? (
                <MenuItem onClick={() => addSelector()}><AddIcon fontSize="small" /><Typography sx={{ ml: 1 }}>Add Selector</Typography></MenuItem>
            ) : null}
            {expanded ? (
                <MenuItem onClick={() => setExpanded(false)}><CollapseIcon fontSize="small" /><Typography sx={{ ml: 1 }}>Less</Typography></MenuItem>
            ) : (
                <MenuItem onClick={() => setExpanded(true)}><ExpandIcon fontSize="small" /><Typography sx={{ ml: 1 }}>More</Typography></MenuItem>
            )}
        </Menu>
    </>);
}
import React, { useState } from "react";
import { Divider, Fab, Menu, MenuItem, SxProps, Theme, Typography } from "@mui/material";
import { Add as AddIcon, KeyboardDoubleArrowRight as MenuExpandedIcon, KeyboardDoubleArrowLeft as MenuCollapsedIcon } from "@mui/icons-material";
import { useTemplate } from '../context';
import { TemplateAddItemType } from "../../lib";
import ActionIcon from "./ActionIcon";

export interface Props {
    sx?: SxProps<Theme>;
}

export default (props?: Props) => {
    const { template, setTemplate } = useTemplate();
    const [open, setOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [anchor, setAnchor] = useState<Element | undefined>();

    const types: TemplateAddItemType[] = expanded ? ["click", "each", "error", "repeat", "select", "snooze", "transform", "waitfor", "yield"] : ["select", "waitfor", "click"];
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
            {types.map(type => (
                <MenuItem onClick={() => addAction(type)}><ActionIcon name={type} /><Typography sx={{ ml: 1 }}>{type}</Typography></MenuItem>
            ))}
            <Divider />
            {addSubItem ? (
                <MenuItem onClick={() => addSelector()}><ActionIcon name="string" /><Typography sx={{ ml: 1 }}>Add Selector</Typography></MenuItem>
            ) : null}
            {expanded ? (
                <MenuItem onClick={() => setExpanded(false)}><MenuCollapsedIcon /><Typography sx={{ ml: 1 }}>Less</Typography></MenuItem>
            ) : (
                <MenuItem onClick={() => setExpanded(true)}><MenuExpandedIcon /><Typography sx={{ ml: 1 }}>More</Typography></MenuItem>
            )}            
        </Menu>
    </>);
}
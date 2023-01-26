import React, { useState } from "react";
import { useTemplate } from "../../context";
import { Template, TemplateAddItemType } from "../../../lib";
import ActionIcon from "../ActionIcon";
import ActionTypes from "./types.json";

import {
    Divider,
    Fab,
    Menu,
    MenuItem,
    SxProps,
    Theme,
    Tooltip,
    Typography
} from "@mui/material";

import {
    Add as AddIcon,
    KeyboardDoubleArrowRight as ExpandIcon,
    KeyboardDoubleArrowLeft as CollapseIcon
} from "@mui/icons-material";

export interface Props {
    sx?: SxProps<Theme>;
}

export default (props?: Props) => {
    const { template: json, setTemplate } = useTemplate();
    const [open, setOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [anchor, setAnchor] = useState<Element | undefined>();

    const template = new Template(json);
    const types = expanded ? ActionTypes.sort((a, b) => a.name.localeCompare(b.name)) : ActionTypes.filter(type => expanded || !type.advanced);

    function handleAddButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        setAnchor(event.currentTarget);
        setOpen(true);
    }

    function addAction(type: TemplateAddItemType) {
        if (template) {
            template.addAction(type);
            setTemplate(template.toString());
            setOpen(false);
        }
    }

    function addSubAction() {
        if (template) {
            template.addSubAction();
            setTemplate(template.toString());
            setOpen(false);
        }
    }

    return (
        <>
            <Tooltip
                arrow
                placement="left"
                title="Click here to add the first action"
                //open={template.empty()}
                sx={{
                    animation: "pulse 1s infinite ease-in-out",
                    "@keyframes pulse": {
                        "0%": {
                            opacity: 0.5
                        },
                        "100%": {
                            opacity: 1.0
                        }
                    }
                }}
            >
                <Fab
                    {...props}
                    size="small"
                    color="secondary"
                    onClick={handleAddButtonClick}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>
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
                    <Tooltip title={type.help} arrow placement="right">
                        <MenuItem onClick={() => addAction(type.name as TemplateAddItemType)}>
                            <ActionIcon name={type.name} fontSize="small" />
                            <Typography sx={{ ml: 1 }}>{type.name}</Typography>
                        </MenuItem>
                    </Tooltip>
                ))}
                <Divider />
                {template.canAddSubAction() ? (
                    <Tooltip title="Add a selector" arrow placement="right">
                        <MenuItem onClick={() => addSubAction()}>
                            <AddIcon fontSize="small" />
                            <Typography sx={{ ml: 1 }}>Add Selector</Typography>
                        </MenuItem>
                    </Tooltip>
                ) : null}
                {expanded ? (
                    <Tooltip title="Hide advanced actions" arrow placement="right">
                        <MenuItem onClick={() => setExpanded(false)}>
                            <CollapseIcon fontSize="small" />
                            <Typography sx={{ ml: 1 }}>Less</Typography>
                        </MenuItem>
                    </Tooltip>
                ) : (
                    <Tooltip title="Show advanced actions" arrow placement="right">
                        <MenuItem onClick={() => setExpanded(true)}>
                            <ExpandIcon fontSize="small" />
                            <Typography sx={{ ml: 1 }}>More</Typography>
                        </MenuItem>
                    </Tooltip>
                )}
            </Menu>
        </>
    );
}
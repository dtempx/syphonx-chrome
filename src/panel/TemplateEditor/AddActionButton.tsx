import React, { useState } from "react";
import { useApp, useTemplate } from "./context";
import { Template, TemplateAction } from "./lib";
import { AddSelectorDialog } from "./ActionEditor/components";
import ActionIcon from "./ActionIcon";

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

const ActionTypes: Array<{ name: TemplateAction, advanced: boolean, help: string }> = [
    {
        name: "select",
        advanced: false,
        help: "Select data on the page."
    },
    {
        name: "click",
        advanced: false,
        help: "Click on an element on the page."
    },
    {
        name: "waitfor",
        advanced: false,
        help: "Wait for an element to appear on a page."
    },
    { 
        name: "break",
        advanced: true,
        help: "Break out of the current each or repeat loop."
    },
    {
        name: "each",
        advanced: true,
        help: "Run a set of actions for each element in the set of matched elements."
    },
    {
        name: "error",
        advanced: true,
        help: "Raise an error."
    },
    {
        name: "repeat",
        advanced: true,
        help: "Repeat a set of actions until a condition is met."
    },
    {
        name: "scroll",
        advanced: true,
        help: "Scroll to the top or bottom of the page, or to an element."
    },
    {
        name: "snooze",
        advanced: true,
        help: "Snooze for a set period of time."
    },
    {
        name: "transform",
        advanced: true,
        help: "Transform content on the page."
    },
    {
        name: "yield",
        advanced: true,
        help: "Yield back to the host, for example after a click that renavigates the page."
    }
];

export default (props?: Props) => {
    const { advanced } = useApp();
    const { template: json, setTemplate } = useTemplate();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuExpanded, setMenuExpanded] = useState(false);
    const [anchor, setAnchor] = useState<Element | undefined>();

    const actions = advanced || menuExpanded ? ActionTypes.sort((a, b) => a.name.localeCompare(b.name)) : ActionTypes.filter(type => menuExpanded || !type.advanced);
    const template = new Template(json);

    function onAdd(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        const selected = template.selected();
        if (selected?.type === "select") {
            setDialogOpen(true);
        }
        else {
            const added = template.addItem();
            if (added) {
                setTemplate(template.json());
            }
            else {
                setAnchor(event.currentTarget);
                setMenuOpen(true);    
            }
        }
    }

    function onMenu(event: React.MouseEvent<HTMLLIElement, MouseEvent>, action: TemplateAction): void {
        const selected = template.selected();
        if (action === "select" && selected?.type === "action" && selected?.name === "select") {
            setDialogOpen(true);
            setMenuOpen(false);
        }
        else {
            template.addItem(action);
            setTemplate(template.json());
            setMenuOpen(false);
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
                    onClick={onAdd}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>
            <Menu
                anchorEl={anchor}
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
            >
                {actions.map(action => (
                    <Tooltip title={action.help} arrow placement="right">
                        <MenuItem onClick={event => onMenu(event, action.name)}>
                            <ActionIcon name={action.name} fontSize="small" />
                            <Typography sx={{ ml: 1 }}>{action.name}</Typography>
                        </MenuItem>
                    </Tooltip>
                ))}

                {!advanced && (
                    <Divider />
                )}

                {!advanced && menuExpanded && (
                    <Tooltip title="Hide advanced actions" arrow placement="right">
                        <MenuItem onClick={() => setMenuExpanded(false)}>
                            <CollapseIcon fontSize="small" />
                            <Typography sx={{ ml: 1 }}>Less</Typography>
                        </MenuItem>
                    </Tooltip>
                )}

                {!advanced && !menuExpanded && (
                    <Tooltip title="Show advanced actions" arrow placement="right">
                        <MenuItem onClick={() => setMenuExpanded(true)}>
                            <ExpandIcon fontSize="small" />
                            <Typography sx={{ ml: 1 }}>More</Typography>
                        </MenuItem>
                    </Tooltip>
                )}
            </Menu>
            <AddSelectorDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
            />
        </>
    );
}
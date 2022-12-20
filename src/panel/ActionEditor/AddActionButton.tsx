import React, { useState } from "react";
import { Backdrop, SpeedDial, SpeedDialAction, SpeedDialIcon, SxProps, Theme } from "@mui/material";
import ActionIcon from "./ActionIcon";
import { useTemplate } from '../context';
import { TemplateItem, TemplateAddItemType } from "../../lib";

export interface Props {
    sx?: SxProps<Theme>;
}

export default (props?: Props) => {
    const { template, setTemplate } = useTemplate();
    const [open, setOpen] = useState(false);
    const actions = selectedAddItemTypes(template.selectedItem());

    function handleClick(type: TemplateAddItemType) {
        if (template) {
            debugger;
            template.addItem(type);
            setTemplate(template.clone());
            setOpen(false);
        }
    }

    return (
        <SpeedDial
            {...props}
            ariaLabel="menu"
            icon={<SpeedDialIcon />}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
        >
            <Backdrop open={open} />
            {actions.map(action => (
                <SpeedDialAction
                    key={action}
                    icon={<ActionIcon name={action} sx={{ color: "primary.light" }} />}
                    tooltipTitle={action}
                    tooltipOpen
                    onClick={() => handleClick(action)}
                />
            ))}
        </SpeedDial>
    );
}

function selectedAddItemTypes(item: TemplateItem | undefined): TemplateAddItemType[] {
    if (item?.type === "action" && item?.name === "select")
        return ["item", "select", "waitfor", "click"];
    else if (item?.type === "select")
        return ["item", "select", "waitfor", "click"];
    else
        return ["select", "waitfor", "click"];
}

/*
        <Menu
            anchorEl={}
            open={open}
            onClose={() => setOpen(false)}
            anchorOrigin={{
                vertical: "top",
                horizontal: "left",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "left",
            }}
        >
            <MenuItem onClick={() => alert("select")}>select</MenuItem>
            <MenuItem onClick={() => alert("waitfor")}>waitfor</MenuItem>
        </Menu>
*/
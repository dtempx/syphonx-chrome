import React, { useState } from "react";
import { Backdrop, SpeedDial, SpeedDialAction, SpeedDialIcon, SxProps, Theme } from "@mui/material";
import ActionIcon from "./ActionIcon";
import { useTemplate } from '../TemplateContext/index';

export interface Props {
    sx?: SxProps<Theme>;
}

export default (props?: Props) => {
    const { template, selected, setSelected, updateTemplate } = useTemplate();
    const [open, setOpen] = useState(false);

    const actions = [
        "select",
        "waitfor",
        "click"
    ];
    
    function handleClick(action: string) {
        if (template) {
            debugger;
            const key = template.addAction(action, selected);
            setSelected(key);
            updateTemplate();
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
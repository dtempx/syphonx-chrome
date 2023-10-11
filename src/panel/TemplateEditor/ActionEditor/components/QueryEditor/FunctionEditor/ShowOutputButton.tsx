import React from "react";

import {
    IconButton,
    Tooltip
} from "@mui/material";

import {
    Visibility as ShowOutputIcon,
    VisibilityOff as HideOutputIcon
} from "@mui/icons-material";


export interface Props {
    show: boolean;
    visible: boolean;
    onChange?: (event: React.SyntheticEvent, show: boolean) => void;
}

export default ({ show, visible, onChange }: Props) => (
    <Tooltip title={show ? "Hide stage output" : "Show stage output"}>
        <IconButton onClick={event => onChange ? onChange(event, !show) : undefined } sx={{ visibility: visible ? "visible" : "hidden" }}>
            {show ? <ShowOutputIcon fontSize="small" /> : <HideOutputIcon fontSize="small" />}
        </IconButton>
    </Tooltip>
);

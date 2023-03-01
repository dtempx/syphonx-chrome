import React from "react";
import { Select, MenuItem, Tooltip, Typography } from "@mui/material";
import * as syphonx from "syphonx-lib";

export interface Props {
    value: syphonx.SelectOn | undefined;
    onChange: (event: React.SyntheticEvent, value: syphonx.SelectOn | undefined) => void;
}

export default ({ value, onChange }: Props) => (
    <Select
        variant="standard"
        size="small"
        value={value || "default"}
        onChange={event => onChange(event as React.SyntheticEvent, event.target.value !== "default" ? event.target.value as syphonx.SelectOn : undefined)}
    >
        <MenuItem value="default"><Tooltip title="Wait for any selector to appear"><Typography>(default)</Typography></Tooltip></MenuItem>
        <MenuItem value="any"><Tooltip title="Wait for any selector to appaer"><Typography>any</Typography></Tooltip></MenuItem>
        <MenuItem value="all"><Tooltip title="Wait for all selectors to appear"><Typography>all</Typography></Tooltip></MenuItem>
        <MenuItem value="none"><Tooltip title="Wait for all selectors to disappear"><Typography>none</Typography></Tooltip></MenuItem>
    </Select>
);
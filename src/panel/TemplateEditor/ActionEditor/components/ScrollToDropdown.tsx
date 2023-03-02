import React from "react";
import { Select, MenuItem } from "@mui/material";
import * as syphonx from "syphonx-lib";

export interface Props {
    value?: syphonx.ScrollTarget;
    onChange: (event: React.SyntheticEvent, value: syphonx.ScrollTarget | undefined) => void;
}

export default ({ value, onChange }: Props) => (
    <Select
        variant="standard"
        size="small"
        value={value || "element"}
        onChange={event => onChange(event as React.SyntheticEvent, event.target.value !== "element" ? event.target.value as syphonx.ScrollTarget : undefined)}
    >
        <MenuItem value="top">top</MenuItem>
        <MenuItem value="bottom">bottom</MenuItem>
        <MenuItem value="element">element</MenuItem>
    </Select>
);
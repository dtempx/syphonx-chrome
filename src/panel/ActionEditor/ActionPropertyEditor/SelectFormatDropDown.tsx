import React from "react";
import { Select, MenuItem } from "@mui/material";
import * as syphonx from "syphonx-lib";

export interface Props {
    value: syphonx.SelectFormat | undefined;
    onChange: (event: React.SyntheticEvent, value: syphonx.SelectFormat | undefined) => void;
}

export default ({ value, onChange }: Props) => (
    <Select
        size="small"
        value={value || "default"}
        onChange={event => onChange(event as React.SyntheticEvent, event.target.value !== "default" ? event.target.value as syphonx.SelectFormat : undefined)}
    >
        <MenuItem value="default">(default)</MenuItem>
        <MenuItem value="none">none</MenuItem>
        <MenuItem value="href">href</MenuItem>
        <MenuItem value="multiline">multiline</MenuItem>
        <MenuItem value="singleline">singleline</MenuItem>
        <MenuItem value="innertext">innertext</MenuItem>
        <MenuItem value="textcontent">textcontent</MenuItem>
    </Select>
);
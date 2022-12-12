import React from "react";
import { Select, MenuItem } from "@mui/material";
import * as syphonx from "syphonx-lib";

export interface Props {
    value: syphonx.SelectType | undefined;
    onChange: (event: React.SyntheticEvent, value: syphonx.SelectType | undefined) => void;
}

export default ({ value, onChange }: Props) => (
    <Select
        size="small"
        value={value || "default"}
        onChange={event => onChange(event as React.SyntheticEvent, event.target.value !== "default" ? event.target.value as syphonx.SelectType : undefined)}
    >
        <MenuItem value="default">(default)</MenuItem>
        <MenuItem value="string">string</MenuItem>
        <MenuItem value="number">number</MenuItem>
        <MenuItem value="boolean">boolean</MenuItem>
        <MenuItem value="object">object</MenuItem>
    </Select>
);
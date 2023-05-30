import React from "react";
import { Select, MenuItem } from "@mui/material";
import * as syphonx from "syphonx-lib";

export interface Props {
    value?: string | undefined;
    onChange: (event: React.SyntheticEvent, value: string | undefined) => void;
}

export default ({ value, onChange }: Props) => (
    <Select
        variant="standard"
        size="small"
        value={value}
        onChange={event => onChange(event as React.SyntheticEvent, event.target.value ? event.target.value : undefined)}
        sx={{ minWidth: 125 }}
    >
        <MenuItem value="allInnerTexts">allInnerTexts</MenuItem>
        <MenuItem value="click">click</MenuItem>
        <MenuItem value="getAttribute">getAttribute</MenuItem>
        <MenuItem value="screenshot">screenshot</MenuItem>
    </Select>
);
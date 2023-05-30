import React from "react";
import { Select, MenuItem, Tooltip, Typography } from "@mui/material";
import * as syphonx from "syphonx-lib";

export interface Props {
    value: syphonx.DocumentLoadState | undefined;
    onChange: (event: React.SyntheticEvent, value: syphonx.DocumentLoadState | undefined) => void;
}

export default ({ value, onChange }: Props) => (
    <Select
        variant="standard"
        size="small"
        value={value || "default"}
        onChange={event => onChange(event as React.SyntheticEvent, event.target.value !== "default" ? event.target.value as syphonx.DocumentLoadState : undefined)}
        sx={{ width: 175 }}
    >
        <MenuItem value="default"><Tooltip title="Use the default option which is `load`."><Typography>(default)</Typography></Tooltip></MenuItem>
        <MenuItem value="domcontentloaded"><Tooltip title="Consider operation to be finished when the DOMContentLoaded event is fired."><Typography>domcontentloaded</Typography></Tooltip></MenuItem>
        <MenuItem value="load"><Tooltip title="Consider operation to be finished when the load event is fired."><Typography>load</Typography></Tooltip></MenuItem>
        <MenuItem value="networkidle"><Tooltip title="Consider operation to be finished when there are no network connections for at least 500 ms."><Typography>networkidle</Typography></Tooltip></MenuItem>
        <MenuItem value="commit"><Tooltip title="Consider operation to be finished when network response is received and the document started loading."><Typography>commit</Typography></Tooltip></MenuItem>
    </Select>
);
import React, { useState } from "react";
import { IconButton, MenuItem, Select, Stack, SxProps, TextField, Theme, Tooltip, Typography } from "@mui/material";
import { Add as ItemIcon, Delete as DeleteIcon, KeyboardDoubleArrowRight as ExpandIcon, KeyboardDoubleArrowLeft as CollapseIcon, Visibility as ShowOutputIcon, VisibilityOff as HideOutputIcon } from "@mui/icons-material";
import functions from "./functions.json";

export interface Props {
    sx?: SxProps<Theme>;
}

export default ({ ...props }: Props) => {
    const [value, setValue] = useState("");
    const [expanded, setExpanded] = useState(false);
    const [output, setOutput] = useState("");
    const [showOutput, setShowOutput] = useState(false);

    return (<>
        <Stack {...props} direction="row" spacing={0}>
            <Select
                variant="outlined"
                size="small"
                value={value}
                onChange={event => setValue(event.target.value)}
                sx={{ width: 200, maxHeight: 500 }}
                MenuProps={{ style: { maxHeight: 400 }}}
            >
                {functions
                    .filter(({ advanced }) => expanded || !advanced)
                    .map(({ key, help }) => (
                        <Tooltip title={help} arrow placement="right">
                            <MenuItem value={key}><ItemIcon fontSize="small" /><Typography sx={{ ml: 1 }}>{key}</Typography></MenuItem>
                        </Tooltip>
                    ))
                }
                {expanded ? (
                    <MenuItem onClick={() => setExpanded(false)}><CollapseIcon fontSize="small" /><Typography sx={{ ml: 1 }}>Less</Typography></MenuItem>
                ) : (
                    <MenuItem onClick={() => setExpanded(true)}><ExpandIcon fontSize="small" /><Typography sx={{ ml: 1 }}>More</Typography></MenuItem>
                )}
            </Select>
            <TextField variant="outlined" size="small" sx={{ ml: 1 }} fullWidth />
            <Tooltip title="Delete this stage">
                <IconButton>
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Tooltip>
            <Tooltip title={showOutput ? "Hide stage output" : "Show stage output"}>
                <IconButton onClick={() => setShowOutput(!showOutput) }>
                    {showOutput ? <ShowOutputIcon fontSize="small" /> : <HideOutputIcon fontSize="small" />}
                </IconButton>
            </Tooltip>
        </Stack>
        {showOutput ? (
            <TextField
                variant="outlined"
                multiline
                rows={3}
                defaultValue={output}
                sx={{ mt: 1, width: "100%", backgroundColor: "LightGray", fontSize: "small" }}
            />
        ) : null}
    </>);
};
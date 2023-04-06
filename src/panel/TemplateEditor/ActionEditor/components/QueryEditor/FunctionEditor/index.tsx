import React, { useState } from "react";
import * as syphonx from "syphonx-lib";

import functionDefs from "./functions.json";

import {
    Box,
    Chip,
    IconButton,
    MenuItem,
    Select,
    Stack,
    SxProps,
    TextField,
    Theme,
    Tooltip,
    Typography
} from "@mui/material";

import {
    Delete as DeleteIcon,
    KeyboardDoubleArrowRight as ExpandIcon,
    KeyboardDoubleArrowLeft as CollapseIcon,
    Visibility as ShowOutputIcon,
    VisibilityOff as HideOutputIcon
} from "@mui/icons-material";

interface FunctionDef {
    key: string;
    advanced: boolean;
    help: string;
    args: FunctionDefArg[];
}

interface FunctionDefArg {
    name: string;
    type: string;
    help: string;
    required: boolean;
}

export interface Props {
    value?: syphonx.SelectQueryOp;
    onChange: (event: React.SyntheticEvent, value: syphonx.SelectQueryOp) => void;
    onDelete?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    sx?: SxProps<Theme>;
}

export default ({ value = [""], onChange, onDelete, sx }: Props) => {
    const [expanded, setExpanded] = useState(false);
    const [output, setOutput] = useState("");
    const [showOutput, setShowOutput] = useState(false);

    const functionDef = functionDefs.find(({ key }) => key === value[0]);
    const args = functionDef ? functionDef.args || [{ name: "Value", type: "string", help: "", required: true }] : undefined;

    function assignValue(newValue: unknown, i: number): syphonx.SelectQueryOp {
        const obj = value.slice(0) as syphonx.SelectQueryOp;
        obj[i] = newValue;
        return obj;
    }

    return (
        <Box sx={sx}>
            <Stack direction="row" spacing={0} sx={{ display: "flex", justifyContent: "space-between" }}>
                <Stack direction="row" spacing={0}>
                    <Select
                        variant="outlined"
                        size="small"
                        value={value[0]}
                        displayEmpty
                        autoWidth={false}
                        renderValue={value => value || <Typography variant="subtitle1" sx={{ opacity: 0.5 }}>(Add a stage)</Typography>}
                        onChange={event => onChange(event as React.SyntheticEvent, [event.target.value as string, ...value.slice(1)])}
                        sx={{
                            width: 200,
                            maxWidth: 200
                        }}
                    >
                        {functionDefs
                            .filter(({ advanced }) => expanded || !advanced)
                            .map(({ key, help }) => (
                                <MenuItem value={key}>
                                    <Tooltip
                                        arrow
                                        placement="right"
                                        title={help}
                                    >
                                        <Typography sx={{ width: "100%" }}>{key}</Typography>
                                    </Tooltip>
                                </MenuItem>
                            ))
                        }
                        {expanded ? (
                            <MenuItem onClick={() => setExpanded(false)}>
                                <CollapseIcon fontSize="small" />
                                <Typography sx={{ ml: 1 }}>Less</Typography>
                            </MenuItem>
                        ) : (
                            <MenuItem onClick={() => setExpanded(true)}>
                                <ExpandIcon fontSize="small" />
                                <Typography sx={{ ml: 1 }}>More</Typography>
                            </MenuItem>
                        )}
                    </Select>
                    {args?.map(({ name, type, help, required }, index) => (
                        <Tooltip
                            arrow
                            placement="bottom"
                            title={
                                <>
                                    <Typography variant="caption">{help}</Typography>
                                    <Chip
                                        variant="filled"
                                        color="secondary"
                                        size="small"
                                        label={required ? "required" : "optional"}
                                        sx={{ ml: 1 }}
                                    />
                                </>
                            }
                        >
                            <TextField
                                label={required ? `${name} *` : name}
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={value[index + 1]}
                                onChange={event => onChange(event, assignValue(event.target.value, index + 1))}
                                sx={{
                                    ml: 1,
                                    visibility: value[0] ? "visible" : "hidden"
                                }}
                            />
                        </Tooltip>
                    ))}
                </Stack>
                <Stack direction="row" spacing={0}>
                    <Tooltip title="Delete this stage">
                        <IconButton onClick={onDelete} sx={{ visibility: value[0] ? "visible" : "hidden" }}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={showOutput ? "Hide stage output" : "Show stage output"}>
                        <IconButton onClick={() => setShowOutput(!showOutput) } sx={{ visibility: value[0] ? "visible" : "hidden" }}>
                            {showOutput ? <ShowOutputIcon fontSize="small" /> : <HideOutputIcon fontSize="small" />}
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Stack>
            {showOutput && value[0] ? (
                <TextField
                    variant="outlined"
                    multiline
                    rows={3}
                    defaultValue={output}
                    sx={{
                        mt: 1,
                        width: "100%",
                        backgroundColor: "LightGray",
                        fontSize: "small"
                    }}
                />
            ) : null}
        </Box>
    );
};
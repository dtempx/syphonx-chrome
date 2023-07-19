import React from "react";

import {
    IconButton,
    Table,
    TableContainer,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
    Stack,
    SxProps,
    Theme,
    Typography
} from "@mui/material";

import {
    Delete as DeleteIcon
} from "@mui/icons-material";

import ValidateField from "./ValidateField";

export interface Props {
    obj: Record<string, any>;
    onChange: (event: React.SyntheticEvent, obj: Record<string, any>) => void;
    sx?: SxProps<Theme>;
}

export default ({ obj, onChange, sx }: Props) => (
    <TableContainer sx={{ ...sx, maxHeight: 200, border: 1, borderColor: "secondary.main" }}>
        <Table size="small" stickyHeader>
            <TableHead>
                <TableRow>
                    <TableCell>
                        <Typography fontSize="small" color="secondary.main">Name</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography fontSize="small" color="secondary.main">Value</Typography>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Object.keys(obj).map(key => (
                    <TableRow>
                        <TableCell>
                            <ValidateField
                                variant="standard"
                                size="small"
                                value={key}
                                onChange={(event, newKey) => {
                                    const value = obj[key];
                                    delete obj[key];
                                    onChange(event, { ...obj, [newKey]: value });
                                }}
                                InputProps={{
                                    disableUnderline: true,
                                    style: { fontSize: "small" }
                                }}
                            />
                        </TableCell>
                        <TableCell>
                            <Stack direction="row">
                                <ValidateField
                                    variant={obj[key] ? "standard" : "outlined"}
                                    size="small"
                                    placeholder="Specify value"
                                    fullWidth
                                    value={obj[key]}
                                    onChange={(event, value) => {
                                        onChange(event, { ...obj, [key]: value });
                                    }}
                                    ref={element => {
                                        if (element && obj[key] === undefined)
                                            setTimeout(() => element.focus(), 250);
                                    }}
                                    InputProps={{
                                        disableUnderline: true,
                                        style: { fontSize: "small" }
                                    }}
                                />
                                <IconButton
                                    size="small"
                                    onClick={event => {
                                        delete obj[key];
                                        onChange(event, obj);
                                    }}
                                    sx={{ ml: 1 }}
                                >
                                    <Tooltip title="Remove this property">
                                        <DeleteIcon fontSize="small" />
                                    </Tooltip>
                                </IconButton>
                            </Stack>
                        </TableCell>
                    </TableRow>
                ))}
                <TableRow>
                    <TableCell>
                        <ValidateField
                            variant="outlined"
                            size="small"
                            placeholder="New property"
                            value=""
                            onChange={(event, value) => {
                                onChange(event, { ...obj, [value]: "" });
                            }}
                            InputProps={{
                                style: { fontSize: "small" }
                            }}
                        />
                    </TableCell>
                    <TableCell>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
);
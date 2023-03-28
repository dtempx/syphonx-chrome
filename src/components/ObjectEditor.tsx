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
    Theme
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

export default ({ obj, onChange, sx }: Props) => {
    return (
        <TableContainer sx={{ ...sx, maxHeight: 200, border: 1, borderColor: "secondary.main" }}>
            <Table size="small" stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Value</TableCell>
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
                                    InputProps={{ disableUnderline: true }}
                                />
                            </TableCell>
                            <TableCell>
                                <Stack direction="row">
                                    <ValidateField
                                        variant="standard"
                                        size="small"
                                        value={obj[key]}
                                        onChange={(event, value) => {
                                            onChange(event, { ...obj, [key]: value });
                                        }}
                                        InputProps={{ disableUnderline: true }}
                                    />
                                    <IconButton
                                        size="small"
                                        onClick={event => {
                                            delete obj[key];
                                            onChange(event, obj);
                                        }}
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
                                value=""
                                onChange={(event, value) => {
                                    onChange(event, { ...obj, [value]: "" });
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
};
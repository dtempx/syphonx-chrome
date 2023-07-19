import React from "react";

import {
    IconButton,
    Table,
    TableContainer,
    TableBody,
    TableCell,
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
    list: string[];
    onChange: (event: React.SyntheticEvent, list: string[]) => void;
    sx?: SxProps<Theme>;
}

export default ({ list, onChange, sx }: Props) => (
    <TableContainer sx={{ ...sx, maxHeight: 200, border: 1, borderColor: "secondary.main" }}>
        <Table size="small">
            <TableBody>
                {list.map(value => (
                    <TableRow key={value}>
                        <TableCell>
                            <Stack direction="row">
                                <ValidateField
                                    variant="outlined"
                                    size="small"
                                    placeholder="Specify a value"
                                    fullWidth
                                    value={value}
                                    onChange={(event, newValue) => {
                                        const i = list.indexOf(value);
                                        list[i] = newValue;
                                        onChange(event, [...list]);
                                    }}
                                    InputProps={{
                                        disableUnderline: true,
                                        style: { fontSize: "small" }
                                    }}
                                />
                                <IconButton
                                    size="small"
                                    onClick={event => {
                                        onChange(event, [...list.splice(list.indexOf(value), 1)]);
                                    }}
                                    sx={{ ml: 1 }}
                                >
                                    <Tooltip title="Remove this value">
                                        <DeleteIcon fontSize="small" />
                                    </Tooltip>
                                </IconButton>
                            </Stack>
                        </TableCell>
                    </TableRow>
                ))}
                <TableRow key="_">
                    <TableCell>
                        <ValidateField
                            variant="outlined"
                            size="small"
                            placeholder="New value"
                            fullWidth
                            value=""
                            onChange={(event, value) => {
                                list.push(value);
                                onChange(event, [...list]);
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
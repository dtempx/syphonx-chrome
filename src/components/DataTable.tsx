import * as React from "react";

import {
    SxProps,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Theme
} from "@mui/material";

export interface Props {
    data: Record<string, any>[];
    sx?: SxProps<Theme>;
}

export default ({ data, sx }: Props) => {
    const keys = new Set<string>();
    for (const row of data)
        for (const key of Object.keys(row))
            if (!keys.has(key))
                keys.add(key);

    return (
        <TableContainer sx={sx}>
            <Table>
                <TableHead>
                    <TableRow>
                        {Array.from(keys).map(key => (
                            <TableCell>{key}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(row => (
                        <TableRow>
                            {Array.from(keys).map(key => (
                                <TableCell>{row[key] !== undefined ? row[key] : null}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
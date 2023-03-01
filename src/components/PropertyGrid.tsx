import React from "react";

import {
    Table,
    TableContainer,
    TableBody,
    TableCell,
    TableRow,
    SxProps,
    Theme
} from "@mui/material";

export type PropertyGridItem = [
    JSX.Element | string, // name
    JSX.Element | string | number | boolean // editor
];

export interface Props {
    columns?: Array<{ width: number | string }>,
    items: PropertyGridItem[];
    sx?: SxProps<Theme>;
}

export default ({ items, columns = [{ width: 100 }], sx }: Props) => (
    <TableContainer sx={sx}>
        <Table size="small">
            <TableBody>
                {items.map(item => (
                    <TableRow>
                        <TableCell sx={{ width: columns[0]?.width }}>
                            {item[0]}                                    
                        </TableCell>
                        <TableCell sx={{ width: columns[1]?.width }}>
                            {item[1]}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);
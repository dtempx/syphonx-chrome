import React from "react";
import { Box, Table, TableContainer, TableBody, TableCell, TableRow, Tooltip } from "@mui/material";

export interface Props {
    columns?: Array<{ width: number | string }>,
    items: Array<[JSX.Element | string, JSX.Element | string | number | boolean, string]>;
}

export default ({ items, columns = [{ width: 100 }] }: Props) => (
    <TableContainer>
        <Table size="small">
            <TableBody>
                {items.map(item => (
                    <TableRow>
                        <TableCell sx={{ width: columns[0]?.width }}>
                            <Tooltip title={item[2]}>
                                <Box>
                                    {item[0]}                                    
                                </Box>
                            </Tooltip>
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
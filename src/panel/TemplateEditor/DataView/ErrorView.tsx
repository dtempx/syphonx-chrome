import React from "react";
import { useTemplateData } from "./context";

import {
    Table,
    TableContainer,
    TableBody,
    TableCell,
    TableRow,
    TableHead
} from "@mui/material";

export default () => {
    const { result } = useTemplateData();
    return result?.errors ? (
        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>error</TableCell>
                        <TableCell width={100}>error-code</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {result.errors.map(error => (
                        <TableRow>
                            <TableCell>{error.message}</TableCell>
                            <TableCell>{error.code}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    ) : null;
}
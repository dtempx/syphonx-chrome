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
    const { extract } = useTemplateData();
    return extract?.errors ? (
        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>error</TableCell>
                        <TableCell width={100}>error-code</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {extract.errors.map(error => (
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
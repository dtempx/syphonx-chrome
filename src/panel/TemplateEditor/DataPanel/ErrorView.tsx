import React from "react";
import { useTemplate } from "./context";
import * as syphonx from "syphonx-lib";

import {
    Table,
    TableContainer,
    TableBody,
    TableCell,
    TableRow,
    TableHead
} from "@mui/material";

export default () => {
    const { extract } = useTemplate();
    const errors = extract?.errors as syphonx.ExtractError[]; // WORKAROUND https://github.com/microsoft/TypeScript/issues/36981
    return errors ? (
        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>error</TableCell>
                        <TableCell width={100}>error-code</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {errors.map(error => (
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
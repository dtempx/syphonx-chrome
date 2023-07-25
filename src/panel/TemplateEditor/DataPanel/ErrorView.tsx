import React from "react";
import { useTemplate } from "./context";
import * as syphonx from "syphonx-lib";

import {
    Table,
    TableContainer,
    TableBody,
    TableCell,
    TableRow,
    TableHead,
    Typography
} from "@mui/material";

export default () => {
    const { extractState } = useTemplate();
    const errors = extractState?.errors as syphonx.ExtractError[]; // WORKAROUND https://github.com/microsoft/TypeScript/issues/36981
    if (errors && errors.length > 0)
        return (
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
        );
    else
        return <Typography fontSize="small">No errors.</Typography>
}
import React from "react";
import { useTemplate } from "./context";
import { isObject } from "./lib";
import * as syphonx from "syphonx-lib";

import {
    Table,
    TableContainer,
    TableBody,
    TableCell,
    TableRow,
    Typography
} from "@mui/material";

export default () => {
    const { extractState, refreshing } = useTemplate();
    const keys = extractState && isObject(extractState.data) ? Object.keys(extractState.data) : [];
    const obj = (extractState && isObject(extractState.data) ? syphonx.unwrap(extractState.data) : {}) as Record<string, string>;

    if (refreshing)
        return <Typography color="primary" fontSize="small">Running...</Typography>;
    else if (keys.length > 0)
        return (
            <TableContainer>
                <Table size="small">
                    <TableBody>
                        {keys.map(key => {
                            return (
                                <TableRow>
                                    <TableCell>{key}</TableCell>
                                    <TableCell>{typeof obj[key] !== "object" ? String(obj[key]) : JSON.stringify(obj[key])}</TableCell>
                                </TableRow>
                            );
                        })}
                   </TableBody>
                </Table>
            </TableContainer>
        );
    else
        return <Typography color="primary" fontSize="small">No data.</Typography>;
}
import React from "react";
import { Table, TableContainer, TableBody, TableCell, TableRow } from "@mui/material";
import { useTemplate } from "./context";
import { isObject } from "./lib";
import * as syphonx from "syphonx-lib";

export default () => {
    const { extractState } = useTemplate();

    if (extractState) {
        const keys = isObject(extractState.data) ? Object.keys(extractState.data) : [];
        const obj = (isObject(extractState.data) ? syphonx.unwrap(extractState.data) : {}) as Record<string, string>;
    
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
    }
    else {
        return null;
    }
}
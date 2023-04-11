import React from "react";
import { Table, TableContainer, TableBody, TableCell, TableRow } from "@mui/material";
import { useTemplate } from "./context";
import { isObject } from "./lib";
import * as syphonx from "syphonx-lib";

export default () => {
    const { extract } = useTemplate();
    const keys = extract && isObject(extract.data) ? Object.keys(extract.data) : [];
    const obj = (extract && isObject(extract.data) ? syphonx.unwrap(extract.data) : {}) as Record<string, string>;

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
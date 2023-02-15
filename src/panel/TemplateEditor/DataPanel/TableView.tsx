import React from "react";
import { Table, TableContainer, TableBody, TableCell, TableRow } from "@mui/material";
import { useTemplateData } from "./context";
import { isObject, removeDOMRefs } from "../lib";

export default () => {
    const { result } = useTemplateData();
    const keys = result && isObject(result.data) ? Object.keys(result.data) : [];
    const obj = (result && isObject(result.data) ? removeDOMRefs(result.data) : {}) as Record<string, string>;

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
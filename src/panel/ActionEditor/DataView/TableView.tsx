import React from "react";
import { Table, TableContainer, TableBody, TableCell, TableRow } from "@mui/material";
import { useTemplate } from '../../TemplateContext';
import { isObject, removeDOMRefs } from "../../../lib";

export default () => {
    const { result } = useTemplate();

    const keys = result && isObject(result.data) ? Object.keys(result.data) : [];
    const obj = (result && isObject(result.data) ? removeDOMRefs(result.data) : {}) as Record<string, string>;

    return (
        <TableContainer>
            <Table size="small">
                <TableBody>
                    <TableRow style={{ fontWeight: "bold", backgroundColor: "#f0f8ff" }}>
                        <TableCell>
                            Key
                        </TableCell>
                        <TableCell>
                            Value
                        </TableCell>
                    </TableRow>
                    {keys.map(key => {
                        return (
                            <TableRow>
                                <TableCell>{key}</TableCell>
                                <TableCell>{obj[key]}</TableCell>
                            </TableRow>
                        );
                    })}
               </TableBody>
            </Table>
        </TableContainer>
    );
}
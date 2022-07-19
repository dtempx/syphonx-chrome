import React from "react";
import { Table, TableContainer, TableBody, TableCell, TableRow } from "@material-ui/core";
import { useScript } from '../ScriptContext';
import { isObject, removeDOMRefs } from "../common";

export default () => {
    const { result } = useScript();

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
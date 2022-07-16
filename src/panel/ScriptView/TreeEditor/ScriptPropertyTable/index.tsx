import React from "react";
import { useApp } from '../../../AppContext';
import { parseScript } from "../../../common";
import { MenuItem, Select, Switch, Table, TableContainer, TableBody, TableCell, TableRow, TextField } from "@material-ui/core";
import { SelectAction } from "syphonx-core";

export default () => {
    const { script, selected } = useApp();
    if (selected) {
        const actions = parseScript(script);
        const obj = actions.find(action => !!(action as SelectAction).select);
        if (obj) {
            const selects = (obj as SelectAction)?.select;
            const i = selected.lastIndexOf(".");
            const namekey = selected.substring(i + 1);
            const target = selects.find(({ name }) => name === namekey);
            if (target) {
                return (
                    <TableContainer>
                        <Table size="small">
                            <TableBody>
                                <TableRow>
                                    <TableCell style={{ width: 100 }}>
                                        Name
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            size="small"
                                            value={target?.name}
                                            variant="standard"
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Type
                                    </TableCell>
                                    <TableCell>
                                        <Select value={target?.type || "default"}>
                                            <MenuItem value="default">(Default)</MenuItem>
                                            <MenuItem value="string">string</MenuItem>
                                            <MenuItem value="number">number</MenuItem>
                                            <MenuItem value="boolean">boolean</MenuItem>
                                            <MenuItem value="object">object</MenuItem>
                                        </Select>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Repeated
                                    </TableCell>
                                    <TableCell>
                                        <Switch checked={target?.repeated || false} />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Required
                                    </TableCell>
                                    <TableCell>
                                        <Switch checked={target?.required || false} />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Active
                                    </TableCell>
                                    <TableCell>
                                        <Switch checked={target?.active || true} />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        All
                                    </TableCell>
                                    <TableCell>
                                        <Switch checked={target?.repeated || false} />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Collate
                                    </TableCell>
                                    <TableCell>
                                        <Switch checked={target?.collate || false} />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Selector
                                    </TableCell>
                                    <TableCell>
                                        {JSON.stringify(target?.$)}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ width: 100 }}>
                                        Value
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            size="small"
                                            value={target?.value}
                                            variant="standard"
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Format
                                    </TableCell>
                                    <TableCell>
                                        <Select value={target?.format || "default"}>
                                            <MenuItem value="default">(Default)</MenuItem>
                                            <MenuItem value="none">(None)</MenuItem>
                                            <MenuItem value="href">href</MenuItem>
                                            <MenuItem value="multiline">multiline</MenuItem>
                                            <MenuItem value="singleline">singleline</MenuItem>
                                            <MenuItem value="innertext">innertext</MenuItem>
                                            <MenuItem value="textcontent">textcontent</MenuItem>
                                        </Select>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Limit
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            size="small"
                                            value={target?.limit}
                                            variant="standard"
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Pattern
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            size="small"
                                            value={target?.pattern}
                                            variant="standard"
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        When
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            size="small"
                                            value={target?.when}
                                            variant="standard"
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                );
            }
        }        
    }

    return null;
}
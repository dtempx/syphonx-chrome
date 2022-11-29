import React from "react";
import { useTemplate } from '../../../TemplateContext';
import { MenuItem, Select, Switch, Table, TableContainer, TableBody, TableCell, TableRow, TextField } from "@mui/material";
import { tryParseJSON } from "../../../common";
import EditField from "./EditField";


export default () => {
    const { selectedObj, setSelectedObj, setSelected } = useTemplate();

    function commitName(name: string) {
        setSelectedObj({ name });
        setSelected(name);
    }

    function commitSelector(value: string) {
        setSelectedObj({ $: value ? tryParseJSON(value) : undefined });
    }

    function validateSelector(value: string) {
        if (!value)
            return true;
        const selectors = tryParseJSON(value);
        if (selectors instanceof Array) {
            for (const selector of selectors) {
                if (!(selector instanceof Array))
                    return false;
                if (selector.length > 0) {
                    const [operator, operands] = selector;
                    if (typeof operator !== "string")
                        return false;
                }
            }
            return true;
        }
        return false;
    }

    if (selectedObj) {
        return (
            <TableContainer>
                <Table size="small">
                    <TableBody>
                        <TableRow>
                            <TableCell style={{ width: 100 }}>
                                Name
                            </TableCell>
                            <TableCell style={{ width: 200 }}>
                                <EditField
                                    size="small"
                                    value={selectedObj?.name}
                                    onValidate={value => !!value}
                                    onChange={value => commitName(value)}
                                />
                            </TableCell>
                            <TableCell>
                                <p>The name of the property</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                Type
                            </TableCell>
                            <TableCell>
                                <Select
                                    value={selectedObj.type || "default"}
                                    onChange={event => setSelectedObj({ type: event.target.value !== "default" ? event.target.value : undefined })}
                                >
                                    <MenuItem value="default">(default)</MenuItem>
                                    <MenuItem value="string">string</MenuItem>
                                    <MenuItem value="number">number</MenuItem>
                                    <MenuItem value="boolean">boolean</MenuItem>
                                    <MenuItem value="object">object</MenuItem>
                                </Select>
                            </TableCell>
                            <TableCell>
                                <p>Determines the type of the property value</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                Repeated
                            </TableCell>
                            <TableCell>
                                <Switch
                                    checked={selectedObj.repeated || false}
                                    onChange={event => setSelectedObj({ repeated: event.target.checked || undefined })}
                                />
                            </TableCell>
                            <TableCell>
                                <p>Indicates whether the data is single-valued or repeated within an array</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                Required
                            </TableCell>
                            <TableCell>
                                <Switch
                                    checked={ selectedObj.required || false }
                                    onChange={ event => setSelectedObj({ required: event.target.checked || undefined }) }
                                />
                            </TableCell>
                            <TableCell>
                                <p>Determines whether the property is required which produces an error if a value is not obtained</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                Active
                            </TableCell>
                            <TableCell>
                                <Switch
                                    checked={selectedObj.active === undefined ? true : selectedObj.active}
                                    onChange={event => setSelectedObj({ active: event.target.checked ? undefined : false })}
                                />
                            </TableCell>
                            <TableCell>
                                <p>Determines whether the property is active</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                All
                            </TableCell>
                            <TableCell>
                                <Switch
                                    checked={selectedObj.all || false}
                                    onChange={event => setSelectedObj({ all: event.target.checked || undefined })}
                                />
                            </TableCell>
                            <TableCell>
                                <p>Determines whether all matching nodes are returned, false by default when required is false</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                Collate
                            </TableCell>
                            <TableCell>
                                <Switch
                                    checked={selectedObj.collate || false}
                                    onChange={event => setSelectedObj({ collate: event.target.checked || undefined })}
                                />
                            </TableCell>
                            <TableCell>
                                <p>Combines all selected nodes into a single value</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                Selector
                            </TableCell>
                            <TableCell>
                                <EditField
                                    size="small"
                                    value={selectedObj.$ ? JSON.stringify(selectedObj.$) : "" }
                                    onValidate={value => validateSelector(value)}
                                    onChange={value => commitSelector(value)}
                                />
                            </TableCell>
                            <TableCell>
                                <p>A DOM query that determines what data is selected</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ width: 100 }}>
                                Value
                            </TableCell>
                            <TableCell>
                                <TextField
                                    variant="standard"
                                    size="small"
                                    value={selectedObj.value}
                                    onChange={event => setSelectedObj({ value: event.target.value || undefined })}
                                />
                            </TableCell>
                            <TableCell>
                                <p>A predetermined value, ignored if a selector query is defined</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                Format
                            </TableCell>
                            <TableCell>
                                <Select
                                    value={selectedObj.format || "default"}
                                    onChange={event => setSelectedObj({ format: event.target.value !== "default" ? event.target.value : undefined })}
                                >
                                    <MenuItem value="default">(default)</MenuItem>
                                    <MenuItem value="none">none</MenuItem>
                                    <MenuItem value="href">href</MenuItem>
                                    <MenuItem value="multiline">multiline</MenuItem>
                                    <MenuItem value="singleline">singleline</MenuItem>
                                    <MenuItem value="innertext">innertext</MenuItem>
                                    <MenuItem value="textcontent">textcontent</MenuItem>
                                </Select>
                            </TableCell>
                            <TableCell>
                                <p>Determines how the selected value is formatted</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                Limit
                            </TableCell>
                            <TableCell>
                                <TextField
                                    variant="standard"
                                    size="small"
                                    value={selectedObj.limit}
                                    onChange={event => setSelectedObj({ limit: event.target.value !== undefined ? parseInt(event.target.value) : undefined })}
                                />
                            </TableCell>
                            <TableCell>
                                <p>Limits the number of nodes to be selected, unlimited if not specified</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                Pattern
                            </TableCell>
                            <TableCell>
                                <TextField
                                    variant="standard"
                                    size="small"
                                    value={selectedObj.pattern}
                                    onChange={event => setSelectedObj({ pattern: event.target.value || undefined })}
                                />
                            </TableCell>
                            <TableCell>
                                <p>A regex pattern for validation, an error will be produced if the value does not match the pattern</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                When
                            </TableCell>
                            <TableCell>
                                <TextField
                                    variant="standard"
                                    size="small"
                                    value={selectedObj.when}
                                    onChange={event => setSelectedObj({ when: event.target.value || undefined })}
                                />
                            </TableCell>
                            <TableCell>
                                <p>Makes value selection conditional based whether the evaluation produces a true result</p>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    return null;
}
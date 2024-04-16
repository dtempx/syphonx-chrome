import React, { useMemo } from "react";
import { TemplateItem } from "../lib";
import * as syphonx from "syphonx-lib";

import {
    Button,
    ButtonGroup,
    Stack,
    Switch,
    TextField,
    Tooltip,
    Typography
} from "@mui/material";

import {
    FindInPageOutlined as QueryIcon,
    HighlightAlt as SelectIcon
} from "@mui/icons-material";

import {
    AdvancedPropertyGrid,
    FormulaField,
    QueryEditorField,
    NumberField,
    RegexpField,
    SelectOnDropdown
} from "./components";

export interface Props {
    item: TemplateItem;
    onChange: (event: React.SyntheticEvent<Element, Event>) => void;
}

export default ({ item, onChange }: Props) => {

    const mode = useMemo(() => {
        const obj = item?.obj as syphonx.WaitFor;
        if (obj.query)
            return "query";
        else if (obj.select)
            return "select";
        else
            return undefined;
    }, [item]);

    function handleChangeMode(event: React.MouseEvent<HTMLElement, MouseEvent>, value: any): void {
        const obj = item?.obj as syphonx.WaitFor;
        if (value === "query") {
            obj.query = [[""]];
            obj.select = undefined;
            onChange(event);
        }
        else if (value === "select") {
            obj.select = [{ name: "value1" }];
            obj.query = undefined;
            onChange(event);
        }
    }

    const obj = item?.obj as syphonx.WaitFor;
    return obj ? (
        <AdvancedPropertyGrid
            items={[
                [
                    "name",
                    <TextField
                        variant="standard"
                        size="small"
                        placeholder="Name for this action"
                        inputProps={{ maxLength: 32 }}    
                        value={obj.name}
                        onChange={event => {
                            obj.name = event.target.value || undefined;
                            onChange(event);
                        }}
                    />,
                    "An optional descriptive name briefly summarizing the waitfor action. Name appears in the action tree and status output, enhances readibility of the template if specified.",
                    true
                ],
                [
                    "mode",
                    <ButtonGroup size="small">
                        <Tooltip title="Wait for a single query result. Choose this option to wait for a single thing to appear on the page.">
                            <Button variant={mode === "query" ? "contained" : "outlined"} onClick={event => handleChangeMode(event, "query")} sx={{ fontSize: "x-small" }}>QUERY</Button>
                        </Tooltip>
                        <Tooltip title="Wait for the result of multiple query results from a sub-select. Choose this option if there is more than one thing on the page to wait for, or if it is necessary to wait for something to disappear.">
                            <Button variant={mode === "select" ? "contained" : "outlined"} onClick={event => handleChangeMode(event, "select")} sx={{ fontSize: "x-small" }}>SUB-SELECT</Button>
                        </Tooltip>
                    </ButtonGroup>,
                    "Determines whether to wait for a single DOM query, or the result of a multiple DOM query from a sub-select",
                    true,
                    mode === undefined ? "Choose whether to create a query or a sub-select." : ""
                ],
                [
                    "query",
                    <QueryEditorField
                        name="waitfor"
                        query={obj.query}
                        onChange={(event, value) => {
                            obj.query = value;
                            onChange(event);
                        }}
                    />,
                    "A CSS selector or jQuery expression that determines the content to wait for on the page. Only used when mode=query.",
                    mode === "query",
                    (!obj.query || JSON.stringify(obj.query) === `[[""]]`) && !obj.select ? "Choose query or sub-select." : ""
                ],
                [
                    "on",
                    <SelectOnDropdown
                        value={obj.on}
                        onChange={(event, value) => {
                            obj.on = value;
                            onChange(event);
                        }}
                    />,
                    "Determines whether to wait for any, all, or none of the sub-selectors. Only used when mode=select.",
                    mode === "select"
                ],
                [
                    "required",
                    <Switch
                        size="small"
                        checked={obj.required ?? false}
                        onChange={(event, value) => {
                            obj.required = value;
                            onChange(event);
                        }}
                    />,
                    "Determines whether the click is optional or required, producing an error if no click target is found on the page.",
                    obj.required !== undefined
                ],
                [
                    "pattern",
                    <RegexpField
                        value={obj.pattern}
                        onChange={(event, value) => {
                            obj.pattern = value;
                            onChange(event);
                        }}
                    />,
                    "Waits for a specific text pattern if specified.",
                    obj.pattern !== undefined
                ],
                [
                    "timeout",
                    <Stack direction="row">
                        <NumberField
                            fullWidth
                            value={obj.timeout}
                            label="seconds"
                            onChange={(event, value) => {
                                obj.timeout = value;
                                onChange(event);
                            }}
                        />
                    </Stack>,
                    "Number of seconds to wait before timing out. (default=30)",
                    obj.timeout !== undefined
                ],
                [
                    "when",
                    <FormulaField
                        value={obj.when}
                        onChange={(event, value) => {
                            obj.when = value || undefined;
                            onChange(event);
                        }}
                    />,
                    "A formula that determines whether the waitfor is evaluated or bypassed. A formula is a Javascript expression enclosed in curly braces that returns a boolean true/false result. The formula can reference a selector result via `data.name`, where name is the name of any previously evaluated selector. Example: `{data.price !== null}`",
                    obj.when !== undefined
                ]
            ]}
        />
    ) : null;
};
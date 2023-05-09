import React from "react";
import { TemplateItem } from "../lib";
import * as syphonx from "syphonx-lib";

import {
    MenuItem,
    Select,
    TextField
} from "@mui/material";

import {
    AdvancedPropertyGrid,
    FormulaField,
    QueryEditorField,
    ScrollToDropdown
} from "./components";

export interface Props {
    item: TemplateItem;
    onChange: (event: React.SyntheticEvent<Element, Event>) => void;
}

export default ({ item, onChange }: Props) => {
    const obj = item?.obj as syphonx.Scroll;
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
                    "An optional descriptive name briefly summarizing the scroll action. Name appears in the action tree and status output, enhances readibility of the template if specified.",
                    true
                ],
                [
                    "target",
                    <ScrollToDropdown
                        value={obj.target}
                        onChange={(event, value) => {
                            obj.target = value;
                            if (value) {
                                obj.query = undefined;
                                obj.block = undefined;
                                obj.inline = undefined;
                            }
                            onChange(event);
                        }}
                    />,
                    "Determines whether to scroll to the top or bottom of the page, or to an element.",
                    true,
                    ""
                ],
                [
                    "query",
                    <QueryEditorField
                        query={obj.query}
                        name="scroll"
                        onChange={(event, value) => {
                            obj.query = value;
                            onChange(event);
                        }}
                    />,
                    "A CSS selector or jQuery expression that targets the element to scroll to.",
                    !obj.target,
                    !obj.query ? "query required" : ""
                ],
                [
                    "vertical",
                    <Select
                        variant="standard"
                        size="small"
                        value={obj.block || "default"}
                        onChange={event => {
                            obj.block = event.target.value !== "default" ? event.target.value as ScrollLogicalPosition : undefined;
                            onChange(event as React.SyntheticEvent);
                        }}
                    >
                        <MenuItem value="default">(default)</MenuItem>
                        <MenuItem value="start">scroll to top of container</MenuItem>
                        <MenuItem value="center">scroll to middle of container</MenuItem>
                        <MenuItem value="end">scroll to bottom of container</MenuItem>
                        <MenuItem value="nearest">don't move if already in view</MenuItem>
                    </Select>,
                    "Determines vertical scrolling behavior.",
                    obj.block !== undefined
                ],
                [
                    "horizontal",
                    <Select
                        variant="standard"
                        size="small"
                        value={obj.inline || "default"}
                        onChange={event => {
                            obj.inline = event.target.value !== "default" ? event.target.value as ScrollLogicalPosition : undefined;
                            onChange(event as React.SyntheticEvent);
                        }}
                    >
                        <MenuItem value="default">(default)</MenuItem>
                        <MenuItem value="start">scroll to left of container</MenuItem>
                        <MenuItem value="center">scroll to middle of container</MenuItem>
                        <MenuItem value="end">scroll to right of container</MenuItem>
                        <MenuItem value="nearest">don't move if already in view</MenuItem>
                    </Select>,
                    "Determines horizontal scrolling behavior.",
                    obj.inline !== undefined
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
                    "A formula that determines whether the select is evaluated or bypassed. A formula is a Javascript expression enclosed in curly braces that returns a boolean true/false result. The formula can reference a selector result via `data.name`, where name is the name of any previously evaluated selector. Example: `{data.price !== null}`",
                    obj.when !== undefined
                ],
                /*
                [
                    "active",
                    <Switch
                        size="small"
                        checked={obj.active ?? true}
                        onChange={(event, value) => {
                            obj.active = value;
                            onChange(event);
                        }}
                    />,
                    "Determines whether the property is active or bypassed",
                    obj.active !== undefined
                ]
                */
            ]}
        />
    ) : null;
};
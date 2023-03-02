import React from "react";
import { TemplateItem } from "../lib";
import * as syphonx from "syphonx-lib";

import {
    MenuItem,
    Select
} from "@mui/material";

import {
    ComplexPropertyGrid,
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
        <ComplexPropertyGrid
            items={[
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
                    "A formula that determines whether the select is evaluated or bypassed.",
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
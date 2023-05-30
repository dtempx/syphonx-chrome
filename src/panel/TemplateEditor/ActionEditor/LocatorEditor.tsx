import React from "react";
import { TemplateItem } from "../lib";
import * as syphonx from "syphonx-lib";

import {
    TextField
} from "@mui/material";

import {
    AdvancedPropertyGrid,
    FormulaField,
    LocatorMethodDropdown,
    NameField
} from "./components";

export interface Props {
    item: TemplateItem;
    onChange: (event: React.SyntheticEvent<Element, Event>) => void;
}

export default ({ item, onChange }: Props) => {
    const obj = item?.obj as syphonx.Locator;
    return obj ? (
        <AdvancedPropertyGrid
            items={[
                [
                    "name",
                    <NameField
                        variant="standard"
                        validation="intermediate-name"
                        size="small"
                        placeholder="Name for locator output"
                        inputProps={{ maxLength: 32 }}    
                        value={obj.name}
                        onChange={(event, value) => {
                            obj.name = value!;
                            onChange(event);
                        }}
                    />,
                    "Specifies the name for the locator output result. Must start with an underscore and contain only lower-case letters, numbers and underscores.",
                    true,
                    !obj.name ? "A name must be specified" : ""
                ],
                [
                    "selector",
                    <TextField
                        variant="standard"
                        size="small"
                        placeholder="CSS Selector"
                        value={obj.selector}
                        onChange={event => {
                            obj.selector = event.target.value || "";
                            onChange(event);
                        }}
                    />,
                    "A CSS selector that defines the target of the locator.",
                    true,
                    !obj.selector ? "A selector must be specified" : ""
                ],
                [
                    "frame",
                    <TextField
                        variant="standard"
                        size="small"
                        placeholder="CSS Selector"
                        value={obj.frame}
                        onChange={event => {
                            obj.frame = event.target.value || undefined;
                            onChange(event);
                        }}
                    />,
                    "A CSS selector that defines the target of a frame locator.",
                    true
                ],
                [
                    "method",
                    <LocatorMethodDropdown
                        value={obj.method}
                        onChange={(event, value) => {
                            obj.method = value || undefined;
                            onChange(event);
                        }}
                    />,
                    "Name of the locator method to invoke.",
                    true,
                    !obj.method ? "A method must be specified" : ""
                ],
                [
                    "argument",
                    <TextField
                        variant="standard"
                        size="small"
                        placeholder=""
                        value={obj.params ? obj.params[0] : ""}
                        onChange={event => {
                            obj.params = event.target.value ? [event.target.value] : undefined;
                            onChange(event);
                        }}
                    />,
                    "A parameter value to pass to the method.",
                    true
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
                    "A formula that determines whether the locator action is triggered or bypassed. A formula is a Javascript expression enclosed in curly braces that returns a boolean true/false result. The formula can reference a selector result via `data.name`, where name is the name of any previously evaluated selector. Example: `{data.price !== null}`",
                    obj.when !== undefined
                ]
            ]}
        />
    ) : null;
};

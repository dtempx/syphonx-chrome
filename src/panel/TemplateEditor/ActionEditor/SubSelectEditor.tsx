import React from "react";
import { Switch } from "@mui/material";
import { TemplateItem } from "../lib";
import * as syphonx from "syphonx-lib";

import {
    AdvancedPropertyGrid,
    FormulaField,
    QueryEditorField,
    NumberField,
    RegexpField,
    SelectFormatDropdown,
    VariantField
} from "./components";

export interface Props {
    item: TemplateItem;
    onChange: (event: React.SyntheticEvent<Element, Event>) => void;
}

export default ({ item, onChange }: Props) => {
    const obj = item?.obj as syphonx.Select;
    return obj ? (
        <AdvancedPropertyGrid
            items={[
                [
                    "query",
                    <QueryEditorField
                        query={obj.query}
                        name={obj.name}
                        type={obj.type}
                        repeated={obj.repeated}
                        onChange={(event, value) => {
                            obj.query = value && value.length > 0 ? value : undefined;
                            onChange(event);
                        }}
                    />,
                    "A CSS selector or jQuery expression that determines what data is selected on the page.",
                    true,
                    !obj.query && !obj.value ? "A query or value must be specified." : ""
                ],
                [
                    "value",
                    <VariantField
                        variants={["string", "number", "boolean", "formula", "json"]}
                        value={obj.value}
                        onChange={(event, value) => {
                            obj.value = value || undefined;
                            onChange(event);
                        }}
                    />,
                    "A predetermined or a formula. If a query is also present then this value will be evaluated after the query, and the result of the query can be accessed in a formula value.",
                    obj.value !== undefined
                ],
                [
                    "all",
                    <Switch
                        size="small"
                        checked={obj.all ?? false}
                        onChange={(event, value) => {
                            obj.all = value;
                            onChange(event);
                        }}
                    />,
                    "Determines whether to evaluate all query stages, or stop at the first stage that produces a value.",
                    obj.all !== undefined
                ],
                [
                    "collate",
                    <Switch
                        size="small"
                        checked={obj.collate ?? false}
                        onChange={(event, value) => {
                            obj.collate = value;
                            onChange(event);
                        }}
                    />,
                    "Combines all selected nodes into a single value.",
                    obj.collate !== undefined
                ],
                [
                    "distinct",
                    <Switch
                        size="small"
                        checked={obj.distinct ?? false}
                        onChange={(event, value) => {
                            obj.distinct = value;
                            onChange(event);
                        }}
                    />,
                    "Removes duplicate values from an array.",
                    obj.distinct !== undefined
                ],
                [
                    "format",
                    <SelectFormatDropdown
                        value={obj.format}
                        onChange={(event, value) => {
                            obj.format = value;
                            onChange(event);
                        }}
                    />,
                    "Determines how the selected value is formatted.",
                    obj.format !== undefined
                ],
                [
                    "limit",
                    <NumberField
                        fullWidth
                        value={obj.limit}
                        onChange={(event, value) => {
                            obj.limit = value;
                            onChange(event);
                        }}
                    />,
                    "Limits the number of DOM nodes to be selected, unlimited if not specified.",
                    obj.limit !== undefined
                ],
                [
                    "negate",
                    <Switch
                        size="small"
                        checked={obj.negate ?? false}
                        onChange={(event, value) => {
                            obj.negate = value;
                            onChange(event);
                        }}
                    />,
                    "Negates a boolean query result, inverting a false result to true and vice-versa.",
                    obj.negate !== undefined
                ],
                [
                    "pattern",
                    <RegexpField
                        value={obj.pattern}
                        onChange={(event, value) => {
                            obj.pattern = value || undefined;
                            onChange(event);
                        }}
                    />,
                    "A regex pattern for validation, an error will be produced if the value does not match the pattern.",
                    obj.pattern !== undefined
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
                ]
            ]}
        />
    ) : null;
};
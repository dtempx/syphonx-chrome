import React from "react";
import { isFormula, TemplateItem } from "../lib";
import * as syphonx from "syphonx-lib";

import {
    Switch
} from "@mui/material";

import {
    AdvancedPropertyGrid,
    FormulaField,
    PlainTextField,
    QueryEditorField,
    RegexpField,
    SelectFormatDropdown,
    SelectTypeDropdown,
    NameField,
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
                    "name",
                    <NameField
                        validation="selector-name"
                        value={obj.name}
                        onChange={(event, value) => {
                            obj.name = value;
                            item.template.setSelected(obj);
                            onChange(event);                    
                        }}
                    />,
                    "Name of selected value, or blank representing a single unnamed value.",
                    true,
                    !obj.name && item.collection!.length > 1 ? "An unnamed item must be the only item within the group. Either remove this item or remove all of the other items." : ""
                ],
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
                    !obj.query && !obj.value && obj.type !== "object" ? "A query or value must be specified." : ""
                ],
                [
                    "comment",
                    <PlainTextField
                        value={obj.comment}
                        multiline
                        onChange={(event, value) => {
                            obj.comment = value ?? undefined;
                            onChange(event);
                        }}
                    />,
                    "Adds a comment for this selector.",
                    true
                ],
                [
                    "type",
                    <SelectTypeDropdown
                        value={obj.type}
                        onChange={(event, value) => {
                            obj.type = value;
                            if (value === "object") {
                                obj.select = [{}];
                                obj.union = undefined;
                            }
                            else {
                                obj.select = undefined;
                                obj.union = undefined;
                                obj.pivot = undefined; // legacy
                            }
                            onChange(event);
                        }}
                    />,
                    "Determines the type of the property value.",
                    true,
                    obj.type === "object" && !obj.select && !obj.pivot && !obj.union ? "Choose whether to create a sub-select or a union." : ""
                ],
                [
                    "value",
                    <VariantField
                        variants={["string", "number", "boolean", "formula", "json"]}
                        value={obj.value}
                        fullWidth
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
                    "limit",
                    <VariantField
                        variants={["number", "formula"]}
                        value={obj.limit}
                        fullWidth
                        onChange={(event, value) => {
                            obj.limit = isFormula(value) ? value : parseInt(value);
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
                    <>remove&nbsp;nulls</>,
                    <Switch
                        size="small"
                        checked={obj.removeNulls ?? false}
                        onChange={(event, value) => {
                            obj.removeNulls = value;
                            onChange(event);
                        }}
                    />,
                    "Removes null values from an array.",
                    obj.removeNulls !== undefined
                ],
                [
                    "repeated",
                    <Switch
                        size="small"
                        checked={obj.repeated ?? false}
                        onChange={(event, value) => {
                            obj.repeated = value;
                            onChange(event);
                        }}
                    />,
                    "Indicates whether the data is single-valued or repeated within an array.",
                    true
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
                    "Determines whether the property is required which produces an error if a value is not obtained.",
                    obj.required !== undefined
                ],
                [
                    "union",
                    <Switch
                        size="small"
                        checked={obj.union !== undefined}
                        onChange={(event, checked) => {
                            const subitem = (obj.select||[])[0] || obj.pivot || (obj.union||[])[0] || {};
                            if (checked) {
                                obj.select = undefined;
                                obj.union = [subitem];
                            }
                            else {
                                obj.select = [subitem];
                                obj.union = undefined;
                            }
                            onChange(event);
                        }}
                    />,
                    "Create a union of multiple selector object cases.",
                    obj.union !== undefined
                ],
                [
                    "waitfor",
                    <Switch
                        size="small"
                        checked={obj.waitfor ?? false}
                        onChange={(event, value) => {
                            obj.waitfor = value;
                            onChange(event);
                        }}
                    />,
                    "Waits for the selector to appear when loading the page.",
                    obj.waitfor !== undefined
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
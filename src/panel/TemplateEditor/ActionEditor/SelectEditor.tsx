import React from "react";
import { TemplateItem } from "../lib";
import * as syphonx from "syphonx-lib";

import {
    Stack,
    Switch,
    Typography
} from "@mui/material";

import {
    WarningAmberOutlined as AlertIcon
} from "@mui/icons-material";

import {
    ComplexPropertyGrid,
    FormulaField,
    QueryEditorField,
    NumberField,
    RegexpField,
    SelectFormatDropdown,
    SelectTypeField,
    SymbolicNameField,
    VariantField
} from "./components";

export interface Props {
    item: TemplateItem;
    onChange: (event: React.SyntheticEvent<Element, Event>) => void;
}

export default ({ item, onChange }: Props) => {
    const obj = item?.obj as syphonx.Select;
    return obj ? (
        <ComplexPropertyGrid
            items={[
                [
                    "name",
                    <SymbolicNameField
                        variant="snake-case"
                        value={obj.name}
                        onChange={(event, value) => {
                            obj.name = value;
                            item.template.setSelected(obj);
                            onChange(event);                    
                        }}
                    />,
                    "Determines the name of the selected value, or blank representing a single unnamed value.",
                    true
                ],
                [
                    <Stack direction="row">
                        <Typography fontSize="small">query</Typography>
                        {!obj.query && !obj.value && <AlertIcon color="warning" fontSize="small" sx={{ ml: 1 }} />}
                    </Stack>,
                    <QueryEditorField
                        query={obj.query}
                        name={obj.name}
                        type={obj.type}
                        repeated={obj.repeated}
                        onChange={(event, value) => {
                            obj.query = value;
                            onChange(event);
                        }}
                    />,
                    "A CSS selector or jQuery expression that determines what data is selected on the page.",
                    true
                ],
                [
                    <Stack direction="row">
                        <Typography fontSize="small">type</Typography>
                        {obj.type === "object" && !obj.select && !obj.pivot && !obj.union && (
                            <AlertIcon color="warning" fontSize="small" sx={{ ml: 1 }} />
                        )}
                    </Stack>,
                    <SelectTypeField
                        item={item}
                        onChange={onChange}
                    />,
                    "Determines the type of the property value.",
                    true
                ],
                [
                    "repeated",
                    <Switch
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
                    "value",
                    <VariantField
                        variants={["string", "number", "boolean", "formula", "json"]}
                        value={obj.value}
                        onChange={(event, value) => {
                            obj.value = value || undefined;
                            onChange(event);
                        }}
                    />,
                    "A predetermined or computed value, only used if a DOM query is unspecified.",
                    obj.value !== undefined
                ],
                [
                    "all",
                    <Switch
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
                    "limit",
                    <NumberField
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
                    "collate",
                    <Switch
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
                [
                    "active",
                    <Switch
                        checked={obj.active ?? true}
                        onChange={(event, value) => {
                            obj.active = value;
                            onChange(event);
                        }}
                    />,
                    "Determines whether the property is active or bypassed",
                    obj.active !== undefined
                ]
            ]}
        />
    ) : null;
};
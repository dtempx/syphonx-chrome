import React, { useMemo } from "react";
import { Switch } from "@mui/material";
import { useTemplate } from "../../context";
import { Template } from "../../../lib";
import * as syphonx from "syphonx-lib";

import {
    ComplexPropertyGrid,
    FormulaField,
    QueryEditorField,
    NumberField,
    RegexpField,
    SelectFormatDropdown,
    SelectTypeDropdown,
    SymbolicNameField,
    VariantField
} from "./components";

export default () => {
    const { template: json, setTemplate } = useTemplate();

    const { template, obj } = useMemo(() => {
        const template = new Template(json);
        const item = template.selected();
        const obj = item?.obj as syphonx.Select;
        return { template, obj };
    }, [json]);

    function onChangeName(event: React.SyntheticEvent<Element, Event>, value: string | undefined): void {
        obj.name = value;
        template.setSelected(obj);
        setTemplate(template.toString());
    }

    function onChangeQuery(event: React.SyntheticEvent<Element, Event>, query: syphonx.SelectQuery[]): void {
        obj.query = query;
        setTemplate(template.toString());
    }

    return obj ? (
        <ComplexPropertyGrid
            items={[
                [
                    "name",
                    <SymbolicNameField
                        variant="snake-case"
                        value={obj.name}
                        onChange={onChangeName}
                    />,
                    "Determines the name of the selected value, or blank representing a single unnamed value.",
                    true
                ],
                [
                    "query",
                    <QueryEditorField
                        query={obj.query}
                        name={obj.name}
                        type={obj.type}
                        repeated={obj.repeated}
                        onChange={onChangeQuery}
                    />,
                    "A CSS selector or jQuery expression that determines what data is selected on the page.",
                    true
                ],
                [
                    "type",
                    <SelectTypeDropdown
                        value={obj.type}
                        onChange={(event, value) => { obj.type = value; setTemplate(template.toString()); }}
                    />,
                    "Determines the type of the property value.",
                    true
                ],
                [
                    "repeated",
                    <Switch
                        checked={obj.repeated ?? false}
                        onChange={(event, value) => { obj.repeated = value; setTemplate(template.toString()); }}
                    />,
                    "Indicates whether the data is single-valued or repeated within an array.",
                    true
                ],
                [
                    "required",
                    <Switch
                        checked={obj.required ?? false}
                        onChange={(event, value) => { obj.required = value; setTemplate(template.toString()); }}
                    />,
                    "Determines whether the property is required which produces an error if a value is not obtained.",
                    obj.required !== undefined
                ],
                [
                    "value",
                    <VariantField
                        variants={["string", "number", "boolean", "formula", "json"]}
                        value={obj.value}
                        onChange={(event, value) => { obj.value = value || undefined; setTemplate(template.toString()); }}
                    />,
                    "A predetermined or computed value, only used if a DOM query is unspecified.",
                    obj.value !== undefined
                ],
                [
                    "all",
                    <Switch
                        checked={obj.all ?? false}
                        onChange={(event, value) => { obj.all = value; setTemplate(template.toString()); }}
                    />,
                    "Determines whether to evaluate all query stages, or stop at the first stage that produces a value.",
                    obj.all !== undefined
                ],
                [
                    "limit",
                    <NumberField
                        value={obj.limit}
                        onChange={(event, value) => { obj.limit = value; setTemplate(template.toString()); }}
                    />,
                    "Limits the number of DOM nodes to be selected, unlimited if not specified.",
                    obj.limit !== undefined
                ],
                [
                    "format",
                    <SelectFormatDropdown
                        value={obj.format}
                        onChange={(event, value) => { obj.format = value; setTemplate(template.toString());  }}
                    />,
                    "Determines how the selected value is formatted.",
                    obj.format !== undefined
                ],
                [
                    "pattern",
                    <RegexpField
                        value={obj.pattern}
                        onChange={(event, value) => { obj.pattern = value || undefined; setTemplate(template.toString()); }}
                    />,
                    "A regex pattern for validation, an error will be produced if the value does not match the pattern.",
                    obj.pattern !== undefined
                ],
                [
                    "collate",
                    <Switch
                        checked={obj.collate ?? false}
                        onChange={(event, value) => { obj.collate = value; setTemplate(template.toString()); }}
                    />,
                    "Combines all selected nodes into a single value.",
                    obj.collate !== undefined
                ],
                [
                    "when",
                    <FormulaField
                        value={obj.when}
                        onChange={(event, value) => { obj.when = value || undefined; setTemplate(template.toString()); }}
                    />,
                    "A formula that determines whether the select is evaluated or bypassed.",
                    obj.when !== undefined
                ],
                [
                    "active",
                    <Switch
                        checked={obj.active ?? true}
                        onChange={(event, value) => { obj.active = value; setTemplate(template.toString()); }}
                    />,
                    "Determines whether the property is active or bypassed",
                    obj.active !== undefined
                ]
            ]}
        />
    ) : null;
};
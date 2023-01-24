import React, { useState } from "react";
import { Switch } from "@mui/material";
import * as syphonx from "syphonx-lib";
import { useTemplate } from "../../context";
import { Template } from "../../../lib";
import SelectorField from "./components/SelectorField";
import QueryBuilder from "../QueryBuilder";

import {
    ComplexPropertyGrid,
    SelectFormatDropdown,
    SelectTypeDropdown,
    ValidateTextField
} from "./components";

export default () => {
    const [queryEditorOpen, setQueryEditorOpen] = useState(false);
    
    const { template: json, setTemplate } = useTemplate();
    const template = new Template(json);
    const item = template.selected();
    const select = item?.obj as syphonx.Select;
    if (!select)
        return null;

    function validateName(event: React.ChangeEvent<HTMLInputElement>, value: string): boolean {
        return value ? /^[a-z][a-z0-9_]*$/.test(value) : true;
    }

    function validateNumber(event: React.ChangeEvent<HTMLInputElement>, value: string): boolean {
        return value ? parseInt(value) >= 0 : true;
    }

    function handleRename(event: React.SyntheticEvent<Element, Event>, value: string) {
        select.name = value || undefined;
        template.setSelected(select);
        setTemplate(template.toString());
    }

    return (
        <>
            <ComplexPropertyGrid
                items={[
                    [
                        "name",
                        <ValidateTextField
                            variant="standard"
                            size="small"
                            value={select.name}
                            placeholder="(none)"
                            fullWidth
                            onChange={handleRename}
                            onValidate={validateName}
                        />,
                        "Determines the name of the selected value, or blank representing a single unnamed value",
                        true
                    ],
                    [
                        "query",
                        <SelectorField
                            query={select.query}
                            onClick={() => setQueryEditorOpen(true)}
                        />,
                        "A CSS selector or jQuery expression that determines what data is selected on the page",
                        true
                    ],
                    [
                        "type",
                        <SelectTypeDropdown
                            value={select.type}
                            onChange={(event, value) => { select.type = value; setTemplate(template.toString()); }}
                        />,
                        "Determines the type of the property value",
                        true
                    ],
                    [
                        "repeated",
                        <Switch
                            checked={select.repeated ?? false}
                            onChange={(event, value) => { select.repeated = value; setTemplate(template.toString()); }}
                        />,
                        "Indicates whether the data is single-valued or repeated within an array",
                        true
                    ],
                    [
                        "required",
                        <Switch
                            checked={select.required ?? false}
                            onChange={(event, value) => { select.required = value; setTemplate(template.toString()); }}
                        />,
                        "Determines whether the property is required which produces an error if a value is not obtained",
                        select.required !== undefined
                    ],
                    [
                        "value",
                        <ValidateTextField
                            variant="standard"
                            size="small"
                            value={select.value}
                            onChange={(event, value) => { select.value = value || undefined; setTemplate(template.toString()); }}
                            onValidate={validateName}
                        />,
                        "A predetermined or computed value, used if a DOM query is not specified",
                        select.value !== undefined
                    ],
                    [
                        "all",
                        <Switch
                            checked={select.all ?? false}
                            onChange={(event, value) => { select.all = value; setTemplate(template.toString()); }}
                        />,
                        "Determines whether to evaluate all query stages, or stop at the first stage that produces a value",
                        select.all !== undefined
                    ],
                    [
                        "limit",
                        <ValidateTextField
                            variant="standard"
                            size="small"
                            value={select.limit}
                            onChange={(event, value) => { select.limit = value ? parseInt(value) : undefined; setTemplate(template.toString()); }}
                            onValidate={validateNumber}
                        />,
                        "Limits the number of nodes to be selected, unlimited if not specified",
                        select.limit !== undefined
                    ],
                    [
                        "format",
                        <SelectFormatDropdown
                            value={select.format}
                            onChange={(event, value) => { select.format = value; setTemplate(template.toString());  }}
                        />,
                        "Determines how the selected value is formatted",
                        select.format !== undefined
                    ],
                    [
                        "pattern",
                        <ValidateTextField
                            variant="standard"
                            size="small"
                            value={select.pattern}
                            onChange={(event, value) => { select.pattern = value || undefined; setTemplate(template.toString()); }}
                            onValidate={validateName}
                        />,
                        "A regex pattern for validation, an error will be produced if the value does not match the pattern",
                        select.pattern !== undefined
                    ],
                    [
                        "collate",
                        <Switch
                            checked={select.collate ?? false}
                            onChange={(event, value) => { select.collate = value; setTemplate(template.toString()); }}
                        />,
                        "Combines all selected nodes into a single value",
                        select.collate !== undefined
                    ],
                    [
                        "when",
                        <ValidateTextField
                            variant="standard"
                            size="small"
                            value={select.when}
                            onChange={(event, value) => { select.when = value || undefined; setTemplate(template.toString()); }}
                            onValidate={validateName}
                        />,
                        "A formula that determines whether the select is evaluated or bypassed",
                        select.when !== undefined
                    ],
                    [
                        "active",
                        <Switch
                            checked={select.active ?? true}
                            onChange={(event, value) => { select.active = value; setTemplate(template.toString()); }}
                        />,
                        "Determines whether the property is active or bypassed",
                        select.active !== undefined
                    ]
                ]}
            />
            <QueryBuilder
                value={select}
                open={queryEditorOpen}
                onClose={() => setQueryEditorOpen(false)}
                onChange={(event, value) => { select.query = value; setTemplate(template.toString()); }}
            />
        </>
    );
};
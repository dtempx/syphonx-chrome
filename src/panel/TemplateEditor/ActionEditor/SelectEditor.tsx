import React, { useState } from "react";
import { Switch } from "@mui/material";
import * as syphonx from "syphonx-lib";
import { useTemplate } from '../../context';
import { ValidateTextField, PropertyGrid, PropertyGridItem } from "../../../components/";
import { SelectFormatDropdown, SelectTypeDropdown } from "./components";
import SelectorField from "./SelectorField";
import QueryBuilder from "../QueryBuilder";
import DebugView from "./DebugView";

export default () => {
    const { template, setTemplate, advanced } = useTemplate();
    const [queryEditorOpen, setQueryEditorOpen] = useState(false);
    const item = template.selectedItem();
    if (!item)
        return null;

    function validateName(event: React.ChangeEvent<HTMLInputElement>, value: string): boolean {
        return value ? /^[a-z][a-z0-9_]*$/.test(value) : true;
    }

    function validateNumber(event: React.ChangeEvent<HTMLInputElement>, value: string): boolean {
        return value ? parseInt(value) >= 0 : true;
    }

    const select = item.obj as syphonx.Select;
    const items: PropertyGridItem[] = [
        [
            "name",
            <ValidateTextField
                variant="standard"
                size="small"
                value={select.name}
                placeholder="(none)"
                fullWidth
                onChange={(event, value) => { select.name = value; setTemplate(template.clone()); }}
                onValidate={validateName}
            />,
            "Determines the name of the selected value, or blank representing a single unnamed value"
        ],
        [
            "query",
            <SelectorField
                query={select.query}
                onClick={() => setQueryEditorOpen(true)}
            />,
            "A CSS selector or jQuery expression that determines what data is selected on the page"
        ],
        [
            "type",
            <SelectTypeDropdown
                value={select.type}
                onChange={(event, value) => { select.type = value; setTemplate(template.clone()); }}
            />,
            "Determines the type of the property value"
        ],
        [
            "repeated",
            <Switch
                checked={select.repeated ?? false}
                onChange={(event, value) => { select.repeated = value; setTemplate(template.clone()); }}
            />,
            "Indicates whether the data is single-valued or repeated within an array"
        ]
    ];
    if (advanced)
        items.push(...[
            [
                "required",
                <Switch
                    checked={select.required ?? false}
                    onChange={(event, value) => { select.required = value; setTemplate(template.clone()); }}
                />,
                "Determines whether the property is required which produces an error if a value is not obtained"
            ],
            [
                "value",
                <ValidateTextField
                    variant="standard"
                    size="small"
                    value={select.value}
                    onChange={(event, value) => { select.value = value || undefined; setTemplate(template.clone()); }}
                    onValidate={validateName}
                />,
                "A predetermined or computed value, used if a DOM query is not specified"
            ],
            [
                "all",
                <Switch
                    checked={select.all ?? false}
                    onChange={(event, value) => { select.all = value; setTemplate(template.clone()); }}
                />,
                "Determines whether to evaluate all query stages, or stop at the first stage that produces a value"
            ],
            [
                "limit",
                <ValidateTextField
                    variant="standard"
                    size="small"
                    value={select.limit}
                    onChange={(event, value) => { select.limit = value ? parseInt(value) : undefined; setTemplate(template.clone()); }}
                    onValidate={validateNumber}
                />,
                "Limits the number of nodes to be selected, unlimited if not specified"
            ],
            [
                "format",
                <SelectFormatDropdown
                    value={select.format}
                    onChange={(event, value) => { select.format = value; setTemplate(template.clone());  }}
                />,
                "Determines how the selected value is formatted"
            ],
            [
                "pattern",
                <ValidateTextField
                    variant="standard"
                    size="small"
                    value={select.pattern}
                    onChange={(event, value) => { select.pattern = value || undefined; setTemplate(template.clone()); }}
                    onValidate={validateName}
                />,
                "A regex pattern for validation, an error will be produced if the value does not match the pattern"
            ],
            [
                "collate",
                <Switch
                    checked={select.collate ?? false}
                    onChange={(event, value) => { select.collate = value; setTemplate(template.clone()); }}
                />,
                "Combines all selected nodes into a single value"
            ],
            [
                "when",
                <ValidateTextField
                    variant="standard"
                    size="small"
                    value={select.when}
                    onChange={(event, value) => { select.when = value || undefined; setTemplate(template.clone()); }}
                    onValidate={validateName}
                />,
                "A formula that determines whether the select is evaluated or bypassed"
            ],
            [
                "active",
                <Switch
                    checked={select.active ?? true}
                    onChange={(event, value) => { select.active = value; setTemplate(template.clone()); }}
                />,
                "Determines whether the property is active or bypassed"
            ],
            [
                "debug",
                <DebugView />,
                "Debug"
            ]
        ] as PropertyGridItem[]);

    return (
        <>
            <PropertyGrid items={items} />
            <QueryBuilder
                value={select}
                open={queryEditorOpen}
                onClose={() => setQueryEditorOpen(false)}
                onChange={(event, value) => { select.query = value; setTemplate(template.clone()); }}
            />
        </>
    );
};
import React, { useState } from "react";
import { Switch, TextField } from "@mui/material";
import * as syphonx from "syphonx-lib";
import { useTemplate } from '../../context';
import { ValidateTextField, PropertyGrid, PropertyGridItem } from "../../../components/";
import SelectorField from "./SelectorField";
import QueryBuilder from "./QueryBuilder/index";
import DebugView from "./DebugView";

export default () => {
    const { template, setTemplate, advanced } = useTemplate();
    const [queryEditorOpen, setQueryEditorOpen] = useState(false);
    const item = template.selectedItem();
    if (!item)
        return null;

    function validateName(event: React.ChangeEvent<HTMLInputElement>, value: string): boolean {
        return /^[a-z][a-z0-9_]*$/.test(value);
    }

    function validateNumber(event: React.ChangeEvent<HTMLInputElement>, value: string): boolean {
        return value ? parseInt(value) >= 0 : true;
    }

    const select = item.obj as syphonx.Select;
    const items: PropertyGridItem[] = [
        [
            "query",
            <SelectorField
                query={select.query}
                onClick={() => setQueryEditorOpen(true)}
            />,
            "A CSS selector or jQuery expression that determines what data is selected on the page"
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
                "Determines whether the click is required or optional, an error is produced if conditions on the page do not exists for the click to occur"
            ],
            [
                "retry",
                <Switch
                    checked={select.required ?? false}
                    onChange={(event, value) => { select.required = value; setTemplate(template.clone()); }}
                />,
                "Determines the number of times to retry clicking and testing for the expected result"
            ],
            [
                "snooze",
                <TextField size="small" />,
                "An amount of time to snooze before or after clicking"
            ],
            [
                "waitfor",
                <TextField size="small" />,
                "Wait for a condition to appear on the page before clicking"
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
                "Makes value selection conditional based whether the evaluation produces a true result"
            ],
            [
                "active",
                <Switch
                    checked={select.active ?? true}
                    onChange={(event, value) => { select.active = value; setTemplate(template.clone()); }}
                />,
                "Determines whether the property is active or ignored"
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
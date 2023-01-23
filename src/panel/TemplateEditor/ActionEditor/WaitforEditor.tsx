import React, { useState } from "react";
import { Switch, TextField } from "@mui/material";
import * as syphonx from "syphonx-lib";
import { useTemplate } from '../../context';
import { ValidateTextField, PropertyGrid, PropertyGridItem } from "../../../components/";
import { SelectOnDropdown } from "./components";
import { Template } from "../../../lib";
import SelectorField from "./SelectorField";
import QueryBuilder from "../QueryBuilder";
import DebugView from "./DebugView";

export default () => {
    const { template: obj, setTemplate, advanced } = useTemplate();
    const [queryEditorOpen, setQueryEditorOpen] = useState(false);

    const template = new Template(obj);
    const item = template.selected();
    if (!item)
        return null;

    function validateName(event: React.ChangeEvent<HTMLInputElement>, value: string): boolean {
        return /^[a-z][a-z0-9_]*$/.test(value);
    }

    const waitfor = item.obj as syphonx.WaitFor;
    const items: PropertyGridItem[] = [
        [
            "query",
            <SelectorField
                query={waitfor.query}
                onClick={() => setQueryEditorOpen(true)}
            />,
            "A CSS selector or jQuery expression that determines the content to wait for on the page"
        ]
    ];

    if (advanced)
        items.push(...[
            [
                "required",
                <Switch
                    checked={waitfor.required ?? false}
                    onChange={(event, value) => { waitfor.required = value; setTemplate(template.toString()); }}
                />,
                "Determines whether the click is optional or required, producing if no click target is found on the page"
            ],
            [
                "on",
                <SelectOnDropdown
                    value={waitfor.on}
                    onChange={(event, value) => { waitfor.on = value; setTemplate(template.toString());  }}
                />,
                "Determines whether to wait for any, all, or none of the selectors"
            ],
            [
                "pattern",
                <TextField size="small" />,
                "Waits for a specific text pattern if specified"
            ],
            [
                "timeout",
                <TextField size="small" />,
                "Number of seconds to wait before timing out"
            ],
            [
                "when",
                <ValidateTextField
                    variant="standard"
                    size="small"
                    value={waitfor.when}
                    onChange={(event, value) => { waitfor.when = value || undefined; setTemplate(template.toString()); }}
                    onValidate={validateName}
                />,
                "A formula that determines whether the click is evaluated or bypassed"
            ],
            [
                "active",
                <Switch
                    checked={waitfor.active ?? true}
                    onChange={(event, value) => { waitfor.active = value; setTemplate(template.toString()); }}
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
                value={waitfor}
                open={queryEditorOpen}
                onClose={() => setQueryEditorOpen(false)}
                onChange={(event, value) => { waitfor.query = value; setTemplate(template.toString()); }}
            />
        </>
    );
};
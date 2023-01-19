import React, { useState } from "react";
import { Switch, TextField } from "@mui/material";
import * as syphonx from "syphonx-lib";
import { useTemplate } from '../../context';
import { ValidateTextField, PropertyGrid, PropertyGridItem } from "../../../components/";
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
        return /^[a-z][a-z0-9_]*$/.test(value);
    }

    function validateNumber(event: React.ChangeEvent<HTMLInputElement>, value: string): boolean {
        return value ? parseInt(value) >= 0 : true;
    }

    const click = item.obj as syphonx.Select;
    const items: PropertyGridItem[] = [
        [
            "query",
            <SelectorField
                query={click.query}
                onClick={() => setQueryEditorOpen(true)}
            />,
            "A CSS selector or jQuery expression that determines the click target"
        ]
    ];

    if (advanced)
        items.push(...[
            [
                "when",
                <ValidateTextField
                    variant="standard"
                    size="small"
                    value={click.when}
                    onChange={(event, value) => { click.when = value || undefined; setTemplate(template.clone()); }}
                    onValidate={validateName}
                />,
                "A formula that determines whether the click is evaluated or bypassed"
            ],
            [
                "active",
                <Switch
                    checked={click.active ?? true}
                    onChange={(event, value) => { click.active = value; setTemplate(template.clone()); }}
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
                value={click}
                open={queryEditorOpen}
                onClose={() => setQueryEditorOpen(false)}
                onChange={(event, value) => { click.query = value; setTemplate(template.clone()); }}
            />
        </>
    );
};
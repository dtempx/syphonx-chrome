import React, { useState } from "react";
import { Switch, TextField } from "@mui/material";
import * as syphonx from "syphonx-lib";
import { useTemplate } from "../../context";
import { ComplexPropertyGrid, ValidateTextField } from "./components/";
import { Template } from "../../../lib";
import SelectorField from "./components/SelectorField";
import QueryBuilder from "../QueryBuilder";

export default () => {
    const [queryEditorOpen, setQueryEditorOpen] = useState(false);

    const { template: json, setTemplate } = useTemplate();
    const template = new Template(json);
    const item = template.selected();
    if (!item)
        return null;

    function validateName(event: React.ChangeEvent<HTMLInputElement>, value: string): boolean {
        return /^[a-z][a-z0-9_]*$/.test(value);
    }

    const click = item.obj as syphonx.Select;

    return (
        <>
            <ComplexPropertyGrid items={[
                [
                    "query",
                    <SelectorField
                        query={click.query}
                        onClick={() => setQueryEditorOpen(true)}
                    />,
                    "A CSS selector or jQuery expression that determines the click target",
                    true
                ],
                [
                    "required",
                    <Switch
                        checked={click.required ?? false}
                        onChange={(event, value) => { click.required = value; setTemplate(template.toString()); }}
                    />,
                    "Determines whether the click is optional or required, producing if no click target is found on the page",
                    true
                ],
                [
                    "retry",
                    <Switch
                        checked={click.required ?? false}
                        onChange={(event, value) => { click.required = value; setTemplate(template.toString()); }}
                    />,
                    "Determines the number of attempts to retry clicking and testing for the expected result",
                    click.required !== undefined
                ],
                [
                    "snooze",
                    <TextField size="small" />,
                    "Number of seconds to snooze before or after clicking",
                    false
                ],
                [
                    "waitfor",
                    <TextField size="small" />,
                    "Wait for a condition to appear on the page before clicking",
                    false
                ],
                [
                    "when",
                    <ValidateTextField
                        variant="standard"
                        size="small"
                        value={click.when}
                        onChange={(event, value) => { click.when = value || undefined; setTemplate(template.toString()); }}
                        onValidate={validateName}
                    />,
                    "A formula that determines whether the click is evaluated or bypassed",
                    click.when !== undefined
                ],
                [
                    "active",
                    <Switch
                        checked={click.active ?? true}
                        onChange={(event, value) => { click.active = value; setTemplate(template.toString()); }}
                    />,
                    "Determines whether the property is active or bypassed",
                    click.active !== undefined
                ]
            ]} />
            <QueryBuilder
                value={click}
                open={queryEditorOpen}
                onClose={() => setQueryEditorOpen(false)}
                onChange={(event, value) => { click.query = value; setTemplate(template.toString()); }}
            />
        </>
    );
};
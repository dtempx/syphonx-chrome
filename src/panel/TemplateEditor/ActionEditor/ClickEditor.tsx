import React, { useState } from "react";
import { Switch } from "@mui/material";
import * as syphonx from "syphonx-lib";
import { useTemplate } from "../../context";
import { Template } from "../../../lib";
import QueryBuilder from "../QueryBuilder";

import {
    ComplexPropertyGrid,
    FormulaField,
    NumberRangeField,
    SelectorField
} from "./components";

export default () => {
    const [queryEditorOpen, setQueryEditorOpen] = useState(false);
    const { template: json, setTemplate } = useTemplate();
    const template = new Template(json);
    const item = template.selected();
    const obj = item?.obj as syphonx.Click;
    return obj ? (
        <>
            <ComplexPropertyGrid items={[
                [
                    "query",
                    <SelectorField
                        query={obj.query}
                        onClick={() => setQueryEditorOpen(true)}
                    />,
                    "A CSS selector or jQuery expression that determines the click target.",
                    true
                ],
                [
                    "required",
                    <Switch
                        checked={obj.required ?? false}
                        onChange={(event, value) => { obj.required = value; setTemplate(template.toString()); }}
                    />,
                    "Determines whether the click is optional or required, producing if no click target is found on the page.",
                    true
                ],
                [
                    "retry",
                    <Switch
                        checked={obj.required ?? false}
                        onChange={(event, value) => { obj.required = value; setTemplate(template.toString()); }}
                    />,
                    "Determines the number of attempts to retry clicking and testing for the expected result.",
                    obj.required !== undefined
                ],
                [
                    "snooze",
                    <NumberRangeField
                        value={obj.snooze as [number, number]}
                        onChange={(event, value) => { obj.snooze = value as syphonx.SnoozeInterval; setTemplate(template.toString()); }}
                    />,
                    "Number of seconds to snooze before the click.",
                    false
                ],
                /*
                [
                    "waitfor",
                    <FormulaField
                        value={obj.waitfor}
                        onClick={}
                    />,
                    "Wait for a condition to appear on the page before clicking.",
                    false
                ],
                */
                [
                    "when",
                    <FormulaField
                        value={obj.when}
                        onChange={(event, value) => { obj.when = value || undefined; setTemplate(template.toString()); }}
                    />,
                    "A formula that determines whether the click is evaluated or bypassed.",
                    obj.when !== undefined
                ],
                [
                    "active",
                    <Switch
                        checked={obj.active ?? true}
                        onChange={(event, value) => { obj.active = value; setTemplate(template.toString()); }}
                    />,
                    "Determines whether the property is active or bypassed.",
                    obj.active !== undefined
                ]
            ]} />
            <QueryBuilder
                value={obj}
                open={queryEditorOpen}
                onClose={() => setQueryEditorOpen(false)}
                onChange={(event, value) => { obj.query = value || []; setTemplate(template.toString()); }}
            />
        </>
    ) : null;
};
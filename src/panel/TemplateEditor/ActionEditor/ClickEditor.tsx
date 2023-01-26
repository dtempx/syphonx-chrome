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
    NumberRangeField
} from "./components";

export default () => {
    const { template: json, setTemplate } = useTemplate();

    const { template, obj } = useMemo(() => {
        const template = new Template(json);
        const item = template.selected();
        const obj = item?.obj as syphonx.Click;
        return { template, obj };
    }, [json]);

    return obj ? (
        <ComplexPropertyGrid items={[
            [
                "query",
                <QueryEditorField
                    name="click"
                    query={obj.query}
                    onChange={(event, value) => { obj.query = value; setTemplate(template.toString()); }}
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
                <NumberField
                    value={obj.retry}
                    onChange={(event, value) => { obj.retry = value; setTemplate(template.toString()); }}
                    min={0}
                />,
                "Determines the number of attempts to retry clicking and testing for the expected result. (default=0)",
                obj.retry !== undefined
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
    ) : null;
};
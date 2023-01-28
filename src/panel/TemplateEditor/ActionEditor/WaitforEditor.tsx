import React, { useMemo } from "react";
import { Switch } from "@mui/material";
import { useTemplate } from "../../context";
import { Template } from "../lib";
import * as syphonx from "syphonx-lib";

import {
    ComplexPropertyGrid,
    FormulaField,
    QueryEditorField,
    NumberField,
    RegexpField,
    SelectOnDropdown
} from "./components";

export default () => {
    const { template: json, setTemplate } = useTemplate();

    const { template, obj } = useMemo(() => {
        const template = new Template(json);
        const item = template.selected();
        const obj = item?.obj as syphonx.WaitFor;
        return { template, obj };
    }, [json]);

    return obj ? (
        <ComplexPropertyGrid
            items={[
                [
                    "query",
                    <QueryEditorField
                        name="waitfor"
                        query={obj.query}
                        onChange={(event, value) => { obj.query = value; setTemplate(template.toString()); }}
                    />,
                    "A CSS selector or jQuery expression that determines the content to wait for on the page.",
                    true
                ],
                [
                    "required",
                    <Switch
                        checked={obj.required ?? false}
                        onChange={(event, value) => { obj.required = value; setTemplate(template.toString()); }}
                    />,
                    "Determines whether the click is optional or required, producing if no click target is found on the page.",
                    obj.required !== undefined
                ],
                [
                    "on",
                    <SelectOnDropdown
                        value={obj.on}
                        onChange={(event, value) => { obj.on = value; setTemplate(template.toString());  }}
                    />,
                    "Determines whether to wait for any, all, or none of the selectors.",
                    obj.on !== undefined
                ],
                [
                    "pattern",
                    <RegexpField
                        value={obj.pattern}
                        onChange={(event, value) => { obj.pattern = value; setTemplate(template.toString());  }}
                    />,
                    "Waits for a specific text pattern if specified.",
                    obj.pattern !== undefined
                ],
                [
                    "timeout",
                    <NumberField
                        value={obj.timeout}
                        onChange={(event, value) => { obj.timeout = value; setTemplate(template.toString());  }}
                    />,
                    "Number of seconds to wait before timing out.",
                    obj.timeout !== undefined
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
            ]}
        />
    ) : null;
};
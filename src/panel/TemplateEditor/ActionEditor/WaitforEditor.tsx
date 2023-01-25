import React, { useState } from "react";
import { Switch } from "@mui/material";
import * as syphonx from "syphonx-lib";
import { useTemplate } from "../../context";
import {  } from "./components";
import { Template } from "../../../lib";
import QueryBuilder from "../QueryBuilder";

import {
    ComplexPropertyGrid,
    FormulaField,
    NumberField,
    RegexpField,
    SelectorField,
    SelectOnDropdown
} from "./components";

export default () => {
    const [queryEditorOpen, setQueryEditorOpen] = useState(false);

    const { template: json, setTemplate } = useTemplate();
    const template = new Template(json);
    const item = template.selected();
    const obj = item?.obj as syphonx.WaitFor;

    function validateName(event: React.ChangeEvent<HTMLInputElement>, value: string): boolean {
        return /^[a-z][a-z0-9_]*$/.test(value);
    }

    return obj ? (
        <>
            <ComplexPropertyGrid
                items={[
                    [
                        "query",
                        <SelectorField
                            query={obj.query}
                            onClick={() => setQueryEditorOpen(true)}
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
            <QueryBuilder
                value={obj}
                open={queryEditorOpen}
                onClose={() => setQueryEditorOpen(false)}
                onChange={(event, value) => { obj.query = value; setTemplate(template.toString()); }}
            />
        </>
    ) : null;
};
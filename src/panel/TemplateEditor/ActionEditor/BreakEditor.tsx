import React, { useMemo } from "react";
import { Switch } from "@mui/material";
import { useTemplate } from "../../context";
import { Template } from "../lib";
import * as syphonx from "syphonx-lib";

import {
    ComplexPropertyGrid,
    FormulaField,
    QueryEditorField,
    RegexpField,
    SelectOnDropdown
} from "./components";

export default () => {
    const { template: json, setTemplate } = useTemplate();

    const { template, obj } = useMemo(() => {
        const template = new Template(json);
        const item = template.selected();
        const obj = item?.obj as syphonx.Break;
        return { template, obj };
    }, [json]);

    return obj ? (
        <ComplexPropertyGrid
            items={[
                [
                    "query",
                    <QueryEditorField
                        name="break"
                        query={obj.query}
                        onChange={(event, value) => { obj.query = value; setTemplate(template.toString()); }}
                    />,
                    "A CSS selector or jQuery expression that determines whether to break out of the current loop if content is found on the page. Can be further modified using a pattern.",
                    true
                ],
                [
                    "on",
                    <SelectOnDropdown
                        value={obj.on}
                        onChange={(event, value) => { obj.on = value; setTemplate(template.toString()); }}
                    />,
                    "Determines whether to break out of the current loop if any, all, or none of the selectors from the query are found on the page.",
                    obj.on !== undefined
                ],
                [
                    "pattern",
                    <RegexpField
                        value={obj.pattern}
                        onChange={(event, value) => { obj.pattern = value; setTemplate(template.toString()); }}
                    />,
                    "Breaks out of the current loop if a text pattern matches the output of the specified query.",
                    obj.pattern !== undefined
                ],
                [
                    "when",
                    <FormulaField
                        value={obj.when}
                        onChange={(event, value) => { obj.when = value; setTemplate(template.toString()); }}
                    />,
                    "A formula that determines whether to break out of the current loop.",
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
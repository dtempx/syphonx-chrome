import React, { useMemo } from "react";
import { Switch } from "@mui/material";
import { useTemplate } from "../../context";
import { Template } from "../lib";
import * as syphonx from "syphonx-lib";

import {
    ComplexPropertyGrid,
    FormulaField,
    SingleQueryEditorField
} from "./components";

export default () => {
    const { template: json, setTemplate } = useTemplate();

    const { template, obj } = useMemo(() => {
        const template = new Template(json);
        const item = template.selected();
        const obj = item?.obj instanceof Array ? item.obj[0] as syphonx.Transform : undefined;
        return { template, obj };
    }, [json]);

    return obj ? (
        <ComplexPropertyGrid
            items={[
                [
                    "query",
                    <SingleQueryEditorField
                        name="transform"
                        query={obj.query}
                        onChange={(event, value) => { obj.query = value; setTemplate(template.toString()); }}
                    />,
                    "A CSS selector or jQuery expression that defines the transform.",
                    true
                ],
                [
                    "when",
                    <FormulaField
                        value={obj.when}
                        onChange={(event, value) => { obj.when = value || undefined; setTemplate(template.toString()); }}
                    />,
                    "A formula that determines whether the transform is evaluated.",
                    obj.when !== undefined
                ],
                [
                    "active",
                    <Switch
                        checked={obj.active ?? true}
                        onChange={(event, value) => { obj.active = value; setTemplate(template.toString()); }}
                    />,
                    "Determines whether the transform is active or bypassed.",
                    obj.active !== undefined
                ]        
            ]}
        />
    ) : null;
};
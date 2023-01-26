import React, { useMemo } from "react";
import * as syphonx from "syphonx-lib";
import { Switch } from "@mui/material";
import { useTemplate } from "../../context";
import { Template } from "../../../lib";

import {
    ComplexPropertyGrid,
    FormulaField,
    QueryEditorField
} from "./components";

export default () => {
    const { template: json, setTemplate } = useTemplate();

    const { template, obj } = useMemo(() => {
        const template = new Template(json);
        const item = template.selected();
        const obj = item?.obj as syphonx.Each;
        return { template, obj };
    }, [json]);

    return obj ? (
        <ComplexPropertyGrid items={[
            [
                "query",
                <QueryEditorField
                    name="each"
                    query={obj.query}
                    onChange={(event, value) => { obj.query = value; setTemplate(template.toString()); }}
                />,
                "A CSS selector or jQuery expression that determines the set of elements to loop over.",
                true
            ],
            [
                "global",
                <Switch
                    checked={obj.context === null}
                    onChange={(event, value) => { obj.context = value ? null : undefined; setTemplate(template.toString()); }}
                />,
                "Performs the query in a global context rather than within the current context.",
                obj.context !== undefined
            ],
            [
                "when",
                <FormulaField
                    value={obj.when}
                    onChange={(event, value) => { obj.when = value || undefined; setTemplate(template.toString()); }}
                />,
                "A formula that determines whether the each loop is performed. Each loop is performed unconditionally if not specified.",
                obj.when !== undefined
            ],
            [
                "active",
                <Switch
                    checked={obj.active ?? true}
                    onChange={(event, value) => { obj.active = value; setTemplate(template.toString()); }}
                />,
                "Determines whether the each loop is active or bypassed.",
                obj.active !== undefined
            ]
        ]} />
    ) : null;
};
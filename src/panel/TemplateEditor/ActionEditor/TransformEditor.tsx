import React, { useState } from "react";
import { Switch } from "@mui/material";
import * as syphonx from "syphonx-lib";
import { useTemplate } from "../../context";
import { Template } from "../../../lib";
import QueryBuilder from "../QueryBuilder";

import {
    ComplexPropertyGrid,
    FormulaField,
    SelectorField
} from "./components";

export default () => {
    const [queryEditorOpen, setQueryEditorOpen] = useState(false);
    
    const { template: json, setTemplate } = useTemplate();
    const template = new Template(json);
    const item = template.selected();

    const obj = item?.obj as syphonx.Select;
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
                        "A CSS selector or jQuery expression that determines the click target",
                        true
                    ],
                    [
                        "when",
                        <FormulaField
                            value={obj.when}
                            onChange={(event, value) => { obj.when = value || undefined; setTemplate(template.toString()); }}
                        />,
                        "A formula that determines whether the click is evaluated or bypassed",
                        obj.when !== undefined
                    ],
                    [
                        "active",
                        <Switch
                            checked={obj.active ?? true}
                            onChange={(event, value) => { obj.active = value; setTemplate(template.toString()); }}
                        />,
                        "Determines whether the property is active or bypassed",
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
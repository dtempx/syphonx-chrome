import React, { useMemo } from "react";
import { Switch } from "@mui/material";
import { useTemplate } from "../../context";
import { Template } from "../../../lib";
import * as syphonx from "syphonx-lib";

import {
    ComplexPropertyGrid,
    FormulaField,
    NumberField
} from "./components";

export default () => {
    const { template: json, setTemplate } = useTemplate();

    const { template, obj } = useMemo(() => {
        const template = new Template(json);
        const item = template.selected();
        //todo: remove shim when syphonx-core updated
        const obj = item?.obj as syphonx.Repeat & { when: string | undefined, active: boolean };
        return { template, obj };
    }, [json]);

    return obj ? (
        <ComplexPropertyGrid
            items={[
                [
                    "limit",
                    <NumberField
                        value={obj.limit}
                        onChange={(event, value) => { obj.limit = value; setTemplate(template.toString()); }}
                        min={0}
                    />,
                    "Limits the number of repeat iterations.",
                    true
                ],
                [
                    "errors",
                    <NumberField
                        value={obj.errors}
                        onChange={(event, value) => { obj.errors = value; setTemplate(template.toString()); }}
                        min={1}
                    />,
                    "Maximum number of errors before aborting the repeat loop. (default=1)",
                    obj.errors !== undefined
                ],
                [
                    "when",
                    <FormulaField
                        value={obj.when}
                        onChange={(event, value) => { obj.when = value; setTemplate(template.toString()); }}
                    />,
                    "A formula that determines whether to perform the repeat actions, performs the repeat actions unconditionally if not specified.",
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
import React from "react";
import { Switch } from "@mui/material";
import * as syphonx from "syphonx-lib";
import { useTemplate } from "../../context";
import { NumberField } from "./components";
import { Template } from "../../../lib";

import {
    ComplexPropertyGrid,
    FormulaField,
    ValidateField
} from "./components";

export default () => {
    const { template: json, setTemplate } = useTemplate();
    const template = new Template(json);
    const item = template.selected();
    const obj = item?.obj as syphonx.Yield & { context: string };
    return obj ? (
        <>
            <ComplexPropertyGrid
                items={[
                    [
                        "when",
                        <FormulaField
                            value={obj.when}
                            onChange={(event, value) => { obj.when = value; setTemplate(template.toString()); }}
                        />,
                        "A formula that determines whether to break out of the current loop, or breaks unconditionally if not specified.",
                        true
                    ],
                    [
                        "context",
                        <ValidateField
                            value={obj.context}
                            onChange={(event, value) => { obj.context = value; setTemplate(template.toString()); }}
                        />,
                        "Specifies additional context for host, such as to take a screenshot.",
                        obj.context !== undefined
                    ],
                    [
                        "timeout",
                        <NumberField
                            value={obj.timeout}
                            onChange={(event, value) => { obj.timeout = value; setTemplate(template.toString()); }}
                        />,
                        "Determines the amount of time in seconds to wait for a renavigation before a timeout error occurs.",
                        obj.timeout !== undefined
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
        </>
    ) : null;
};
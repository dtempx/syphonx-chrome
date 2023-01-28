import React, { useMemo } from "react";
import { Switch } from "@mui/material";
import { useTemplate } from "../../context";
import { NumberField } from "./components";
import { Template } from "../lib";
import * as syphonx from "syphonx-lib";

import {
    ComplexPropertyGrid,
    FormulaField,
    PlainTextField
} from "./components";

export default () => {
    const { template: json, setTemplate } = useTemplate();

    const { template, obj } = useMemo(() => {
        const template = new Template(json);
        const item = template.selected();
        //todo: remove shim when syphonx-core updated
        const obj = item?.obj as syphonx.Yield & { context?: string };
        return { template, obj };
    }, [json]);

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
                        "A formula that determines whether to yield, or yields unconditionally if unspecified.",
                        true
                    ],
                    [
                        "context",
                        <PlainTextField
                            value={obj.context}
                            onChange={(event, value) => { obj.context = value; setTemplate(template.toString()); }}
                        />,
                        "Specifies host context. Used to trigger screenshots and other host responsibilities.",
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
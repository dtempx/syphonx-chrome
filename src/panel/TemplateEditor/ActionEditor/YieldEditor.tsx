import React from "react";
import { Switch } from "@mui/material";
import { NumberField } from "./components";
import { TemplateItem } from "../lib";
import * as syphonx from "syphonx-lib";

import {
    ComplexPropertyGrid,
    FormulaField,
    PlainTextField
} from "./components";

export interface Props {
    item: TemplateItem;
    onChange: (event: React.SyntheticEvent<Element, Event>) => void;
}

export default ({ item, onChange }: Props) => {
    const obj = item?.obj as syphonx.Yield & { context?: string }; // todo: remove shim when syphonx-core updated
    return obj ? (
        <>
            <ComplexPropertyGrid
                items={[
                    [
                        "when",
                        <FormulaField
                            value={obj.when}
                            onChange={(event, value) => {
                                obj.when = value;
                                onChange(event);
                            }}
                        />,
                        "A formula that determines whether to yield, or yields unconditionally if unspecified.",
                        true
                    ],
                    [
                        "context",
                        <PlainTextField
                            value={obj.context}
                            onChange={(event, value) => {
                                obj.context = value;
                                onChange(event);
                            }}
                        />,
                        "Specifies host context. Used to trigger screenshots and other host responsibilities.",
                        obj.context !== undefined
                    ],
                    [
                        "timeout",
                        <NumberField
                            value={obj.timeout}
                            onChange={(event, value) => {
                                obj.timeout = value;
                                onChange(event);
                            }}
                        />,
                        "Determines the amount of time in seconds to wait for a renavigation before a timeout error occurs.",
                        obj.timeout !== undefined
                    ],
                    [
                        "active",
                        <Switch
                            checked={obj.active ?? true}
                            onChange={(event, value) => {
                                obj.active = value;
                                onChange(event);
                            }}
                        />,
                        "Determines whether the property is active or bypassed.",
                        obj.active !== undefined
                    ]
                ]}
            />
        </>
    ) : null;
};
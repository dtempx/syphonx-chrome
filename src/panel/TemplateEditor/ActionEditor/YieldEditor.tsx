import React from "react";
import { NumberField } from "./components";
import { TemplateItem } from "../lib";
import * as syphonx from "syphonx-lib";

import {
    TextField
} from "@mui/material";

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
                        "name",
                        <TextField
                            variant="standard"
                            size="small"
                            placeholder="Name for this action"
                            inputProps={{ maxLength: 32 }}        
                            value={obj.name}
                            onChange={event => {
                                obj.name = event.target.value || undefined;
                                onChange(event);
                            }}
                        />,
                        "An optional descriptive name briefly summarizing the yield action. Name appears in the action tree and status output, enhances readibility of the template if specified.",
                        true
                    ],    
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
                        "params",
                        <PlainTextField
                            value={obj.context}
                            onChange={(event, value) => {
                                obj.context = value;
                                onChange(event);
                            }}
                        />,
                        "Specifies parameters to pass back to the host. Can be used to trigger screenshots and other host responsibilities.",
                        obj.params !== undefined
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
                    /*
                    [
                        "active",
                        <Switch
                            size="small"
                            checked={obj.active ?? true}
                            onChange={(event, value) => {
                                obj.active = value;
                                onChange(event);
                            }}
                        />,
                        "Determines whether the property is active or bypassed.",
                        obj.active !== undefined
                    ]
                    */
                ]}
            />
        </>
    ) : null;
};
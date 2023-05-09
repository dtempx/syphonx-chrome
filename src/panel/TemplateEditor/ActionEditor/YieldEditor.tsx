import React from "react";
import { TemplateItem } from "../lib";
import * as syphonx from "syphonx-lib";

import {
    TextField
} from "@mui/material";

import {
    AdvancedPropertyGrid,
    FormulaField,
    SwitchedObjectEditor
} from "./components";

export interface Props {
    item: TemplateItem;
    onChange: (event: React.SyntheticEvent<Element, Event>) => void;
}

export default ({ item, onChange }: Props) => {
    const obj = item?.obj as syphonx.Yield & { context?: string }; // todo: remove shim when syphonx-core updated
    return obj ? (
        <>
            <AdvancedPropertyGrid
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
                        "A formula that determines whether to yield, or yields unconditionally if unspecified. A formula is a Javascript expression enclosed in curly braces that returns a boolean true/false result. The formula can reference a selector result via `data.name`, where name is the name of any previously evaluated selector. Example: `{data.price !== null}`",
                        true
                    ],
                    [
                        "params",
                        <SwitchedObjectEditor
                            obj={obj.params}
                            onChange={(event, value) => {
                                obj.params = value;
                                onChange(event);
                            }}
                        />,
                        "Specifies parameters to pass back to the host enviornment. Used for page renavigations, triggering screenshots and other tasks that require host intervention.",
                        true
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
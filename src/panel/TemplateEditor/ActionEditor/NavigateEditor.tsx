import React from "react";
import { TemplateItem } from "../lib";
import * as syphonx from "syphonx-lib";

import {
    TextField
} from "@mui/material";

import {
    AdvancedPropertyGrid,
    FormulaField,
    VariantField,
    WaitUntilDropdown
} from "./components";

export interface Props {
    item: TemplateItem;
    onChange: (event: React.SyntheticEvent<Element, Event>) => void;
}

export default ({ item, onChange }: Props) => {
    const obj = item?.obj as syphonx.Navigate;
    return obj ? (
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
                    "An optional descriptive name briefly summarizing the navigation action. Name appears in the action tree and status output, enhances readibility of the template if specified.",
                    true
                ],
                [
                    "url",
                    <VariantField
                        variants={["string", "formula"]}
                        value={obj.url}
                        fullWidth
                        onChange={(event, value) => {
                            obj.url = value || undefined;
                            onChange(event);
                        }}
                    />,
                    "The URL to naviate to. Can be a string or a formula. A formula is a Javascript expression enclosed in curly braces that returns a string. The formula can reference a selector result via `data.name`, where name is the name of any previously evaluated selector. Example: ```{`https://${origin}/${data.name}`}```",
                    true,
                    !obj.url ? "A url must be specified" : ""
                ],
                [
                    "waitUntil",
                    <WaitUntilDropdown
                        value={obj.waitUntil}
                        onChange={(event, value) => {
                            obj.waitUntil = value;
                            onChange(event);
                        }}
                    />,
                    "When to consider the browser navigation for the navigate action to be complete.",
                    obj.waitUntil !== undefined
                ],
                [
                    "when",
                    <FormulaField
                        value={obj.when}
                        onChange={(event, value) => {
                            obj.when = value || undefined;
                            onChange(event);
                        }}
                    />,
                    "A formula that determines whether the navigate action is triggered or bypassed. A formula is a Javascript expression enclosed in curly braces that returns a boolean true/false result. The formula can reference a selector result via `data.name`, where name is the name of any previously evaluated selector. Example: `{data.price !== null}`",
                    obj.when !== undefined
                ]
            ]}
        />
    ) : null;
};

import React from "react";
import { TemplateItem } from "../lib";
import * as syphonx from "syphonx-lib";

import {
    TextField
} from "@mui/material";

import {
    AdvancedPropertyGrid,
    FormulaField,
    QueryEditorField,
    RegexpField,
    SelectOnDropdown
} from "./components";

export interface Props {
    item: TemplateItem;
    onChange: (event: React.SyntheticEvent<Element, Event>) => void;
}

export default ({ item, onChange }: Props) => {
    const obj = item?.obj as syphonx.Break;
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
                    "An optional descriptive name briefly summarizing the purpose of the break action. Name appears in the action tree and status output, enhances readibility of the template if specified.",
                    true
                ],    
                [
                    "query",
                    <QueryEditorField
                        name="break"
                        query={obj.query}
                        onChange={(event, value) => {
                            obj.query = value && value.length > 0 ? value : undefined;
                            onChange(event);
                        }}
                    />,
                    "A CSS selector or jQuery expression that determines whether to break out of the current loop if content is found on the page. Can be further modified using a pattern.",
                    true
                ],
                [
                    "on",
                    <SelectOnDropdown
                        value={obj.on}
                        onChange={(event, value) => {
                            obj.on = value;
                            onChange(event);
                        }}
                    />,
                    "Determines whether to break out of the current loop if any, all, or none of the selectors from the query are found on the page.",
                    obj.on !== undefined
                ],
                [
                    "pattern",
                    <RegexpField
                        value={obj.pattern}
                        onChange={(event, value) => {
                            obj.pattern = value;
                            onChange(event);
                        }}
                    />,
                    "Breaks out of the current loop if a text pattern matches the output of the specified query.",
                    obj.pattern !== undefined
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
                    "A formula that determines whether to break out of the current loop. A formula is a Javascript expression enclosed in curly braces that returns a boolean true/false result. The formula can reference a selector result via `data.name`, where name is the name of any previously evaluated selector. Example: `{data.price !== null}`",
                    obj.when !== undefined
                ]
            ]}
        />
    ) : null;
};
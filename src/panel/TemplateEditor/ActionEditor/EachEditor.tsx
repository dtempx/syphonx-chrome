import React from "react";
import { TemplateItem } from "../lib";
import * as syphonx from "syphonx-lib";

import {
    Switch,
    TextField
} from "@mui/material";

import {
    AdvancedPropertyGrid,
    FormulaField,
    QueryEditorField
} from "./components";

export interface Props {
    item: TemplateItem;
    onChange: (event: React.SyntheticEvent<Element, Event>) => void;
}

export default ({ item, onChange }: Props) => {
    const obj = item?.obj as syphonx.Each;
    return obj ? (
        <AdvancedPropertyGrid items={[
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
                "An optional descriptive name briefly summarizing the purpose of the each action. Name appears in the action tree and status output, enhances readibility of the template if specified.",
                true
            ],
            [
                "query",
                <QueryEditorField
                    name="each"
                    query={obj.query}
                    onChange={(event, value) => {
                        obj.query = value;
                        onChange(event);
                    }}
                />,
                "A CSS selector or jQuery expression that determines the set of elements to loop over.",
                true,
                !obj.query ? "query required" : ""
            ],
            [
                "global",
                <Switch
                    size="small"
                    checked={obj.context === null}
                    onChange={(event, value) => {
                        obj.context = value ? null : undefined;
                        onChange(event);
                    }}
                />,
                "Performs the query in a global context rather than within the current context.",
                obj.context !== undefined
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
                "A formula that determines whether the each loop is performed. Performs the each loop unconditionally if not specified. A formula is a Javascript expression enclosed in curly braces that returns a boolean true/false result. The formula can reference a selector result via `data.name`, where name is the name of any previously evaluated selector. Example: `{data.price !== null}`",
                obj.when !== undefined
            ]
        ]} />
    ) : null;
};
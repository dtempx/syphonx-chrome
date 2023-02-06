import React from "react";
import { TemplateItem } from "../lib";
import * as syphonx from "syphonx-lib";

import {
    Stack,
    Switch,
    Typography
} from "@mui/material";

import {
    WarningAmberOutlined as AlertIcon
} from "@mui/icons-material";

import {
    ComplexPropertyGrid,
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
        <ComplexPropertyGrid items={[
            [
                <Stack direction="row">
                    <Typography fontSize="small">message</Typography>
                    {!obj.query && <AlertIcon color="warning" fontSize="small" sx={{ ml: 1 }} />}
                </Stack>,
                <QueryEditorField
                    name="each"
                    query={obj.query}
                    onChange={(event, value) => {
                        obj.query = value;
                        onChange(event);
                    }}
                />,
                "A CSS selector or jQuery expression that determines the set of elements to loop over.",
                true
            ],
            [
                "global",
                <Switch
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
                "A formula that determines whether the each loop is performed. Each loop is performed unconditionally if not specified.",
                obj.when !== undefined
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
                "Determines whether the each loop is active or bypassed.",
                obj.active !== undefined
            ]
        ]} />
    ) : null;
};
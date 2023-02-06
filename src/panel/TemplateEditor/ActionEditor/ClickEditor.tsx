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
    QueryEditorField,
    NumberField,
    NumberRangeField
} from "./components";

export interface Props {
    item: TemplateItem;
    onChange: (event: React.SyntheticEvent<Element, Event>) => void;
}

export default ({ item, onChange }: Props) => {
    const obj = item?.obj as syphonx.Click;
    return obj ? (
        <ComplexPropertyGrid items={[
            [
                <Stack direction="row">
                    <Typography fontSize="small">query</Typography>
                    {!obj.query && <AlertIcon color="warning" fontSize="small" sx={{ ml: 1 }} />}
                </Stack>,
                <QueryEditorField
                    name="click"
                    query={obj.query}
                    onChange={(event, value) => {
                        obj.query = value;
                        onChange(event);
                    }}
                />,
                "A CSS selector or jQuery expression that determines the click target.",
                true
            ],
            [
                "required",
                <Switch
                    checked={obj.required ?? false}
                    onChange={(event, value) => {
                        obj.required = value;
                        onChange(event);
                    }}
                />,
                "Determines whether the click is optional or required, producing if no click target is found on the page.",
                true
            ],
            [
                "retry",
                <NumberField
                    value={obj.retry}
                    onChange={(event, value) => {
                        obj.retry = value;
                        onChange(event);
                    }}
                    min={0}
                />,
                "Determines the number of attempts to retry clicking and testing for the expected result. (default=0)",
                obj.retry !== undefined
            ],
            [
                "snooze",
                <NumberRangeField
                    value={obj.snooze as [number, number]}
                    onChange={(event, value) => {
                        obj.snooze = value as syphonx.SnoozeInterval;
                        onChange(event);
                    }}
                />,
                "Number of seconds to snooze before the click.",
                false
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
                "A formula that determines whether the click is evaluated or bypassed.",
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
                "Determines whether the property is active or bypassed.",
                obj.active !== undefined
            ]
        ]} />
    ) : null;
};
import React from "react";
import { Stack, Switch, Typography } from "@mui/material";
import { TemplateItem } from "../lib";
import * as syphonx from "syphonx-lib";

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
                "query",
                <QueryEditorField
                    name="click"
                    query={obj.query}
                    onChange={(event, value) => {
                        obj.query = value;
                        onChange(event);
                    }}
                />,
                "A CSS selector or jQuery expression that determines the click target.",
                true,
                !obj.query ? "query required" : ""
            ],
            [
                "required",
                <Switch
                    size="small"
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
                "Determines the number of attempts to retry clicking and testing for the expected result. Requires a waitfor condition. (default=0)",
                obj.retry !== undefined
            ],
            [
                "snooze",
                <Stack direction="row">
                    <NumberRangeField
                        value={obj.snooze as [number, number]}
                        onChange={(event, value) => {
                            obj.snooze = value as syphonx.SnoozeInterval;
                            onChange(event);
                        }}
                    />
                    <Typography fontSize="small" sx={{ ml: 1, mt: 1 }}>seconds</Typography>
                </Stack>,
                "Number of seconds to snooze before the click.",
                false
            ],
            [
                "waitfor",
                <Switch
                    size="small"
                    checked={!!obj.waitfor}
                    onChange={(event, value) => {
                        obj.waitfor = value ? {} : undefined;
                        onChange(event);
                    }}
                />,
                "Waits for content on the page to confirm the click. Can be used with retry to perform multiple attempts at clicking and verifying the result.",
                true
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
        ]} />
    ) : null;
};
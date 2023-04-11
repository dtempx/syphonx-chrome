import React from "react";
import { Stack, Typography } from "@mui/material";
import { TemplateItem } from "../lib";

import {
    AdvancedPropertyGrid,
    NumberRangeField
} from "./components";

export interface Props {
    item: TemplateItem;
    onChange: (event: React.SyntheticEvent<Element, Event>) => void;
}

export default ({ item, onChange }: Props) => {
    const obj = item?.obj as [number, number];
    return obj ? (
        <AdvancedPropertyGrid
            items={[
                [
                    "timeframe",
                    <Stack direction="row">
                        <NumberRangeField
                            value={obj}
                            onChange={(event, value) => {
                                if (value) {
                                    if (value[0] !== undefined)
                                        obj[0] = value[0];
                                    if (value[1] !== undefined)
                                        obj[1] = value[1];
                                    if (value[1] === undefined)
                                        obj.splice(1, 1);
                                    onChange(event);
                                }
                            }}
                        />
                        <Typography fontSize="small" sx={{ ml: 1, mt: 1 }}>seconds</Typography>
                    </Stack>,
                    "Defines timeframe to snooze in seconds. Specify either a single number or a range to define a random interval.",
                    true
                ]
            ]}
        />
    ) : null;
};
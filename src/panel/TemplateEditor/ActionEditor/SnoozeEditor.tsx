import React from "react";
import { Stack, Typography } from "@mui/material";
import { TemplateItem } from "../lib";

import {
    ComplexPropertyGrid,
    NumberRangeField
} from "./components";

export interface Props {
    item: TemplateItem;
    onChange: (event: React.SyntheticEvent<Element, Event>) => void;
}

export default ({ item, onChange }: Props) => {
    return item ? (
        <ComplexPropertyGrid
            items={[
                [
                    "timeframe",
                    <Stack direction="row">
                        <NumberRangeField
                            value={item.obj as [number, number]}
                            onChange={(event, value) => {
                                item!.obj = value || [1];
                                onChange(event);
                            }}
                        />
                        <Typography fontSize="small" sx={{ ml: 1, mt: 1 }}>seconds</Typography>
                    </Stack>,
                    "Defines timeframe to snooze in seconds. Specify eitehr a single number or a range to define a random interval.",
                    true
                ]
            ]}
        />
    ) : null;
};
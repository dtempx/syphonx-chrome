import React from "react";
import { Stack, Typography } from "@mui/material";
import { useTemplate } from "../../context";
import { Template } from "../../../lib";

import {
    ComplexPropertyGrid,
    NumberRangeField
} from "./components";

export default () => {
    const { template: json, setTemplate } = useTemplate();
    const template = new Template(json);
    const item = template.selected();
    
    function handleChange(event: React.SyntheticEvent, value: [number] | [number, number] | undefined) {
        item!.obj = value || [1];
        setTemplate(template.toString());
    }

    return item ? (
        <ComplexPropertyGrid
            items={[
                [
                    "timeframe",
                    <Stack direction="row">
                        <NumberRangeField
                            value={item.obj as [number, number]}
                            onChange={handleChange}
                        />
                        <Typography fontSize="small" sx={{ position: "relative", top: 8, ml: 1 }}>seconds</Typography>
                    </Stack>,
                    "Defines timeframe to snooze in seconds. Specify eitehr a single number or a range to define a random interval.",
                    true
                ]
            ]}
        />
    ) : null;
};
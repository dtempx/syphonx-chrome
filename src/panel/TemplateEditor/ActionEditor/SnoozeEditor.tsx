import React, { useEffect, useState } from "react";
import * as syphonx from "syphonx-lib";
import { Stack, Typography } from "@mui/material";
import { useTemplate } from '../../context';
import { NumberField, PropertyGrid, PropertyGridItem } from "../../../components/";
import DebugView from "./DebugView";

export default () => {
    const [value1, setValue1] = useState<number | undefined>();
    const [value2, setValue2] = useState<number | undefined>();
    const { template, setTemplate, advanced } = useTemplate();
    
    useEffect(() => {
        const item = template.selectedItem();
        const snooze = item ? item.obj as syphonx.Snooze : [];
        setValue1(snooze[0]);
        setValue2(snooze[1]);
    }, [template]);
    
    function onValue1Changed(event: React.SyntheticEvent, value: number | undefined): void {
        setValue1(value || undefined);
        const clone = template.clone();
        const item = clone.selectedItem();
        if (item) {
            item.obj = value2 ? [value, value2] : [value];
            setTemplate(clone);
        }
    }

    function onValue2Changed(event: React.SyntheticEvent, value: number | undefined): void {
        setValue2(value || undefined);
        if (value1 === undefined)
            setValue1(0);
        const clone = template.clone();
        const item = clone.selectedItem();
        if (item) {
            item.obj = [value1, value];
            setTemplate(clone);
        }
    }

    const items: PropertyGridItem[] = [
        [
            "timeframe",
            <Stack direction="row">
                <NumberField
                    size="small"
                    value={value1}
                    onChange={onValue1Changed}
                    min={0}
                    max={value2}
                    sx={{ width: 100 }}
                />
                <NumberField
                    size="small"
                    value={value2}
                    onChange={onValue2Changed}
                    min={value1 || 0}
                    sx={{ width: 100, ml: 1 }}
                />
                <Typography fontSize="small" sx={{ position: "relative", top: 8, ml: 1 }}>seconds</Typography>
            </Stack>,
            "Defines timeframe to snooze in seconds, specify a single number or a range to define a random interval"
        ]
    ];

    if (advanced)
        items.push(...[
            [
                "debug",
                <DebugView />,
                "Debug"
            ]
        ] as PropertyGridItem[]);

    return (<PropertyGrid items={items} />);
};
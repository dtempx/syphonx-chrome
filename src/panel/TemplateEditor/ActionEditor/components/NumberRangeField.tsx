import React, { useEffect, useState } from "react";
import { NumberField } from ".";

import {
    Button,
    ButtonGroup,
    Stack,
    Typography
} from "@mui/material";

export interface Props {
    value: [number] | [number, number] | undefined;
    onChange: (event: React.SyntheticEvent, value: [number] | [number, number] | undefined) => void;
}

export default ({ value, onChange }: Props) => {
    const [value1, setValue1] = useState<number | undefined>();
    const [value2, setValue2] = useState<number | undefined>();
    const [range, setRange] = useState(false);

    useEffect(() => {
        if (value instanceof Array) {
            setValue1(value[0]);
            setValue2(value[1]);
            setRange(value.length > 1);
        }
        else {
            setValue1(undefined);
            setValue2(undefined);
        }
    }, [value]);
    
    function onValue1Changed(event: React.SyntheticEvent, value: number | undefined): void {
        setValue1(value);
        if (value !== undefined && value2 !== undefined)
            onChange(event, [value, value2]);
        else if (value !== undefined)
            onChange(event, [value]);
        else if (value === undefined && value2 === undefined)
            onChange(event, undefined);
    }

    function onValue2Changed(event: React.SyntheticEvent, value: number | undefined): void {
        setValue2(value);
        if (value !== undefined && value1 !== undefined)
            onChange(event, [value1, value]);
        else if (value === undefined && value1 === undefined)
            onChange(event, undefined);
    }

    function onSetExact(event: React.SyntheticEvent) {
        setRange(false);
        setValue2(undefined);
        if (value1 !== undefined)
            onChange(event, [value1]);
    }

    function onSetRange(event: React.SyntheticEvent) {
        setRange(true);
        if (value1 !== undefined) {
            setValue2(value1 + 1);
            onChange(event, [value1, value1 + 1]);
        }
    }

    return (
        <Stack direction="row">
            <ButtonGroup size="small">
                <Button variant={range ? "outlined" : "contained"} onClick={onSetExact} sx={{ fontSize: "x-small" }}>exact</Button>
                <Button variant={!range ? "outlined" : "contained"} onClick={onSetRange} sx={{ fontSize: "x-small" }}>range</Button>
            </ButtonGroup>
            <NumberField
                fullWidth
                value={value1}
                onChange={onValue1Changed}
                min={0}
                max={value2}
                sx={{ width: 30, ml: 1 }}
            />
            <Typography sx={{ display: !range ? "none": undefined }}>to</Typography>
            <NumberField
                fullWidth
                value={value2}
                onChange={onValue2Changed}
                min={value1 || 0}
                sx={{ width: 30, ml: 1, display: !range ? "none" : undefined }}
            />
        </Stack>
    );
};
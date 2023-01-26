import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { NumberField } from ".";

export interface Props {
    value: [number] | [number, number] | undefined;
    onChange: (event: React.SyntheticEvent, value: [number] | [number, number] | undefined) => void;
}

export default ({ value, onChange }: Props) => {
    const [value1, setValue1] = useState<number | undefined>();
    const [value2, setValue2] = useState<number | undefined>();

    useEffect(() => {
        if (value instanceof Array) {
            setValue1(value[0]);
            setValue2(value[1]);
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

    return (
        <Stack direction="row">
            <NumberField
                value={value1}
                onChange={onValue1Changed}
                min={0}
                max={value2}
                sx={{ width: 50 }}
            />
            <NumberField
                value={value2}
                onChange={onValue2Changed}
                min={value1 || 0}
                sx={{ width: 50, ml: 1 }}
            />
        </Stack>
    );
};
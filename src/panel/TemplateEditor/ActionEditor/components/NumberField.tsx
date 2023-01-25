import React from "react";
import { SxProps, Theme } from "@mui/material";
import { ValidateField } from ".";

export interface Props {
    value: number | undefined | null;
    onChange: (event: React.SyntheticEvent, value: number | undefined) => void
    min?: number;
    max?: number;
    type? : "integer" | "float";
    sx?: SxProps<Theme>;
}

export default ({ value, min, max, type = "float", onChange, sx }: Props) => {
    function handleChange(event: React.SyntheticEvent, value: string): void {
        if (onChange) {
            const num = type === "float" ? parseFloat(value) : parseInt(value);
            onChange(event, !isNaN(num) ? num : undefined);            
        }
    }

    function handleValidate(event: React.ChangeEvent<HTMLInputElement>, value: string): boolean {
        if (!value)
            return true;
        const num = parseFloat(value);
        if (isNaN(num))
            return false;
        if (min !== undefined && num < min)
            return false;
        if (max !== undefined && num > max)
            return false;
        return true;
    }

    return (
        <ValidateField
            variant="standard"
            size="small"
            value={value}
            onChange={handleChange}
            onValidate={handleValidate}
            sx={sx}
        />
    );
}
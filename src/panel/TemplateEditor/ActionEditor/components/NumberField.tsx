import React from "react";
import { SxProps, Theme } from "@mui/material";
import { ValidateField } from ".";
import { isFormula } from "./lib";

export interface Props {
    value: string | number | undefined | null;
    placeholder?: string;
    label?: string;
    onChange: (event: React.SyntheticEvent, value: number | undefined) => void;
    fullWidth?: boolean;
    min?: number;
    max?: number;
    type? : "integer" | "float";
    sx?: SxProps<Theme>;
}

export default ({ value, placeholder, label, min, max, type = "float", fullWidth, onChange, sx }: Props) => {
    function handleChange(event: React.SyntheticEvent, value: string): void {
        if (onChange) {
            const num = type === "float" ? parseFloat(value) : parseInt(value);
            onChange(event, !isNaN(num) ? num : undefined);            
        }
    }

    function handleValidate(event: React.ChangeEvent<HTMLInputElement>, value: string): boolean {
        if (!value)
            return true;
        if (isFormula(value))
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
            placeholder={placeholder}
            label={label}
            fullWidth={fullWidth}
            value={value}
            onChange={handleChange}
            onValidate={handleValidate}
            sx={sx}
        />
    );
}
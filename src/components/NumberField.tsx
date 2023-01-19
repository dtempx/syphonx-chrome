import React from "react";
import { BaseTextFieldProps } from "@mui/material";
import ValidateTextField from "./ValidateTextField";

export interface Props extends BaseTextFieldProps {
    value?: number | undefined;
    min?: number;
    max?: number;
    type? : "integer" | "float";
    onChange?: (event: React.SyntheticEvent, value: number | undefined) => void
}

export default ({ value, min, max, type = "float", onChange, ...props }: Props) => {
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
        <ValidateTextField
            {...props}
            value={value}
            onChange={handleChange}
            onValidate={handleValidate}
        />
    );
}
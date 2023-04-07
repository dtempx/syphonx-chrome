import React from "react";
import { BaseTextFieldProps } from "@mui/material";
import { ValidateField } from ".";
import { regexp } from "./lib";

export type ValidationTypes = "kebab-case" | "snake-case" | "selector-name";

export interface Props extends BaseTextFieldProps {
    value: string | undefined;
    variant?: "standard" | "outlined" | "filled";
    validation?: ValidationTypes;
    onChange: (event: React.SyntheticEvent, value: string | undefined) => void
    onHitEnterKey?: (event: React.KeyboardEvent) => void;
}

const regexps = {
    "kebab-case": regexp.kebabCase,
    "selector-name": regexp.selectorName,
    "snake-case": regexp.snakeCase
};

export default ({ value, validation, onChange, onHitEnterKey, ...props }: Props) => {

    function handleValidate(event: React.ChangeEvent<HTMLInputElement>, value: string): boolean {
        return value && validation ? regexps[validation].test(value) : true;
    }

    return (
        <ValidateField
            variant="standard"
            size="small"
            placeholder="(none)"
            fullWidth
            value={value}
            onChange={(event, value) => onChange(event, value || undefined)}
            onValidate={handleValidate}
            onHitEnterKey={onHitEnterKey}
            {...props}
        />
    );
}
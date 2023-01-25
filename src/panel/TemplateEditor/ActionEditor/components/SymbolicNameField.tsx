import React from "react";
import { SxProps, Theme } from "@mui/material";
import { ValidateField } from ".";

export interface Props {
    value: string | undefined;
    onChange: (event: React.SyntheticEvent, value: string | undefined) => void
    variant?: "snake-case" | "kebab-case";
    sx?: SxProps<Theme>;
}

const regexps = {
    "snake-case": /^[a-z][a-z0-9_]*$/,
    "kebab-case": /^[a-z][a-z0-9-]*$/
};

export default ({ value, onChange, variant = "snake-case", sx }: Props) => {

    function handleValidate(event: React.ChangeEvent<HTMLInputElement>, value: string): boolean {
        return value ? regexps[variant].test(value) : true;
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
            sx={sx}
        />
    );
}
import React, { useEffect, useState } from "react";
import { SxProps, Theme  } from "@mui/material";
import { ValidateField } from ".";
import jsep from "jsep";

export interface Props {
    value: string | undefined;
    onChange: (event: React.SyntheticEvent<Element, Event>, value: string | undefined) => void;
    sx?: SxProps<Theme>
}

export default ({ value, onChange, sx }: Props) => {
    const [input, setInput] = useState<string | undefined>();

    useEffect(() => {
        setInput(value);
    }, [value]);

    function handleChange(event: React.SyntheticEvent<Element, Event>, value: string): void {
        onChange(event, value || undefined);
    }

    function handleValidate(event: React.ChangeEvent<HTMLInputElement>, value: string): boolean {
        if (!value)
            return true;
        if (!value.startsWith("{") || !value.endsWith("}"))
            return false;
        const formula = value.slice(1, -1).trim();
        try {
            const expression = jsep(formula);
            return true;
        }
        catch (err) {
            return false;
        }
    }

    return (
        <ValidateField
            variant="standard"
            size="small"
            placeholder="{ }"
            fullWidth
            value={input}
            onChange={handleChange}
            onValidate={handleValidate}
            sx={sx}
        />
    );
};
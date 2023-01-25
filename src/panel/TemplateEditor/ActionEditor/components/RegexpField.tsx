import React, { useEffect, useState } from "react";
import { SxProps, Theme  } from "@mui/material";
import { ValidateField } from ".";

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
        if (!value.startsWith("/"))
            return false;
        if (!/\/[dgimsuy]{0,7}$/.test(value))
            return false;
        const i = value.lastIndexOf("/");
        const formula = value.slice(1, i).trim();
        try {
            const regexp = new RegExp(formula);
            return true;
        }
        catch (err) {
            debugger;
            return false;
        }
    }

    return (
        <ValidateField
            variant="standard"
            size="small"
            placeholder="/ /"
            fullWidth
            value={input}
            onChange={handleChange}
            onValidate={handleValidate}
            sx={sx}
        />
    );
};
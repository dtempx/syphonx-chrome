import React from "react";
import { SxProps, TextField, Theme } from "@mui/material";

export interface Props {
    value: string | undefined;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, value: string | undefined) => void
    placeholder?: string;
    sx?: SxProps<Theme>;
}

export default ({ value, onChange, placeholder, sx }: Props) => {
    return (
        <TextField
            variant="standard"
            size="small"
            placeholder={placeholder}
            fullWidth
            value={value}
            onChange={event => onChange(event, event.target.value)}
            sx={sx}
        />
    );
}
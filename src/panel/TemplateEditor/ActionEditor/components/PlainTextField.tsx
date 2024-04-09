import React from "react";
import { SxProps, TextField, Theme } from "@mui/material";

export interface Props {
    value: string | undefined;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, value: string | undefined) => void
    multiline?: boolean;
    placeholder?: string;
    rows?: number;
    sx?: SxProps<Theme>;
}

export default ({ value, onChange, multiline, placeholder, rows, sx }: Props) => {
    return (
        <TextField
            variant="standard"
            size="small"
            placeholder={placeholder}
            fullWidth
            multiline={multiline}
            rows={rows}
            value={value}
            onChange={event => onChange(event, event.target.value)}
            sx={sx}
        />
    );
}
import React from "react";
import { BaseTextFieldProps, IconButton, InputAdornment, TextField } from "@mui/material";
import { MoreHoriz as MoreIcon } from "@mui/icons-material";

export interface Props extends BaseTextFieldProps {
    value: unknown;
    onMore: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default ({ value, onMore, ...props }: Props) => (
    <TextField
        {...props}
        value={value}
        InputProps={{
            endAdornment:
                <InputAdornment position="end">
                    <IconButton size="small" onClick={onMore}>
                        <MoreIcon fontSize="small" />
                    </IconButton>
                </InputAdornment>
        }}
    />
);
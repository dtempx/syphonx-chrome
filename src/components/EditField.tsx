import React from "react";
import { BaseTextFieldProps, IconButton, InputAdornment, TextField } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";

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
                        <EditIcon fontSize="small" />
                    </IconButton>
                </InputAdornment>
        }}
    />
);
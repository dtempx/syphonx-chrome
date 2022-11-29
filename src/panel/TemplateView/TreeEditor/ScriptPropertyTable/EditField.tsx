import React, { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import * as Icons from "@mui/icons-material";

export interface Props {
    value?: string;
    size?: "small" | "medium";
    onChange?: (value: string) => void
    onValidate?: (value: string) => boolean
}

export default ({ value, size = undefined, onChange, onValidate }: Props) => {
    const [ input, setInput ] = useState<string | undefined>();
    const [ valid, setValid ] = useState(true);

    function validate(value: string) {
        setInput(value);
        if (onValidate) {
            setValid(onValidate(value));
        }
    }

    function commit() {
        if (valid && input !== undefined) {
            if (onChange) {
                onChange(input);
            }
            setInput(undefined);
        }
    }

    function cancel() {
        setInput(undefined);
        setValid(true);
    }

    function keydown(key: string) {
        if (key === "Escape")
            cancel();
        if (key === "Enter")
            commit();
    }

    return (
        <TextField
            variant="standard"
            size={size}
            error={!valid}
            value={input !== undefined ? input : value}
            onChange={event => validate(event.target.value)}
            onKeyDown={event => keydown(event.key)}
            InputProps={{
                endAdornment:
                    <InputAdornment position="end" style={{ visibility: input !== undefined ? "visible" : "hidden" }}>
                        <IconButton size="small" onClick={commit} style={{ visibility: input !== undefined && valid ? "visible" : "hidden" }}>
                            <Icons.Check fontSize="small" />
                        </IconButton>
                        <IconButton size="small" onClick={cancel}>
                            <Icons.Cancel fontSize="small" />
                        </IconButton>
                    </InputAdornment>
            }}
        />
    );
}
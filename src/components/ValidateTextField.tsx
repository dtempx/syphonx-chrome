import React, { useEffect, useState } from "react";
import { BaseTextFieldProps, IconButton, InputAdornment, TextField } from "@mui/material";
import { Check as CommitIcon, Clear as CancelIcon } from "@mui/icons-material";

export interface Props extends BaseTextFieldProps {
    value?: unknown;
    onChange?: (event: React.SyntheticEvent, value: string) => void
    onValidate?: (event: React.ChangeEvent<HTMLInputElement>, value: string) => boolean
}

export default ({ value, onChange, onValidate, ...props }: Props) => {
    const [ input, setInput ] = useState<string | undefined>();
    const [ valid, setValid ] = useState(true);

    useEffect(() => {
        setInput(undefined);
        setValid(true);
    }, [value]);

    function validate(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setInput(value);
        if (onValidate) {
            const valid = onValidate(event, value);
            setValid(valid);
        }
    }

    function commit(event: React.SyntheticEvent) {
        if (valid && input !== undefined) {
            if (onChange)
                onChange(event, input);
            setInput(undefined);
        }
    }

    function cancel() {
        setInput(undefined);
        setValid(true);
    }

    function keydown(event: React.KeyboardEvent) {
        if (event.key === "Escape")
            cancel();
        if (event.key === "Enter")
            commit(event);
    }

    return (
        <TextField
            {...props}
            error={!valid}
            value={input !== undefined ? input : value !== undefined ? String(value) : ""}
            onChange={validate}
            onKeyDown={keydown}
            onBlur={commit}
            InputProps={{
                endAdornment:
                    <InputAdornment
                        position="end"
                        style={{ visibility: input !== undefined ? "visible" : "hidden" }}
                    >
                        <IconButton
                            size="small"
                            onClick={commit}
                            style={{ visibility: input !== undefined && valid ? "visible" : "hidden" }}
                        >
                            <CommitIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            size="small"
                            onClick={cancel}
                        >
                            <CancelIcon fontSize="small" />
                        </IconButton>
                    </InputAdornment>
            }}
        />
    );
}
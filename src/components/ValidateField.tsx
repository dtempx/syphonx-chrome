import React, { useEffect, useState } from "react";
import { sleep } from "../lib";

import {
    BaseTextFieldProps,
    IconButton,
    InputAdornment,
    InputProps,
    TextField,
    Typography
} from "@mui/material";

import {
    Check as CommitIcon,
    Clear as CancelIcon
} from "@mui/icons-material";

export interface Props extends BaseTextFieldProps {
    value?: unknown;
    placeholder?: string;
    label?: string;
    showCommitButton?: boolean;
    showCancelButton?: boolean;
    onChange?: (event: React.SyntheticEvent, value: string) => void;
    onValidate?: (event: React.ChangeEvent<HTMLInputElement>, value: string) => boolean;
    onHitEnterKey?: (event: React.KeyboardEvent) => void;
    InputProps?: Partial<InputProps>;
}

export default ({ value, placeholder, label, onChange, onValidate, onHitEnterKey, showCommitButton, showCancelButton, InputProps, ...props }: Props) => {
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
        if (event.key === "Escape") {
            cancel();
        }
        if (event.key === "Enter") {
            commit(event);
            if (onHitEnterKey) {
                (async () => {
                    await sleep(1000);
                    onHitEnterKey(event);
                })();
            }
        }   
    }

    const endAdornment = (
        <InputAdornment
            position="end"
            style={{ visibility: input !== undefined || label ? "visible" : "hidden" }}
        >
            {label &&
                <Typography>{label}</Typography>}
            {showCommitButton &&
                <IconButton
                    size="small"
                    onClick={commit}
                    style={{ visibility: input !== undefined && valid ? "visible" : "hidden" }}
                >
                    <CommitIcon fontSize="small" />
                </IconButton>}
            {showCancelButton &&
                <IconButton
                    size="small"
                    onClick={cancel}
                >
                    <CancelIcon fontSize="small" />
                </IconButton>}
        </InputAdornment>
    );

    return (
        <TextField
            {...props}
            error={!valid}
            value={input !== undefined ? input : value !== undefined ? String(value) : ""}
            placeholder={placeholder}
            onChange={validate}
            onKeyDown={keydown}
            onBlur={commit}
            InputProps={showCommitButton || showCancelButton || label ? { ...InputProps, endAdornment } : InputProps}
        />
    );
}
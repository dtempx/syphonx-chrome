import React, { useEffect, useState } from "react";
import * as syphonx from "syphonx-lib";
import { IconButton, TextField } from "@mui/material";
import { Input as CommitIcon } from "@mui/icons-material";

export interface Props {
    query: syphonx.SelectQuery;
    onChange: (event: React.SyntheticEvent, query: syphonx.SelectQuery) => void;
}

export default ({ query, onChange }: Props) => {
    const [value, setValue] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        const value = syphonx.formatJQueryExpression(query);
        setValue(value || "");
        setError(false);
    }, [query]);

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        setValue(event.target.value);
        try {            
            syphonx.parseJQueryExpression(event.target.value);
            setError(false);
        }
        catch (err) {
            setError(true);
        }
    }

    function handleCommit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if (value) {
            let query: syphonx.SelectQuery | undefined;
            try {
                query = syphonx.parseJQueryExpression(value);
            }
            catch (err) {
                setError(true);
                return;
            }
            if (query)
                onChange(event, query);
        }
    }
    
    return (
        <TextField
            variant="standard"
            size="small"
            fullWidth
            value={value}
            error={error}
            onChange={handleChange}
            InputProps={{
                endAdornment:
                    <IconButton
                        size="small"
                        disabled={error}
                        onClick={handleCommit}
                    >
                        <CommitIcon fontSize="small" />
                    </IconButton>
            }}
        />
    );
};
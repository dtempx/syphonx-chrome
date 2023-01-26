import React, { useMemo, useState } from "react";
import QueryEditor from "./QueryEditor";
import * as syphonx from "syphonx-lib";

import {
    IconButton,
    InputAdornment,
    TextField,
    Tooltip
} from "@mui/material";

import {
    Edit as EditIcon
} from "@mui/icons-material";

export interface Props {
    query: syphonx.SelectQuery | undefined;
    name?: string;
    onChange: (event: React.SyntheticEvent<Element, Event>, query: syphonx.SelectQuery) => void;
}

export default ({ query, name, onChange }: Props) => {
    const [open, setOpen] = useState(false);

    const value = useMemo(() => {
        if (query && query.length > 0 && query[0])
            return syphonx.formatJQueryExpression(query) || "";
        else
            return "";
    }, [query]);

    return (
        <>
            <TextField
                variant="standard"
                size="small"
                value={value}
                placeholder="(none)"
                fullWidth
                sx={{ caretColor: "transparent" }}
                InputProps={{
                    endAdornment:
                        <InputAdornment position="end">
                            <IconButton size="small" onClick={() => setOpen(true)}>
                                <Tooltip
                                    arrow
                                    placement="left"
                                    title="Click here to setup a selector"
                                >
                                    <EditIcon fontSize="small" />    
                                </Tooltip>
                            </IconButton>
                        </InputAdornment>
                    }}
            />
            <QueryEditor
                value={query ? [query] : []}
                name={name}
                open={open}
                single
                onClose={() => setOpen(false)}
                onChange={(event, query) => onChange(event, query[0])}
            />
        </>
    );
};
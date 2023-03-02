import React, { useMemo, useState } from "react";
import QueryEditor from "./QueryEditor";
import * as syphonx from "syphonx-lib";

import {
    Chip,
    IconButton,
    InputAdornment,
    TextField,
    Tooltip
} from "@mui/material";

import {
    Edit as EditIcon
} from "@mui/icons-material";

export interface Props {
    query: syphonx.SelectQuery[] | undefined;
    name?: string;
    type?: syphonx.SelectType;
    repeated?: boolean;
    onChange: (event: React.SyntheticEvent<Element, Event>, query: syphonx.SelectQuery[]) => void;
}

export default ({ query, name, type, repeated, onChange }: Props) => {
    const [open, setOpen] = useState(false);

    const value = useMemo(() => {
        if (query && query.length > 0 && query[0])
            return syphonx.renderJQuery(query[0]) || "";
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
                            {query && query.length > 1 ? (
                                <Tooltip
                                    title={<span style={{ whiteSpace: "pre-line" }}>{query ? query.map(q => syphonx.renderJQuery(q)).join("\n") : null}</span>}
                                >
                                    <Chip
                                        label={query.length}
                                        variant="filled"
                                        color="default"
                                        size="small"
                                        sx={{ ml: 1 }}
                                    />
                                </Tooltip>
                            ) : null}
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
                value={query}
                open={open}
                name={name}
                type={type}
                repeated={repeated}
                onClose={() => setOpen(false)}
                onChange={onChange}
            />
        </>
    );
};
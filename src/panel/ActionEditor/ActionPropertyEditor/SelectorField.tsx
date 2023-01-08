import React, { useEffect, useState } from "react";
import { Chip, IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import * as syphonx from "syphonx-lib";

export interface Props {
    query: syphonx.SelectQuery[] | undefined;
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default ({ query, onClick }: Props) => {
    const [value, setValue] = useState("");

    useEffect(() => {
        if (query && query.length > 0)
            setValue(syphonx.formatJQueryExpression(query[0]) || "");
        else
            setValue("");
    }, [query]);

    return (
        <TextField
            variant="standard"
            size="small"
            value={value}
            fullWidth
            sx={{ caretColor: "transparent" }}
            InputProps={{
                endAdornment:
                    <InputAdornment position="end">
                        {query && query.length > 1 ? (
                            <Tooltip title={<span style={{ whiteSpace: "pre-line" }}>{query ? query.map(q => syphonx.formatJQueryExpression(q)).join("\n") : null}</span>}>
                                <Chip
                                    label={query.length}
                                    variant="filled"
                                    color="default"
                                    size="small"
                                    sx={{ ml: 1 }}
                                />
                            </Tooltip>
                        ) : null}
                        <IconButton size="small" onClick={onClick}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </InputAdornment>
                }}
        />
    );
};
import React, { useEffect, useState } from "react";
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
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default ({ query, onClick }: Props) => {
    const [value, setValue] = useState("");
    const [showTooltip, setShowTooltip] = useState(false);

    function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        onClick(event);
        setShowTooltip(false);
    }

    useEffect(() => {
        if (query && query.length > 0 && query[0]) {
            setValue(syphonx.formatJQueryExpression(query[0]) || "");
            setShowTooltip(false);
        }
        else {
            setValue("");
            setShowTooltip(true);
        }
            
    }, [query]);

    return (
        <TextField
            variant="standard"
            size="small"
            value={value || "(none)"}
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
                        <IconButton size="small" onClick={handleClick}>
                            <Tooltip arrow placement="left" title="Click here to setup a selector" open={showTooltip}>
                                <EditIcon fontSize="small" />    
                            </Tooltip>
                        </IconButton>
                    </InputAdornment>
                }}
        />
    );
};
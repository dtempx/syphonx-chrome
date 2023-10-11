import React from "react";
import { SelectQuery } from "syphonx-lib";

import {
    IconButton,
    Link,
    Pagination,
    Stack,
    Tooltip
} from "@mui/material";

import {
    Add as AddIcon,
    Delete as DeleteIcon
} from "@mui/icons-material";

export interface Props {
    query: SelectQuery[];
    index: number;
    onChange: (event: React.ChangeEvent<unknown>, index: number) => void;
    onAdd: (event: React.SyntheticEvent) =>  void;
    onDelete: (event: React.SyntheticEvent) =>  void;
}

export default ({ query, index, onChange, onAdd, onDelete }: Props) => {
    return query.length <= 1 ? (
        <Stack direction="row">
            <Link
                underline="always"
                fontSize="small"
                sx={{ cursor: "pointer" }}
                onClick={onAdd}
            >
                Add alternate selector
            </Link>
            <Tooltip
                title="Completely removes the query"
                sx={{
                    top: "-4px",
                    visibility: query.length > 0 ? "visible" : "hidden"
                }}
            >
                <IconButton size="small" onClick={onDelete}><DeleteIcon fontSize="small" /></IconButton>
            </Tooltip>
        </Stack>
    ) : (
        <Stack direction="row">
            <Tooltip title="Switches between query alternates">
                <Pagination
                    size="small"
                    color="primary"
                    count={query.length}
                    page={index + 1}
                    onChange={(event, page) => onChange(event, page - 1)}
                    sx={{ position: "relative", top: "2px" }}
                />
            </Tooltip>
            <Tooltip title="Add an alternate query">
                <IconButton size="small" onClick={onAdd}><AddIcon fontSize="small" /></IconButton>
            </Tooltip>
            <Tooltip title="Delete this alternate query">
                <IconButton size="small" disabled={query.length <= 1} onClick={onDelete}><DeleteIcon fontSize="small" /></IconButton>
            </Tooltip>
        </Stack>
    );
}

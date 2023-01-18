import React from "react";
import * as syphonx from "syphonx-lib";

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
    selects: syphonx.SelectQuery[];
    index: number;
    onChange: (event: React.ChangeEvent<unknown>, index: number) => void;
    onAdd: (event: React.SyntheticEvent) =>  void;
    onDelete: (event: React.SyntheticEvent) =>  void;
}

export default ({ selects, index, onChange, onAdd, onDelete }: Props) => {
    return selects.length <=1 ? (
        <Link
            underline="always"
            fontSize="small"
            sx={{ cursor: "pointer" }}
            onClick={onAdd}
        >
            Add alternate selector
        </Link>
    ) : (
        <Stack direction="row">
            <Tooltip title="Switches between query alternates">
                <Pagination
                    size="small"
                    color="primary"
                    count={selects.length}
                    page={index + 1}
                    onChange={(event, page) => onChange(event, page - 1)}
                    sx={{ position: "relative", top: "2px" }}
                />
            </Tooltip>
            <Tooltip title="Add an alternate query">
                <IconButton size="small" onClick={onAdd}><AddIcon fontSize="small" /></IconButton>
            </Tooltip>
            <Tooltip title="Delete this alternate query">
                <IconButton size="small" disabled={selects.length <= 1} onClick={onDelete}><DeleteIcon fontSize="small" /></IconButton>
            </Tooltip>
        </Stack>
    );
}

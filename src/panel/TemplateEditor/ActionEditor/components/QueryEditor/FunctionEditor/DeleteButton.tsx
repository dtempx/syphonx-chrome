import React from "react";
import { SelectQueryOp } from "syphonx-lib";

import {
    IconButton,
    Tooltip
} from "@mui/material";

import {
    Delete as DeleteIcon
} from "@mui/icons-material";

export interface Props {
    query: SelectQueryOp;
    onDelete?: (event: React.SyntheticEvent) => void;
}

export default ({ query, onDelete }: Props) => (
    <Tooltip title="Delete this stage">
        <IconButton onClick={onDelete} sx={{ visibility: query[0] ? "visible" : "hidden" }}>
            <DeleteIcon fontSize="small" />
        </IconButton>
    </Tooltip>
);

import React from "react";
import { TextField } from "@mui/material";
import { useTemplate } from '../../context';

export default () => {
    const { result } = useTemplate();
    const { actions, ...response } = result || {};
    return (
        <TextField
            multiline
            fullWidth
            value={response ? JSON.stringify(response, null, 2) : ""}
            variant="outlined"
        />
    );
}
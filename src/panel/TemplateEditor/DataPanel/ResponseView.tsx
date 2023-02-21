import React from "react";
import { TextField } from "@mui/material";
import { useTemplate } from "./context";

export default () => {
    const { extract } = useTemplate();
    const { actions, ...response } = extract || {};
    return (
        <TextField
            multiline
            fullWidth
            value={response ? JSON.stringify(response, null, 2) : ""}
            variant="outlined"
        />
    );
}
import React from "react";
import { TextField } from "@mui/material";
import { useTemplateData } from "./context";

export default () => {
    const { result } = useTemplateData();
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